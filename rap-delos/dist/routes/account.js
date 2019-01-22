var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const svgCaptcha = require("svg-captcha");
const models_1 = require("../models");
const router_1 = require("./router");
const sequelize_typescript_1 = require("sequelize-typescript");
const pagination_1 = require("./utils/pagination");
const models_2 = require("../models");
const md5 = require("md5");
const mail_1 = require("../service/mail");
const Op = sequelize_typescript_1.Sequelize.Op;
router_1.default.get('/app/get', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    let data = {};
    let query = ctx.query;
    let hooks = {
        user: models_1.User,
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
router_1.default.get('/account/count', (ctx) => __awaiter(this, void 0, void 0, function* () {
    ctx.body = {
        data: yield models_1.User.count(),
    };
}));
router_1.default.get('/account/list', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let where = {};
    let { name } = ctx.query;
    if (name) {
        Object.assign(where, {
            [Op.or]: [
                { fullname: { $like: `%${name}%` } },
            ],
        });
    }
    let options = { where };
    let total = yield models_1.User.count(options);
    let pagination = new pagination_1.default(total, ctx.query.cursor || 1, ctx.query.limit || 10);
    ctx.body = {
        data: yield models_1.User.findAll(Object.assign(options, {
            attributes: ['id', 'fullname', 'email'],
            offset: pagination.start,
            limit: pagination.limit,
            order: [
                ['id', 'DESC'],
            ],
        })),
        pagination: pagination,
    };
}));
router_1.default.get('/account/info', (ctx) => __awaiter(this, void 0, void 0, function* () {
    ctx.body = {
        data: ctx.session.id ? yield models_1.User.findById(ctx.session.id, {
            attributes: models_2.QueryInclude.User.attributes,
        }) : undefined,
    };
}));
router_1.default.post('/account/login', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let { email, password, captcha } = ctx.request.body;
    let result, errMsg;
    if (process.env.TEST_MODE !== 'true' &&
        (!captcha || !ctx.session.captcha || captcha.trim().toLowerCase() !== ctx.session.captcha.toLowerCase())) {
        errMsg = '错误的验证码';
    }
    else {
        result = yield models_1.User.findOne({
            attributes: models_2.QueryInclude.User.attributes,
            where: { email, password: md5(md5(password)) },
        });
        if (result) {
            ctx.session.id = result.id;
            ctx.session.fullname = result.fullname;
            ctx.session.email = result.email;
            let app = ctx.app;
            app.counter.users[result.fullname] = true;
        }
        else {
            errMsg = '账号或密码错误';
        }
    }
    ctx.body = {
        data: result ? result : { errMsg },
    };
}));
router_1.default.get('/captcha_data', ctx => {
    ctx.body = {
        data: JSON.stringify(ctx.session)
    };
});
router_1.default.get('/account/logout', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let app = ctx.app;
    delete app.counter.users[ctx.session.email];
    let id = ctx.session.id;
    Object.assign(ctx.session, { id: undefined, fullname: undefined, email: undefined });
    ctx.body = {
        data: yield { id },
    };
}));
router_1.default.post('/account/register', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let { fullname, email, password } = ctx.request.body;
    let exists = yield models_1.User.findAll({
        where: { email },
    });
    if (exists && exists.length) {
        ctx.body = {
            data: {
                isOk: false,
                errMsg: '该邮件已被注册，请更换再试。',
            },
        };
        return;
    }
    let result = yield models_1.User.create({ fullname, email, password: md5(md5(password)) });
    if (result) {
        ctx.session.id = result.id;
        ctx.session.fullname = result.fullname;
        ctx.session.email = result.email;
        let app = ctx.app;
        app.counter.users[result.fullname] = true;
    }
    ctx.body = {
        data: {
            id: result.id,
            fullname: result.fullname,
            email: result.email,
        },
    };
}));
router_1.default.post('/account/update', (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { password } = ctx.request.body;
    let errMsg = '';
    let isOk = false;
    if (!ctx.session || !ctx.session.id) {
        errMsg = '登陆超时';
    }
    else if (password.length < 6) {
        errMsg = '密码长度过短';
    }
    else {
        const user = yield models_1.User.findById(ctx.session.id);
        user.password = md5(md5(password));
        yield user.save();
        isOk = true;
    }
    ctx.body = {
        data: {
            isOk,
            errMsg
        }
    };
}));
router_1.default.get('/account/remove', (ctx) => __awaiter(this, void 0, void 0, function* () {
    if (process.env.TEST_MODE === 'true') {
        ctx.body = {
            data: yield models_1.User.destroy({
                where: { id: ctx.query.id },
            }),
        };
    }
    else {
        ctx.body = {
            data: {
                isOk: false,
                errMsg: 'access forbidden',
            },
        };
    }
}));
router_1.default.get('/account/setting', (ctx) => __awaiter(this, void 0, void 0, function* () {
    ctx.body = {
        data: {},
    };
}));
router_1.default.post('/account/setting', (ctx) => __awaiter(this, void 0, void 0, function* () {
    ctx.body = {
        data: {},
    };
}));
let NOTIFICATION_EXCLUDE_ATTRIBUTES = [];
router_1.default.get('/account/notification/list', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let total = yield models_1.Notification.count();
    let pagination = new pagination_1.default(total, ctx.query.cursor || 1, ctx.query.limit || 10);
    ctx.body = {
        data: yield models_1.Notification.findAll({
            attributes: { exclude: NOTIFICATION_EXCLUDE_ATTRIBUTES },
            offset: pagination.start,
            limit: pagination.limit,
            order: [
                ['id', 'DESC'],
            ],
        }),
        pagination: pagination,
    };
}));
router_1.default.get('/account/notification/unreaded', (ctx) => __awaiter(this, void 0, void 0, function* () {
    ctx.body = {
        data: [],
    };
}));
router_1.default.post('/account/notification/unreaded', (ctx) => __awaiter(this, void 0, void 0, function* () {
    ctx.body = {
        data: 0,
    };
}));
router_1.default.post('/account/notification/read', (ctx) => __awaiter(this, void 0, void 0, function* () {
    ctx.body = {
        data: 0,
    };
}));
router_1.default.get('/account/logger', (ctx) => __awaiter(this, void 0, void 0, function* () {
    if (!ctx.session.id) {
        ctx.body = {
            data: {
                isOk: false,
                errMsg: 'not login'
            }
        };
        return;
    }
    let auth = yield models_1.User.findById(ctx.session.id);
    let repositories = [...yield auth.$get('ownedRepositories'), ...yield auth.$get('joinedRepositories')];
    let organizations = [...yield auth.$get('ownedOrganizations'), ...yield auth.$get('joinedOrganizations')];
    let where = {
        [Op.or]: [
            { userId: ctx.session.id },
            { repositoryId: repositories.map(item => item.id) },
            { organizationId: organizations.map(item => item.id) },
        ],
    };
    let total = yield models_1.Logger.count({ where });
    let pagination = new pagination_1.default(total, ctx.query.cursor || 1, ctx.query.limit || 100);
    let logs = yield models_1.Logger.findAll({
        where,
        attributes: {},
        include: [
            Object.assign({}, models_2.QueryInclude.Creator, { required: false }),
            models_2.QueryInclude.User,
            models_2.QueryInclude.Organization,
            models_2.QueryInclude.Repository,
            models_2.QueryInclude.Module,
            models_2.QueryInclude.Type,
            models_2.QueryInclude.Interface,
        ],
        offset: pagination.start,
        limit: pagination.limit,
        order: [
            ['id', 'DESC'],
        ],
        paranoid: false,
    });
    ctx.body = {
        data: logs,
        pagination,
    };
}));
router_1.default.get('/captcha', (ctx) => __awaiter(this, void 0, void 0, function* () {
    const captcha = svgCaptcha.create();
    ctx.session.captcha = captcha.text;
    ctx.set('Content-Type', 'image/svg+xml');
    ctx.body = captcha.data;
}));
router_1.default.get('/worker', (ctx) => __awaiter(this, void 0, void 0, function* () {
    ctx.body = process.env.NODE_APP_INSTANCE || 'NOT FOUND';
}));
router_1.default.post('/account/reset', (ctx) => __awaiter(this, void 0, void 0, function* () {
    const email = ctx.request.body.email;
    const password = ctx.request.body.password;
    if (password && ctx.session.resetCode && password === ctx.session.resetCode + '') {
        const newPassword = String(Math.floor(Math.random() * 99999999));
        const user = yield models_1.User.findOne({ where: { email } });
        if (!user) {
            ctx.body = {
                data: {
                    isOk: false,
                    errMsg: '您的邮箱没被注册过。',
                }
            };
            return;
        }
        user.password = md5(md5(newPassword));
        yield user.save();
        ctx.body = {
            data: {
                isOk: true,
                data: newPassword,
            }
        };
    }
    else {
        const resetCode = ctx.session.resetCode = Math.floor(Math.random() * 999999);
        mail_1.default.send(email, 'RAP重置账户验证码', `您的验证码为：${resetCode}`);
        ctx.body = {
            data: {
                isOk: true,
            }
        };
    }
}));
//# sourceMappingURL=account.js.map