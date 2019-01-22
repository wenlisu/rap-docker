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
const url = require("url");
const property_1 = require("../models/bo/property");
const url_1 = require("../routes/utils/url");
const SCHEMA_V_2_1_0 = 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json';
class PostmanService {
    static export(repositoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = yield models_1.Repository.findById(repositoryId, {
                include: [{
                        model: models_1.Module,
                        as: 'modules',
                        include: [{
                                model: models_1.Type,
                                as: 'types',
                                include: [{
                                        model: models_1.Interface,
                                        as: 'interfaces',
                                        include: [{
                                                model: models_1.Property,
                                                as: 'properties',
                                            }]
                                    }],
                            }],
                    }]
            });
            const result = {
                info: {
                    name: `RAP2 Pack ${repo.name}`,
                    schema: SCHEMA_V_2_1_0,
                },
                item: []
            };
            for (const mod of repo.modules) {
                const modItem = {
                    name: mod.name,
                    item: [],
                };
                for (const type of mod.types) {
                    const typeItem = {
                        name: type.name,
                        item: [],
                    };
                    for (const itf of type.interfaces) {
                        const interfaceId = itf.id;
                        const requestParams = yield models_1.Property.findAll({
                            where: { interfaceId, scope: 'request' }
                        });
                        const responseParams = yield models_1.Property.findAll({
                            where: { interfaceId, scope: 'response' }
                        });
                        const relativeUrl = url_1.default.getRelative(itf.url);
                        const parseResult = url.parse(itf.url);
                        const itfItem = {
                            name: itf.name,
                            request: {
                                method: itf.method,
                                header: getHeader(requestParams),
                                body: getBody(requestParams),
                                url: {
                                    raw: `{{url}}${relativeUrl}`,
                                    host: '{{url}}',
                                    port: parseResult.port || '',
                                    hash: parseResult.hash,
                                    path: [parseResult.path],
                                    query: getQuery(requestParams),
                                },
                                description: itf.description,
                            },
                            response: responseParams.map(x => ({ key: x.name, value: x.value })),
                        };
                        typeItem.item.push(itfItem);
                    }
                    modItem.item.push(typeItem);
                }
                result.item.push(modItem);
            }
            return result;
        });
    }
}
exports.default = PostmanService;
function getBody(pList) {
    return {
        "mode": "formdata",
        "formdata": pList.filter(x => x.pos === property_1.REQUEST_PARAMS_TYPE.BODY_PARAMS)
            .map(x => ({ key: x.name, value: x.value, description: x.description, type: "text" })),
    };
}
function getQuery(pList) {
    return pList.filter(x => x.pos === null || x.pos === property_1.REQUEST_PARAMS_TYPE.QUERY_PARAMS)
        .map(x => ({ key: x.name, value: x.value, description: x.description }));
}
function getHeader(pList) {
    return pList.filter(x => x.pos === property_1.REQUEST_PARAMS_TYPE.HEADERS)
        .map(x => ({ key: x.name, value: x.value, description: x.description }));
}
//# sourceMappingURL=postman.js.map