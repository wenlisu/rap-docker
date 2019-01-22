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
const const_1 = require("./utils/const");
const postman_1 = require("../service/postman");
router_1.default.get('/postman/export', (ctx) => __awaiter(this, void 0, void 0, function* () {
    const repoId = +ctx.query.id;
    if (!(repoId > 0)) {
        ctx.data = const_1.COMMON_ERROR_RES.ERROR_PARAMS;
    }
    ctx.body = yield postman_1.default.export(repoId);
}));
//# sourceMappingURL=postman.js.map