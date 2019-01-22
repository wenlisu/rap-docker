var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../../models/sequelize");
const index_1 = require("../../models/index");
const bo_1 = require("./bo");
const bo_2 = require("./bo");
const bo_3 = require("./bo");
const EMPTY_WHERE = { where: {} };
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        yield sequelize_1.default.drop();
        yield sequelize_1.default.sync({
            force: true,
            logging: console.log,
        });
        yield index_1.Room.destroy(EMPTY_WHERE);
        yield index_1.User.destroy(EMPTY_WHERE);
        yield index_1.Organization.destroy(EMPTY_WHERE);
        yield index_1.Repository.destroy(EMPTY_WHERE);
        yield index_1.Module.destroy(EMPTY_WHERE);
        yield index_1.Interface.destroy(EMPTY_WHERE);
        yield index_1.Property.destroy(EMPTY_WHERE);
        yield index_1.Json.destroy(EMPTY_WHERE);
        yield index_1.Type.destroy(EMPTY_WHERE);
        yield index_1.Dto.destroy(EMPTY_WHERE);
        yield index_1.Enum.destroy(EMPTY_WHERE);
        yield index_1.User.create(bo_1.BO_ADMIN);
        yield index_1.User.create(bo_1.BO_MOZHI);
        for (let i = 0; i < bo_3.BO_USER_COUNT; i++) {
            yield index_1.User.create(bo_2.BO_USER_FN());
        }
        let users = yield index_1.User.findAll();
        yield index_1.Json.create(bo_1.BO_JSON);
        yield index_1.Dto.create(bo_1.BO_JSON);
        yield index_1.Enum.create(bo_1.BO_JSON);
        for (let BO_REPOSITORY_INDEX = 0; BO_REPOSITORY_INDEX < bo_3.BO_REPOSITORY_COUNT; BO_REPOSITORY_INDEX++) {
            let repository = yield index_1.Repository.create(bo_2.BO_REPOSITORY_FN({ creatorId: bo_1.BO_ADMIN.id, ownerId: bo_1.BO_ADMIN.id }));
            yield repository.$set('members', users.filter(user => user.id !== bo_1.BO_ADMIN.id));
            yield initRepository(repository);
        }
        for (let BO_REPOSITORY_INDEX = 0; BO_REPOSITORY_INDEX < bo_3.BO_REPOSITORY_COUNT; BO_REPOSITORY_INDEX++) {
            let repository = yield index_1.Repository.create(bo_2.BO_REPOSITORY_FN({ creatorId: bo_1.BO_MOZHI.id, ownerId: bo_1.BO_MOZHI.id }));
            yield repository.$set('members', (users.filter(user => user.id !== bo_1.BO_MOZHI.id)));
            yield initRepository(repository);
        }
        for (let BO_ORGANIZATION_INDEX = 0; BO_ORGANIZATION_INDEX < bo_3.BO_ORGANIZATION_COUNT; BO_ORGANIZATION_INDEX++) {
            let organization = yield index_1.Organization.create(bo_2.BO_ORGANIZATION_FN({ creatorId: bo_1.BO_ADMIN.id, ownerId: bo_1.BO_ADMIN.id }));
            yield organization.$set('members', (users.filter(user => user.id !== bo_1.BO_ADMIN.id)));
            for (let BO_REPOSITORY_INDEX = 0; BO_REPOSITORY_INDEX < bo_3.BO_REPOSITORY_COUNT; BO_REPOSITORY_INDEX++) {
                let repository = yield index_1.Repository.create(bo_2.BO_REPOSITORY_FN({ creatorId: bo_1.BO_ADMIN.id, ownerId: bo_1.BO_ADMIN.id, organizationId: organization.id }));
                yield repository.$set('members', users.filter(user => user.id !== bo_1.BO_ADMIN.id));
                yield initRepository(repository);
            }
        }
    });
}
exports.init = init;
function initRepository(repository) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let BO_MODULE_INDEX = 0; BO_MODULE_INDEX < bo_3.BO_MODULE_COUNT; BO_MODULE_INDEX++) {
            let mod = yield index_1.Module.create(bo_2.BO_MODULE_FN({ creatorId: repository.creatorId, repositoryId: repository.id }));
            yield repository.addModule(mod);
            for (let BO_TYPE_INDEX = 0; BO_TYPE_INDEX < bo_3.BO_TYPE_COUNT; BO_TYPE_INDEX++) {
                let type = yield index_1.Type.create(bo_3.BO_TYPE_FN({ creatorId: repository.creatorId, repositoryId: repository.id, moduleId: mod.id }));
                yield mod.$add('types', type);
                for (let BO_INTERFACE_INDEX = 0; BO_INTERFACE_INDEX < bo_3.BO_INTERFACE_COUNT; BO_INTERFACE_INDEX++) {
                    let itf = yield index_1.Interface.create(bo_2.BO_INTERFACE_FN({ creatorId: mod.creatorId, repositoryId: repository.id, moduleId: mod.id, typeId: type.id }));
                    yield type.$add('interfaces', itf);
                    for (let BO_PROPERTY_INDEX = 0; BO_PROPERTY_INDEX < bo_3.BO_PROPERTY_COUNT; BO_PROPERTY_INDEX++) {
                        let prop = yield index_1.Property.create(bo_2.BO_PROPERTY_FN({ creatorId: itf.creatorId, repositoryId: repository.id, moduleId: mod.id, typeId: type.id, interfaceId: itf.id }));
                        yield itf.$add('properties', prop);
                    }
                }
            }
        }
    });
}
function after() {
    return __awaiter(this, void 0, void 0, function* () {
        let exclude = ['password', 'createdAt', 'updatedAt', 'deletedAt'];
        let repositories = yield index_1.Repository.findAll({
            attributes: { exclude: [] },
            include: [
                { model: index_1.User, as: 'creator', attributes: { exclude }, required: true },
                { model: index_1.User, as: 'owner', attributes: { exclude }, required: true },
                { model: index_1.Organization, as: 'organization', attributes: { exclude }, required: false },
                { model: index_1.User, as: 'locker', attributes: { exclude }, required: false },
                { model: index_1.User, as: 'members', attributes: { exclude }, through: { attributes: [] }, required: true },
                { model: index_1.Module,
                    as: 'modules',
                    attributes: { exclude },
                    include: [
                        {
                            model: index_1.Type,
                            as: 'types',
                            attributes: { exclude },
                            include: [
                                {
                                    model: index_1.Interface,
                                    as: 'interfaces',
                                    attributes: { exclude },
                                    include: [
                                        {
                                            model: index_1.Property,
                                            as: 'properties',
                                            attributes: { exclude },
                                            required: true,
                                        },
                                    ],
                                    required: true,
                                },
                            ]
                        }
                    ],
                    required: true,
                },
            ],
            offset: 0,
            limit: 100,
        });
        console.log(JSON.stringify(repositories, undefined, 2));
        console.log(repositories.map(item => item.modules));
        let admin = yield index_1.User.findById(bo_1.BO_ADMIN.id);
        yield admin.$get('ownedOrganizations');
        let mozhi = yield index_1.User.findById(bo_1.BO_MOZHI.id);
        for (let k in mozhi)
            console.log(k);
        yield mozhi.$get('joinedOrganizations');
    });
}
exports.after = after;
//# sourceMappingURL=delos.js.map