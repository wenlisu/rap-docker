var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const property_1 = require("../models/bo/property");
const md5 = require("md5");
const querystring = require("querystring");
const rp = require("request-promise");
const isMd5 = require('is-md5');
class MigrateService {
    static importRepoFromRAP1ProjectData(orgId, curUserId, projectData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!projectData || !projectData.id || !projectData.name)
                return false;
            let pCounter = 1;
            let mCounter = 1;
            let iCounter = 1;
            const repo = yield models_1.Repository.create({
                name: projectData.name,
                description: projectData.introduction,
                visibility: true,
                ownerId: curUserId,
                creatorId: curUserId,
                organizationId: orgId,
            });
            for (const module of projectData.moduleList) {
                const mod = yield models_1.Module.create({
                    name: module.name,
                    description: module.introduction,
                    priority: mCounter++,
                    creatorId: curUserId,
                    repositoryId: repo.id
                });
                for (const page of module.pageList) {
                    for (const action of page.actionList) {
                        const itf = yield models_1.Interface.create({
                            moduleId: mod.id,
                            name: `${page.name}-${action.name}`,
                            description: action.description,
                            url: action.requestUrl || '',
                            priority: iCounter++,
                            creatorId: curUserId,
                            repositoryId: repo.id,
                            method: getMethodFromRAP1RequestType(+action.requestType)
                        });
                        for (const p of action.requestParameterList) {
                            yield processParam(p, property_1.SCOPES.REQUEST);
                        }
                        for (const p of action.responseParameterList) {
                            yield processParam(p, property_1.SCOPES.RESPONSE);
                        }
                        function processParam(p, scope, parentId) {
                            return __awaiter(this, void 0, void 0, function* () {
                                const RE_REMARK_MOCK = /@mock=(.+)$/;
                                const ramarkMatchMock = RE_REMARK_MOCK.exec(p.remark);
                                const remarkWithoutMock = p.remark.replace(RE_REMARK_MOCK, '');
                                const name = p.identifier.split('|')[0];
                                let rule = p.identifier.split('|')[1] || '';
                                let type = (p.dataType || 'string').split('<')[0];
                                type = type[0].toUpperCase() + type.slice(1);
                                let value = (ramarkMatchMock && ramarkMatchMock[1]) || '';
                                if (/^function/.test(value))
                                    type = 'Function';
                                if (/^\$order/.test(value)) {
                                    type = 'Array';
                                    rule = '+1';
                                    let orderArgs = /\$order\((.+)\)/.exec(value);
                                    if (orderArgs)
                                        value = `[${orderArgs[1]}]`;
                                }
                                let description = [];
                                if (p.name)
                                    description.push(p.name);
                                if (p.remark && remarkWithoutMock)
                                    description.push(remarkWithoutMock);
                                const pCreated = yield models_1.Property.create({
                                    scope,
                                    name,
                                    rule,
                                    value,
                                    type,
                                    description: `${p.remark}${p.name ? ', ' + p.name : ''}`,
                                    priority: pCounter++,
                                    interfaceId: itf.id,
                                    creatorId: curUserId,
                                    moduleId: mod.id,
                                    repositoryId: repo.id,
                                    parentId: parentId || -1,
                                });
                                for (const subParam of p.parameterList) {
                                    processParam(subParam, scope, pCreated.id);
                                }
                            });
                        }
                    }
                }
            }
            return true;
        });
    }
    static importRepoFromProjectData(orgId, curUserId, projectData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!projectData || !projectData.name)
                return false;
            let pCounter = 1;
            let mCounter = 1;
            let iCounter = 1;
            const repo = yield models_1.Repository.create({
                name: projectData.name,
                description: projectData.description,
                visibility: true,
                ownerId: curUserId,
                creatorId: curUserId,
                organizationId: orgId,
            });
            for (const module of projectData.modules) {
                const mod = yield models_1.Module.create({
                    name: module.name,
                    description: module.description,
                    priority: mCounter++,
                    creatorId: curUserId,
                    repositoryId: repo.id,
                    url: module.url
                });
                for (const page of module.interfaces) {
                    const requireUrl = mod.url + page.url;
                    const itf = yield models_1.Interface.create({
                        moduleId: mod.id,
                        name: `${page.name}`,
                        description: page.description,
                        url: requireUrl || '',
                        priority: iCounter++,
                        creatorId: curUserId,
                        repositoryId: repo.id,
                        method: page.method
                    });
                    for (const action of page.properties) {
                        yield processParam(action, action.scope);
                    }
                    function processParam(p, scope, parentId) {
                        return __awaiter(this, void 0, void 0, function* () {
                            const name = p.name;
                            let rule = '';
                            let type = (p.type || 'string') && (p.type || 'string').split('<')[0];
                            type = type && (type[0].toUpperCase() + type.slice(1));
                            let value = '';
                            if (/^function/.test(value))
                                type = 'Function';
                            if (/^\$order/.test(value)) {
                                type = 'Array';
                                rule = '+1';
                                let orderArgs = /\$order\((.+)\)/.exec(value);
                                if (orderArgs)
                                    value = `[${orderArgs[1]}]`;
                            }
                            let description = [];
                            if (p.name)
                                description.push(p.name);
                            let request = {};
                            if (scope === property_1.SCOPES.REQUEST) {
                                request = {
                                    scope,
                                    name,
                                    rule,
                                    value,
                                    type,
                                    pos: p.pos,
                                    description: `${p.description}`,
                                    priority: pCounter++,
                                    interfaceId: itf.id,
                                    creatorId: curUserId,
                                    moduleId: mod.id,
                                    repositoryId: repo.id,
                                    parentId: parentId || -1,
                                    required: p.required,
                                };
                            }
                            else {
                                request = {
                                    scope,
                                    name,
                                    rule,
                                    value,
                                    type,
                                    description: `${p.description}`,
                                    priority: pCounter++,
                                    interfaceId: itf.id,
                                    creatorId: curUserId,
                                    moduleId: mod.id,
                                    repositoryId: repo.id,
                                    parentId: parentId || -1,
                                    required: p.required,
                                };
                            }
                            const pCreated = yield models_1.Property.create(request);
                            if (p.parameterList && p.parameterList.length > 0) {
                                for (const subParam of p.parameterList) {
                                    processParam(subParam, scope, pCreated.id);
                                }
                            }
                        });
                    }
                }
            }
            return true;
        });
    }
    static checkAndFix() {
    }
    static checkPasswordMd5() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('checkPasswordMd5');
            const users = yield models_1.User.findAll();
            if (users.length === 0 || isMd5(users[0].password)) {
                console.log('  users empty or md5 check passed');
                return;
            }
            for (const user of users) {
                if (!isMd5(user.password)) {
                    user.password = md5(md5(user.password));
                    yield user.save();
                    console.log(`handle user ${user.id}`);
                }
            }
        });
    }
    static onReadJson(tJson, dJson, eJson) {
        return __awaiter(this, void 0, void 0, function* () {
            let json = tJson;
            for (const module of json.modules) {
                for (const page of module.interfaces) {
                    for (const action of page.properties) {
                        if (action.parameterDTO) {
                            if (!dJson)
                                return false;
                            function processParam(parameterList, parameterData, scope) {
                                return __awaiter(this, void 0, void 0, function* () {
                                    let description;
                                    let type;
                                    let typeDTO = /DTO\b/i.test(parameterData.type);
                                    let typeDefault = /\bString\b|\bNumber\b|\bObject\b|\bArray\b|\bLong\b/i.test(parameterData.type);
                                    if (typeDefault) {
                                        type = parameterData.type;
                                        description = parameterData.description;
                                        parameterList.push({
                                            scope: scope,
                                            name: parameterData.name,
                                            type,
                                            description,
                                        });
                                    }
                                    else if (typeDTO) {
                                        let dtype = dJson[parameterData.type];
                                        type = property_1.TYPES.OBJECT;
                                        description = parameterData.description;
                                        parameterList.parameterList = [];
                                        let pparameterList = [];
                                        for (const actionPChile of dtype) {
                                            pparameterList = yield processParam(parameterList.parameterList, actionPChile, scope);
                                        }
                                        parameterList.push({
                                            scope: scope,
                                            name: parameterData.name,
                                            type,
                                            description,
                                            parameterList: pparameterList,
                                        });
                                    }
                                    else {
                                        if (!eJson)
                                            return false;
                                        let etype = eJson[parameterData.type] || [];
                                        type = property_1.TYPES.NUMBER;
                                        etype.map((item) => {
                                            description = description ? description + `${item.id}:${item.description}` : `${item.id}:${item.description}`;
                                        });
                                        parameterList.push({
                                            scope: scope,
                                            name: parameterData.name,
                                            type,
                                            description,
                                        });
                                    }
                                    return parameterList;
                                });
                            }
                            action.parameterList = [];
                            for (const actionChile of dJson[action.parameterDTO]) {
                                processParam(action.parameterList, actionChile, action.scope);
                            }
                        }
                    }
                }
            }
            return json;
        });
    }
    static onSaveJson(curUserId, tsjson, dtoJson, enumJson) {
        return __awaiter(this, void 0, void 0, function* () {
            let tJson = yield models_1.Json.create({
                json: tsjson,
                creatorId: curUserId,
            });
            let dJson;
            let eJson;
            if (dtoJson) {
                dJson = yield models_1.Dto.create({
                    json: dtoJson,
                    creatorId: curUserId,
                });
                dJson = dJson.dataValues.json;
            }
            if (enumJson) {
                eJson = yield models_1.Enum.create({
                    json: enumJson,
                    creatorId: curUserId,
                });
                eJson = eJson.dataValues.json;
            }
            let json = tJson.dataValues.json.data;
            let newTsJson = yield this.onReadJson(json, dJson, eJson);
            yield models_1.Json.update({
                json: newTsJson,
                creatorId: curUserId,
            }, { where: { id: tJson.dataValues.id } });
            tJson = yield models_1.Json.findOne({
                where: { id: tJson.dataValues.id },
            });
            tJson = tJson.dataValues.json;
            return tJson;
        });
    }
    static importFromJson(orgId, curUserId, tsjson, dtoJson, enumJson) {
        return __awaiter(this, void 0, void 0, function* () {
            let tJson = yield this.onSaveJson(curUserId, tsjson, dtoJson, enumJson);
            return yield this.importRepoFromProjectData(orgId, curUserId, tJson);
        });
    }
    static exportRepoFromJson(orgId, curUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(orgId, curUserId);
            return yield true;
        });
    }
    static importRepoFromRAP1DocUrl(orgId, curUserId, docUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const { projectId } = querystring.parse(docUrl.substring(docUrl.indexOf('?') + 1));
            let domain = docUrl;
            if (domain.indexOf('http') === -1) {
                domain = 'http://' + domain;
            }
            domain = domain.substring(0, domain.indexOf('/', domain.indexOf('.')));
            let result = yield rp(`${domain}/api/queryRAPModel.do?projectId=${projectId}`, {
                json: false,
            });
            result = JSON.parse(result);
            result = result.modelJSON;
            const safeEval = require('notevil');
            result = safeEval('(' + result + ')');
            return yield this.importRepoFromRAP1ProjectData(orgId, curUserId, result);
        });
    }
}
exports.default = MigrateService;
function getMethodFromRAP1RequestType(type) {
    switch (type) {
        case 1:
            return 'GET';
        case 2:
            return 'POST';
        case 3:
            return 'PUT';
        case 4:
            return 'DELETE';
        default:
            return 'GET';
    }
}
//# sourceMappingURL=migrate.js.map