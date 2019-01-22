var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const delos_1 = require("./delos");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield delos_1.init();
        console.log('after init');
        yield delos_1.after();
        console.log('after after');
    });
}
exports.main = main;
main().then(() => {
    console.log('Run create-db finished successfully.');
    process.exit(0);
});
//# sourceMappingURL=index.js.map