var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const genExampleModule = (extra) => Object.assign({
    name: '示例模块',
    description: '示例模块',
    creatorId: undefined,
    repositoryId: undefined,
}, extra);
const genExampleType = (extra) => Object.assign({
    name: '示例分类',
    creatorId: undefined,
    repositoryId: undefined,
    moduleId: undefined,
}, extra);
const genExampleInterface = (extra) => Object.assign({
    name: '示例接口',
    url: `/example/${Date.now()}`,
    method: 'GET',
    description: '示例接口描述',
    creatorId: undefined,
    lockerId: undefined,
    moduleId: undefined,
    typeId: undefined,
    repositoryId: undefined,
}, extra);
const genExampleProperty = (extra) => Object.assign({
    scope: undefined,
    name: 'foo',
    type: 'String',
    rule: '',
    value: '@ctitle',
    description: { request: '请求属性示例', response: '响应属性示例' }[extra.scope],
    parentId: -1,
    creatorId: undefined,
    interfaceId: undefined,
    moduleId: undefined,
    typeId: undefined,
    repositoryId: undefined,
}, extra);
const initRepository = (repository) => __awaiter(this, void 0, void 0, function* () {
    let mod = yield models_1.Module.create(genExampleModule({
        creatorId: repository.creatorId,
        repositoryId: repository.id,
    }));
    yield initModule(mod);
});
const initModule = (mod) => __awaiter(this, void 0, void 0, function* () {
    let type = yield models_1.Type.create(genExampleType({
        creatorId: mod.creatorId,
        moduleId: mod.id,
        repositoryId: mod.repositoryId,
    }));
    yield initType(type);
});
const initType = (mod) => __awaiter(this, void 0, void 0, function* () {
    let itf = yield models_1.Interface.create(genExampleInterface({
        creatorId: mod.creatorId,
        moduleId: mod.moduleId,
        typeId: mod.id,
        repositoryId: mod.repositoryId,
    }));
    yield initInterface(itf);
});
const initInterface = (itf) => __awaiter(this, void 0, void 0, function* () {
    let { creatorId, repositoryId, moduleId, typeId } = itf;
    let interfaceId = itf.id;
    yield models_1.Property.create(genExampleProperty({
        scope: 'request',
        creatorId,
        repositoryId,
        moduleId,
        typeId,
        interfaceId,
    }));
    yield models_1.Property.create(genExampleProperty({
        scope: 'response',
        name: 'string',
        type: 'String',
        rule: '1-10',
        value: '★',
        description: '字符串属性示例',
        creatorId,
        repositoryId,
        moduleId,
        typeId,
        interfaceId,
    }));
    yield models_1.Property.create(genExampleProperty({
        scope: 'response',
        name: 'number',
        type: 'Number',
        rule: '1-100',
        value: '1',
        description: '数字属性示例',
        creatorId,
        repositoryId,
        moduleId,
        typeId,
        interfaceId,
    }));
    yield models_1.Property.create(genExampleProperty({
        scope: 'response',
        name: 'boolean',
        type: 'Boolean',
        rule: '1-2',
        value: 'true',
        description: '布尔属性示例',
        creatorId,
        repositoryId,
        moduleId,
        typeId,
        interfaceId,
    }));
    yield models_1.Property.create(genExampleProperty({
        scope: 'response',
        name: 'regexp',
        type: 'RegExp',
        rule: '',
        value: '/[a-z][A-Z][0-9]/',
        description: '正则属性示例',
        creatorId,
        repositoryId,
        moduleId,
        typeId,
        interfaceId,
    }));
    yield models_1.Property.create(genExampleProperty({
        scope: 'response',
        name: 'function',
        type: 'Function',
        rule: '',
        value: '() => Math.random()',
        description: '函数属性示例',
        creatorId,
        repositoryId,
        moduleId,
        typeId,
        interfaceId,
    }));
    let array = yield models_1.Property.create(genExampleProperty({
        scope: 'response',
        name: 'array',
        type: 'Array',
        rule: '1-10',
        value: '',
        description: '数组属性示例',
        creatorId,
        repositoryId,
        moduleId,
        typeId,
        interfaceId,
    }));
    yield models_1.Property.create(genExampleProperty({
        scope: 'response',
        name: 'foo',
        type: 'Number',
        rule: '+1',
        value: 1,
        description: '数组元素示例',
        parentId: array.id,
        creatorId,
        repositoryId,
        moduleId,
        typeId,
        interfaceId,
    }));
    yield models_1.Property.create(genExampleProperty({
        scope: 'response',
        name: 'bar',
        type: 'String',
        rule: '1-10',
        value: '★',
        description: '数组元素示例',
        parentId: array.id,
        creatorId,
        repositoryId,
        moduleId,
        typeId,
        interfaceId,
    }));
    yield models_1.Property.create(genExampleProperty({
        scope: 'response',
        name: 'items',
        type: 'Array',
        rule: '',
        value: `[1, true, 'hello', /\\w{10}/]`,
        description: '自定义数组元素示例',
        creatorId,
        repositoryId,
        moduleId,
        typeId,
        interfaceId,
    }));
    let object = yield models_1.Property.create(genExampleProperty({
        scope: 'response',
        name: 'object',
        type: 'Object',
        rule: '',
        value: '',
        description: '对象属性示例',
        creatorId,
        repositoryId,
        moduleId,
        typeId,
        interfaceId,
    }));
    yield models_1.Property.create(genExampleProperty({
        scope: 'response',
        name: 'foo',
        type: 'Number',
        rule: '+1',
        value: 1,
        description: '对象属性示例',
        parentId: object.id,
        creatorId,
        repositoryId,
        moduleId,
        typeId,
        interfaceId,
    }));
    yield models_1.Property.create(genExampleProperty({
        scope: 'response',
        name: 'bar',
        type: 'String',
        rule: '1-10',
        value: '★',
        description: '对象属性示例',
        parentId: object.id,
        creatorId,
        repositoryId,
        moduleId,
        typeId,
        interfaceId,
    }));
    yield models_1.Property.create(genExampleProperty({
        scope: 'response',
        name: 'placeholder',
        type: 'String',
        rule: '',
        value: '@title',
        description: '占位符示例',
        creatorId,
        repositoryId,
        moduleId,
        typeId,
        interfaceId,
    }));
});
module.exports = {
    genExampleModule,
    genExampleInterface,
    initRepository,
    initModule,
    initType,
    initInterface,
};
//# sourceMappingURL=helper.js.map