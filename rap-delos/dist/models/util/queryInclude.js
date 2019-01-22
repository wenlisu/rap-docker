Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("./helper");
const user_1 = require("../bo/user");
const repository_1 = require("../bo/repository");
const module_1 = require("../bo/module");
const organization_1 = require("../bo/organization");
const interface_1 = require("../bo/interface");
const property_1 = require("../bo/property");
const json_1 = require("../bo/json");
const type_1 = require("../bo/type");
const QueryInclude = {
    User: { model: user_1.default, as: 'user', attributes: { exclude: ['password', ...helper_1.Helper.exclude.generalities] }, required: true },
    UserForSearch: { model: user_1.default, as: 'user', attributes: { include: ['id', 'fullname'] }, required: true },
    Creator: { model: user_1.default, as: 'creator', attributes: { exclude: ['password', ...helper_1.Helper.exclude.generalities] }, required: true },
    Owner: { model: user_1.default, as: 'owner', attributes: { exclude: ['password', ...helper_1.Helper.exclude.generalities] }, required: true },
    Locker: { model: user_1.default, as: 'locker', attributes: { exclude: ['password', ...helper_1.Helper.exclude.generalities] }, required: false },
    Members: { model: user_1.default, as: 'members', attributes: { exclude: ['password', ...helper_1.Helper.exclude.generalities] }, through: { attributes: [] }, required: false },
    Repository: { model: repository_1.default, as: 'repository', attributes: { exclude: [] }, paranoid: false, required: false },
    Organization: { model: organization_1.default, as: 'organization', attributes: { exclude: [] }, paranoid: false, required: false },
    Module: { model: module_1.default, as: 'module', attributes: { exclude: [] }, paranoid: false, required: false },
    Type: { model: type_1.default, as: 'types', attributes: { exclude: [] }, paranoid: false, required: false },
    Interface: { model: interface_1.default, as: 'interface', attributes: { exclude: [] }, paranoid: false, required: false },
    Collaborators: { model: repository_1.default, as: 'collaborators', attributes: { exclude: [] }, through: { attributes: [] }, required: false },
    RepositoryHierarchy: {
        model: module_1.default,
        as: 'modules',
        attributes: { exclude: [] },
        required: false,
        include: [{
                model: type_1.default,
                as: 'types',
                attributes: { exclude: [] },
                required: false,
                include: [{
                        model: interface_1.default,
                        as: 'interfaces',
                        attributes: { exclude: [] },
                        required: false,
                        include: [{
                                model: user_1.default,
                                as: 'locker',
                                attributes: { exclude: ['password', ...helper_1.Helper.exclude.generalities] },
                                required: false,
                            }, {
                                model: property_1.default,
                                as: 'properties',
                                attributes: { exclude: [] },
                                required: false,
                            }],
                    }],
            }],
    },
    Properties: {
        model: property_1.default,
        as: 'properties',
        attributes: { exclude: [] },
        required: false,
    },
    Json: {
        model: json_1.default,
        as: 'json',
        attributes: { exclude: [] },
        required: false,
    }
};
exports.default = QueryInclude;
//# sourceMappingURL=queryInclude.js.map