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
const _ = require("lodash");
const pagination_1 = require("./utils/pagination");
const sequelize_1 = require("sequelize");
const organization_1 = require("../service/organization");
router_1.default.get('/app/get', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    let data = {};
    let query = ctx.query;
    let hooks = {
        organization: models_1.Organization,
    };
    for (let name in hooks) {
        if (!query[name])
            continue;
        data[name] = yield hooks[name].findById(query[name], {
            attributes: { exclude: [] },
        });
    }
    ctx.body = {
        data: Object.assign({}, ctx.body && ctx.body.data, data),
    };
    return next();
}));
router_1.default.get('/organization/count', (ctx) => __awaiter(this, void 0, void 0, function* () {
    ctx.body = {
        data: yield models_1.Organization.count(),
    };
}));
router_1.default.get('/organization/list', (ctx) => __awaiter(this, void 0, void 0, function* () {
    const curUserId = ctx.session.id;
    const { name } = ctx.query;
    const total = yield organization_1.default.getAllOrganizationIdListNum(curUserId);
    const pagination = new pagination_1.default(total, ctx.query.cursor || 1, ctx.query.limit || 100);
    const organizationIds = yield organization_1.default.getAllOrganizationIdList(curUserId, pagination, name);
    const options = {
        where: { id: { [sequelize_1.Op.in]: organizationIds } },
        include: [
            models_2.QueryInclude.Creator,
            models_2.QueryInclude.Owner,
            models_2.QueryInclude.Members
        ],
        order: [['updatedAt', 'desc']]
    };
    const organizations = yield models_1.Organization.findAll(options);
    ctx.body = {
        data: organizations,
        pagination,
    };
}));
router_1.default.get('/organization/owned', (ctx) => __awaiter(this, void 0, void 0, function* () {
    if (!ctx.session.id) {
        ctx.body = {
            data: {
                isOk: false,
                errMsg: 'not login'
            }
        };
        return;
    }
    let where = {};
    let { name } = ctx.query;
    if (name) {
        Object.assign(where, {
            [sequelize_1.Op.or]: [
                { name: { [sequelize_1.Op.like]: `%${name}%` } },
                { id: name }
            ]
        });
    }
    let auth = yield models_1.User.findById(ctx.session.id);
    let options = {
        where,
        attributes: { exclude: [] },
        include: [models_2.QueryInclude.Creator, models_2.QueryInclude.Owner, models_2.QueryInclude.Members],
        order: [['updatedAt', 'DESC']],
    };
    let owned = yield auth.$get('ownedOrganizations', options);
    ctx.body = {
        data: owned,
        pagination: undefined,
    };
}));
router_1.default.get('/organization/joined', (ctx) => __awaiter(this, void 0, void 0, function* () {
    if (!ctx.session.id) {
        ctx.body = {
            data: {
                isOk: false,
                errMsg: 'not login'
            }
        };
        return;
    }
    let where = {};
    let { name } = ctx.query;
    if (name) {
        Object.assign(where, {
            [sequelize_1.Op.or]: [
                { name: { [sequelize_1.Op.like]: `%${name}%` } },
                { id: name }
            ]
        });
    }
    let auth = yield models_1.User.findById(ctx.session.id);
    let options = {
        where,
        attributes: { exclude: [] },
        include: [models_2.QueryInclude.Creator, models_2.QueryInclude.Owner, models_2.QueryInclude.Members],
        order: [['updatedAt', 'DESC']],
    };
    let joined = yield auth.$get('joinedOrganizations', options);
    ctx.body = {
        data: joined,
        pagination: undefined,
    };
}));
router_1.default.get('/organization/get', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let organization = yield models_1.Organization.findById(ctx.query.id, {
        attributes: { exclude: [] },
        include: [models_2.QueryInclude.Creator, models_2.QueryInclude.Owner, models_2.QueryInclude.Members],
    });
    ctx.body = {
        data: organization,
    };
}));
router_1.default.post('/organization/create', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let creatorId = ctx.session.id;
    let body = Object.assign({}, ctx.request.body, { creatorId, ownerId: creatorId });
    let created = yield models_1.Organization.create(body);
    if (body.memberIds) {
        let members = yield models_1.User.findAll({ where: { id: body.memberIds } });
        yield created.$set('members', members);
    }
    let filled = yield models_1.Organization.findById(created.id, {
        attributes: { exclude: [] },
        include: [models_2.QueryInclude.Creator, models_2.QueryInclude.Owner, models_2.QueryInclude.Members],
    });
    ctx.body = {
        data: filled,
    };
}));
router_1.default.post('/organization/update', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    let body = Object.assign({}, ctx.request.body);
    delete body.creatorId;
    let updated = yield models_1.Organization.update(body, { where: { id: body.id } });
    if (body.memberIds) {
        let reloaded = yield models_1.Organization.findById(body.id);
        let members = yield models_1.User.findAll({ where: { id: body.memberIds } });
        ctx.prevAssociations = yield reloaded.$get('members');
        yield reloaded.$set('members', members);
        ctx.nextAssociations = yield reloaded.$get('members');
    }
    ctx.body = {
        data: updated[0],
    };
    return next();
}), (ctx) => __awaiter(this, void 0, void 0, function* () {
    let { id } = ctx.request.body;
    yield models_1.Logger.create({
        userId: ctx.session.id,
        type: 'update',
        organizationId: id,
    });
    if (!ctx.prevAssociations || !ctx.nextAssociations)
        return;
    let prevIds = ctx.prevAssociations.map((item) => item.id);
    let nextIds = ctx.nextAssociations.map((item) => item.id);
    let joined = _.difference(nextIds, prevIds);
    let exited = _.difference(prevIds, nextIds);
    let creatorId = ctx.session.id;
    for (let userId of joined) {
        yield models_1.Logger.create({ creatorId, userId, type: 'join', organizationId: id });
    }
    for (let userId of exited) {
        yield models_1.Logger.create({ creatorId, userId, type: 'exit', organizationId: id });
    }
}));
router_1.default.post('/organization/transfer', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let { id, ownerId } = ctx.request.body;
    let body = { ownerId };
    let result = yield models_1.Organization.update(body, { where: { id } });
    ctx.body = {
        data: result[0],
    };
}));
router_1.default.get('/organization/remove', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    let { id } = ctx.query;
    let result = yield models_1.Organization.destroy({ where: { id } });
    let repositories = yield models_1.Repository.findAll({
        where: { organizationId: id },
    });
    if (repositories.length) {
        let ids = repositories.map(item => item.id);
        yield models_1.Repository.destroy({ where: { id: ids } });
        yield models_1.Module.destroy({ where: { repositoryId: ids } });
        yield models_1.Type.destroy({ where: { repositoryId: ids } });
        yield models_1.Interface.destroy({ where: { repositoryId: ids } });
        yield models_1.Property.destroy({ where: { repositoryId: ids } });
    }
    ctx.body = {
        data: result,
    };
    return next();
}), (ctx) => __awaiter(this, void 0, void 0, function* () {
    if (ctx.body.data === 0)
        return;
    let { id } = ctx.query;
    yield models_1.Logger.create({
        userId: ctx.session.id,
        type: 'delete',
        organizationId: id,
    });
}));
//# sourceMappingURL=organization.js.map