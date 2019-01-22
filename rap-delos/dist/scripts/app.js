var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const session = require("koa-generic-session");
const redisStore = require("koa-redis");
const logger = require("koa-logger");
const serve = require("koa-static");
const cors = require("kcors");
const bodyParser = require("koa-body");
const routes_1 = require("../routes");
const config_1 = require("../config");
const app = new Koa();
let appAny = app;
appAny.counter = { users: {}, mock: 0 };
app.keys = config_1.default.keys;
app.use(session({
    store: redisStore(config_1.default.redis)
}));
if (process.env.NODE_ENV === 'development' && process.env.TEST_MODE !== 'true')
    app.use(logger());
app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    ctx.set('Access-Control-Allow-Credentials', 'true');
    yield next();
    if (ctx.path === '/favicon.ico')
        return;
    ctx.session.views = (ctx.session.views || 0) + 1;
    let app = ctx.app;
    if (ctx.session.fullname)
        app.counter.users[ctx.session.fullname] = true;
}));
app.use(cors({
    credentials: true,
}));
app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    yield next();
    if (typeof ctx.body === 'object' && ctx.body.data !== undefined) {
        ctx.type = 'json';
        ctx.body = JSON.stringify(ctx.body, undefined, 2);
    }
}));
app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    yield next();
    if (ctx.request.query.callback) {
        let body = typeof ctx.body === 'object' ? JSON.stringify(ctx.body, undefined, 2) : ctx.body;
        ctx.body = ctx.request.query.callback + '(' + body + ')';
        ctx.type = 'application/x-javascript';
    }
}));
app.use(serve('public'));
app.use(serve('test'));
app.use(bodyParser({ multipart: true }));
app.use(routes_1.default.routes());
exports.default = app;
//# sourceMappingURL=app.js.map