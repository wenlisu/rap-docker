Object.defineProperty(exports, "__esModule", { value: true });
const mockjs_1 = require("mockjs");
const scopes = ['request', 'response'];
const methods = ['GET', 'POST', 'PUT', 'DELETE'];
const types = ['String', 'Number', 'Boolean', 'Object', 'Array', 'Function', 'RegExp'];
const values = ['@INT', '@FLOAT', '@TITLE', '@NAME'];
let USER_ID = 100000000;
let ORGANIZATION_ID = 1;
let REPOSITORY_ID = 1;
let MODULE_ID = 1;
let TYPE_ID = 1;
let INTERFACE_ID = 1;
let PROPERTY_ID = 1;
exports.BO_ADMIN = { id: USER_ID++, fullname: 'admin', email: 'admin@rap2.com', password: 'admin' };
exports.BO_JSON = { id: USER_ID++, json: '{text:text}', creatorId: USER_ID };
exports.BO_MOZHI = { id: USER_ID++, fullname: '墨智', email: 'mozhi@rap2.com', password: 'mozhi' };
exports.BO_USER_COUNT = 10;
exports.BO_USER_FN = () => mockjs_1.mock({
    id: USER_ID++,
    fullname: '@cname',
    email: '@email',
    password: '@word(6)',
});
exports.BO_ORGANIZATION_COUNT = 1;
exports.BO_ORGANIZATION_FN = (source) => {
    return Object.assign(mockjs_1.mock({
        id: ORGANIZATION_ID++,
        name: '组织@ctitle(5)',
        description: '@cparagraph',
        logo: '@url',
        creatorId: undefined,
        owner: undefined,
        members: '',
    }), source);
};
exports.BO_REPOSITORY_COUNT = 1;
exports.BO_REPOSITORY_FN = (source) => {
    return Object.assign(mockjs_1.mock({
        id: REPOSITORY_ID++,
        name: '仓库@ctitle',
        description: '@cparagraph',
        logo: '@url',
    }), source);
};
exports.BO_MODULE_COUNT = 3;
exports.BO_MODULE_FN = (source) => {
    return Object.assign(mockjs_1.mock({
        id: MODULE_ID++,
        name: '模块@ctitle(4)',
        description: '@cparagraph',
        repositoryId: undefined,
        creatorId: undefined,
        url: undefined,
    }), source);
};
exports.BO_TYPE_COUNT = 2;
exports.BO_TYPE_FN = (source) => {
    return Object.assign(mockjs_1.mock({
        id: TYPE_ID++,
        name: '类型@ctitle(4)',
        repositoryId: undefined,
        creatorId: undefined,
        moduleId: undefined,
    }), source);
};
exports.BO_INTERFACE_COUNT = 3;
exports.BO_INTERFACE_FN = (source) => {
    return Object.assign(mockjs_1.mock({
        id: INTERFACE_ID++,
        name: '接口@ctitle(4)',
        url: '/@word(5)/@word(5)/@word(5).json',
        'method|1': methods,
        description: '@cparagraph',
        creatorId: undefined,
        lockerId: undefined,
        repositoryId: undefined,
        moduleId: undefined,
        typeId: undefined,
    }), source);
};
exports.BO_PROPERTY_COUNT = 6;
exports.BO_PROPERTY_FN = (source) => {
    return Object.assign(mockjs_1.mock({
        id: PROPERTY_ID++,
        'scope|1': scopes,
        name: '@word(6)',
        'type|1': types,
        'value|1': values,
        description: '@csentence',
        creatorId: undefined,
        repositoryId: undefined,
        moduleId: undefined,
        typeId: undefined,
        interfaceId: undefined,
    }), source);
};
//# sourceMappingURL=bo.js.map