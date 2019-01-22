var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
let router = new Router();
router.get('/', (ctx) => {
    ctx.body = 'Hello RAP!';
});
router.get('/env', (ctx) => {
    ctx.body = process.env.NODE_ENV;
});
router.get('/check.node', (ctx) => {
    ctx.body = 'success';
});
router.get('/status.taobao', (ctx) => {
    ctx.body = 'success';
});
router.get('/test/test.status', (ctx) => {
    ctx.body = 'success';
});
router.get('/proxy', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let { target } = ctx.query;
    let json = yield fetch(target).then(res => res.json());
    ctx.type = 'json';
    ctx.body = json;
}));
exports.default = router;
//# sourceMappingURL=router.js.map