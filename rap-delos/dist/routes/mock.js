var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
const models_1 = require("../models");
const models_2 = require("../models");
const tree_1 = require("./utils/tree");
const url_1 = require("./utils/url");
const querystring = require("querystring");
const sequelize_typescript_1 = require("sequelize-typescript");
const attributes = { exclude: [] };
const pt = require('node-print').pt;
const beautify = require('js-beautify').js_beautify;
const Op = sequelize_typescript_1.Sequelize.Op;
const parseDuplicatedInterfaces = (repository) => {
    let counter = {};
    for (let itf of repository.interfaces) {
        let key = `${itf.method} ${itf.url}`;
        counter[key] = [...(counter[key] || []), { id: itf.id, method: itf.method, url: itf.url }];
    }
    let duplicated = [];
    for (let key in counter) {
        if (counter[key].length > 1) {
            duplicated.push(counter[key]);
        }
    }
    return duplicated;
};
const generatePlugin = (protocol, host, repository) => {
    let duplicated = parseDuplicatedInterfaces(repository);
    let editor = `${protocol}://rap2.taobao.org/repository/editor?id=${repository.id}`;
    let result = `
/**
 * 仓库    #${repository.id} ${repository.name}
 * 在线编辑 ${editor}
 * 仓库数据 ${protocol}://${host}/repository/get?id=${repository.id}
 * 请求地址 ${protocol}://${host}/app/mock/${repository.id}/:method/:url
 *    或者 ${protocol}://${host}/app/mock/template/:interfaceId
 *    或者 ${protocol}://${host}/app/mock/data/:interfaceId
 */
;(function(){
  let repositoryId = ${repository.id}
  let interfaces = [
    ${repository.interfaces.map((itf) => `{ id: ${itf.id}, name: '${itf.name}', method: '${itf.method}', url: '${itf.url}',
      request: ${JSON.stringify(itf.request)},
      response: ${JSON.stringify(itf.response)} }`).join(',\n    ')}
  ]
  ${duplicated.length ? `console.warn('检测到重复接口，请访问 ${editor} 修复警告！')\n` : ''}
  let RAP = window.RAP || {
    protocol: '${protocol}',
    host: '${host}',
    interfaces: {}
  }
  RAP.interfaces[repositoryId] = interfaces
  window.RAP = RAP
})();`;
    return beautify(result, { indent_size: 2 });
};
router_1.default.get('/app/plugin/:repositories', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let repositoryIds = new Set(ctx.params.repositories.split(',').map((item) => +item).filter((item) => item));
    let result = [];
    for (let id of repositoryIds) {
        let repository = yield models_1.Repository.findById(id, {
            attributes: { exclude: [] },
            include: [
                models_2.QueryInclude.Creator,
                models_2.QueryInclude.Owner,
                models_2.QueryInclude.Locker,
                models_2.QueryInclude.Members,
                models_2.QueryInclude.Organization,
                models_2.QueryInclude.Collaborators,
            ],
        });
        if (!repository)
            continue;
        if (repository.collaborators) {
            repository.collaborators.map(item => {
                repositoryIds.add(item.id);
            });
        }
        repository.interfaces = yield models_1.Interface.findAll({
            attributes: { exclude: [] },
            where: {
                repositoryId: repository.id,
            },
            include: [
                models_2.QueryInclude.Properties,
            ],
        });
        repository.interfaces.forEach(itf => {
            itf.request = tree_1.default.ArrayToTreeToTemplate(itf.properties.filter(item => item.scope === 'request'));
            itf.response = tree_1.default.ArrayToTreeToTemplate(itf.properties.filter(item => item.scope === 'response'));
        });
        let protocol = ctx.headers['x-client-scheme'] || ctx.protocol;
        result.push(generatePlugin(protocol, ctx.host, repository));
    }
    ctx.type = 'application/x-javascript';
    ctx.body = result.join('\n');
}));
const REG_URL_METHOD = /^\/?(get|post|delete|put)/i;
router_1.default.all('/app/mock/:repositoryId(\\d+)/:url(.+)', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let app = ctx.app;
    app.counter.mock++;
    let { repositoryId, url } = ctx.params;
    let method = ctx.request.method;
    repositoryId = +repositoryId;
    if (REG_URL_METHOD.test(url)) {
        REG_URL_METHOD.lastIndex = -1;
        method = REG_URL_METHOD.exec(url)[1].toUpperCase();
        REG_URL_METHOD.lastIndex = -1;
        url = url.replace(REG_URL_METHOD, '');
    }
    let urlWithoutPrefixSlash = /(\/)?(.*)/.exec(url)[2];
    let repository = yield models_1.Repository.findById(repositoryId);
    let collaborators = (yield repository.$get('collaborators'));
    let itf;
    const matchedItfList = yield models_1.Interface.findAll({
        attributes,
        where: {
            repositoryId: [repositoryId, ...collaborators.map(item => item.id)],
            method,
            url: {
                [Op.like]: `%${urlWithoutPrefixSlash}%`,
            }
        }
    });
    if (matchedItfList) {
        for (const item of matchedItfList) {
            itf = item;
            let url = item.url;
            if (url.charAt(0) === '/') {
                url = url.substring(1);
            }
            if (url === urlWithoutPrefixSlash) {
                break;
            }
        }
    }
    if (!itf) {
        let list = yield models_1.Interface.findAll({
            attributes: ['id', 'url', 'method'],
            where: {
                repositoryId: [repositoryId, ...collaborators.map(item => item.id)],
                method,
            }
        });
        let listMatched = [];
        for (let item of list) {
            if (url_1.default.urlMatchesPattern(url, item.url)) {
                listMatched.push(item);
            }
        }
        if (listMatched.length > 1) {
            ctx.body = { isOk: false, errMsg: '匹配到多个接口，请修改规则确保接口规则唯一性。 Matched multiple interfaces, please ensure pattern to be unique.' };
            return;
        }
        else if (listMatched.length === 0) {
            ctx.body = { isOk: false, errMsg: '未匹配到任何接口 No matched interface' };
            return;
        }
        else {
            itf = yield models_1.Interface.findById(listMatched[0].id);
        }
    }
    let interfaceId = itf.id;
    let properties = yield models_1.Property.findAll({
        attributes,
        where: { interfaceId, scope: 'response' },
    });
    if (~['GET', 'POST'].indexOf(method)) {
        let requiredProperties = yield models_1.Property.findAll({
            attributes,
            where: { interfaceId, scope: 'request', required: true },
        });
        let passed = true;
        let pFailed;
        let params = method === 'GET' ? ctx.request.query : ctx.request.body;
        for (const p of requiredProperties) {
            if (typeof params[p.name] === 'undefined') {
                passed = false;
                pFailed = p;
                break;
            }
        }
        if (!passed) {
            ctx.body = {
                isOk: false,
                errMsg: `必选参数${pFailed.name}未传值。 Required parameter ${pFailed.name} has no value.`,
            };
            ctx.status = 500;
            return;
        }
    }
    properties = properties.map(item => item.toJSON());
    let requestProperties = yield models_1.Property.findAll({
        attributes,
        where: { interfaceId, scope: 'request' },
    });
    requestProperties = requestProperties.map(item => item.toJSON());
    let requestData = tree_1.default.ArrayToTreeToTemplateToData(requestProperties);
    Object.assign(requestData, ctx.query);
    const data = tree_1.default.ArrayToTreeToTemplateToData(properties, requestData);
    ctx.type = 'json';
    ctx.body = JSON.stringify(data, undefined, 2);
    if (itf && itf.url.indexOf('[callback]=') > -1) {
        const query = querystring.parse(itf.url.substring(itf.url.indexOf('?') + 1));
        const cbName = query['[callback]'];
        const cbVal = ctx.request.query[`${cbName}`];
        if (cbVal) {
            let body = typeof ctx.body === 'object' ? JSON.stringify(ctx.body, undefined, 2) : ctx.body;
            ctx.type = 'application/x-javascript';
            ctx.body = cbVal + '(' + body + ')';
        }
    }
}));
router_1.default.get('/app/mock/template/:interfaceId', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let app = ctx.app;
    app.counter.mock++;
    let { interfaceId } = ctx.params;
    let { scope = 'response' } = ctx.query;
    let properties = yield models_1.Property.findAll({
        attributes,
        where: { interfaceId, scope },
    });
    let template = tree_1.default.ArrayToTreeToTemplate(properties);
    ctx.type = 'json';
    ctx.body = tree_1.default.stringifyWithFunctonAndRegExp(template);
}));
router_1.default.get('/app/mock/data/:interfaceId', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let app = ctx.app;
    app.counter.mock++;
    let { interfaceId } = ctx.params;
    let { scope = 'response' } = ctx.query;
    let properties = yield models_1.Property.findAll({
        attributes,
        where: { interfaceId, scope },
    });
    properties = properties.map(item => item.toJSON());
    let requestProperties = yield models_1.Property.findAll({
        attributes,
        where: { interfaceId, scope: 'request' },
    });
    requestProperties = requestProperties.map(item => item.toJSON());
    let requestData = tree_1.default.ArrayToTreeToTemplateToData(requestProperties);
    Object.assign(requestData, ctx.query);
    let data = tree_1.default.ArrayToTreeToTemplateToData(properties, requestData);
    ctx.type = 'json';
    if (data._root_) {
        data = data._root_;
    }
    ctx.body = JSON.stringify(data, undefined, 2);
}));
router_1.default.get('/app/mock/schema/:interfaceId', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let app = ctx.app;
    app.counter.mock++;
    let { interfaceId } = ctx.params;
    let { scope = 'response' } = ctx.query;
    let properties = yield models_1.Property.findAll({
        attributes,
        where: { interfaceId, scope },
    });
    pt(properties.map(item => item.toJSON()));
    properties = properties.map(item => item.toJSON());
    let schema = tree_1.default.ArrayToTreeToTemplateToJSONSchema(properties);
    ctx.type = 'json';
    ctx.body = tree_1.default.stringifyWithFunctonAndRegExp(schema);
}));
router_1.default.get('/app/mock/tree/:interfaceId', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let app = ctx.app;
    app.counter.mock++;
    let { interfaceId } = ctx.params;
    let { scope = 'response' } = ctx.query;
    let properties = yield models_1.Property.findAll({
        attributes,
        where: { interfaceId, scope },
    });
    pt(properties.map(item => item.toJSON()));
    properties = properties.map(item => item.toJSON());
    let tree = tree_1.default.ArrayToTree(properties);
    ctx.type = 'json';
    ctx.body = tree_1.default.stringifyWithFunctonAndRegExp(tree);
}));
//# sourceMappingURL=mock.js.map