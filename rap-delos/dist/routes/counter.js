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
const config_1 = require("../config");
router_1.default.get('/app/counter', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let app = ctx.app;
    ctx.body = {
        data: {
            version: config_1.default.version,
            users: Object.keys(app.counter.users).length,
            mock: app.counter.mock,
        },
    };
}));
//# sourceMappingURL=counter.js.map