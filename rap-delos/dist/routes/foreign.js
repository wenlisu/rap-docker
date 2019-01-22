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
const router_1 = require("./router");
const tree_1 = require("./utils/tree");
const _ = require("underscore");
const url_1 = require("url");
const roomHelper_1 = require("../helpers/roomHelper");
const { mock } = require('mockjs');
router_1.default.get('/foreign/room', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    let { repositoryId, roomProjectId } = ctx.query;
    if (!repositoryId && !roomProjectId) {
        ctx.body = {
            error: 'Need repositoryId or roomProjectId',
            data: {},
        };
        return next();
    }
    let interfaceQuery = { roomProjectId, repositoryId };
    !roomProjectId && delete interfaceQuery.roomProjectId;
    !repositoryId && delete interfaceQuery.repositoryId;
    let roomResult = yield models_1.Room.findOne({
        where: interfaceQuery,
    });
    let ret = {};
    ctx.body = {
        error: undefined,
        data: ret,
    };
    if (!roomResult) {
        ctx.body.error = 'Not found';
        return next();
    }
    let interfaceResult = yield models_1.Interface.findAll({
        where: { repositoryId: roomResult.repositoryId },
    });
    Object.assign(ret, {
        roomProjectId: roomResult.roomProjectId,
        repositoryId: roomResult.repositoryId,
        hostname: roomResult.hostname,
        interfaces: interfaceResult.map(item => ({
            url: item.url,
            id: item.id,
        })),
    });
    return next();
}));
router_1.default.get('/foreign/room/params', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    let { repositoryId, interfaceId, name } = ctx.query;
    if (!name || ['普通', '边界'].indexOf(name) === -1) {
        name = '普通';
    }
    if (!ctx.session.empId) {
        ctx.body = {
            error: 'Need to login',
            data: {},
        };
    }
    if (!repositoryId) {
        ctx.body = {
            error: 'Need repositoryId',
            data: {},
        };
        return next();
    }
    let [roomResult, theInterface] = yield Promise.all([
        models_1.Room.findOne({
            where: { repositoryId },
        }),
        models_1.Interface.findOne({
            where: { repositoryId, id: interfaceId },
            include: [
                models_1.QueryInclude.Properties,
            ],
        }),
    ]);
    if (!theInterface) {
        ctx.body.error = 'Cannot find interface corresponding to ' + interfaceId;
        return next();
    }
    let requestProperties = theInterface.properties.filter((item) => item.scope === 'request');
    let responseProperties = theInterface.properties.filter((item) => item.scope === 'response');
    let ret = {};
    ctx.body = {
        error: undefined,
        data: ret,
    };
    if (!roomResult || !requestProperties.length) {
        ctx.body.error = 'Not found';
        return next();
    }
    let { roomProjectId, hostname } = roomResult;
    let cases = [];
    let standard = mock(tree_1.default.ArrayToTreeToTemplate(requestProperties));
    if (name === '普通') {
        cases.push(standard);
    }
    else if (name === '边界') {
        for (let prop of requestProperties) {
            let rules = roomHelper_1.default.generateRules(prop);
            if (!rules) {
                continue;
            }
            for (let rule of rules) {
                let obj = _.clone(standard);
                obj[prop.name] = rule;
                Object.defineProperty(obj, '$type', {
                    value: rule['$type'],
                });
                cases.push(obj);
            }
        }
    }
    let moduleName = theInterface.name + '-自动' + name + '验证';
    let path = new url_1.URL(theInterface.url, hostname).toString();
    ret.module = {
        moduleName: moduleName,
        projectId: roomProjectId,
    };
    ret.cases = cases.map(function (theCase) {
        let obj = {
            caseDesc: theInterface.name + (theCase['$type'] || ''),
            path: path + '?' + roomHelper_1.default.formatKV(theCase),
            keyValue: JSON.stringify(theCase),
            method: theInterface.method,
            mode: 1,
            moduleName: moduleName,
            projectId: roomProjectId,
            rawData: '',
            setUp: '',
            tearDown: '',
            userId: !ctx.session.empId ? '122033' : ctx.session.empId,
        };
        if (name === '普通') {
            obj.expectResult = 'true_json';
            obj.expectMessage = JSON.stringify(mock(tree_1.default.ArrayToTreeToTemplate(responseProperties)));
        }
        else if (name === '边界') {
            obj.expectResult = 'false';
            obj.expectMessage = 'error';
        }
        return obj;
    });
    return next();
}));
module.exports = router_1.default;
//# sourceMappingURL=foreign.js.map