var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const organization_1 = require("../../service/organization");
const repository_1 = require("../../service/repository");
var ACCESS_TYPE;
(function (ACCESS_TYPE) {
    ACCESS_TYPE[ACCESS_TYPE["ORGANIZATION"] = 0] = "ORGANIZATION";
    ACCESS_TYPE[ACCESS_TYPE["REPOSITORY"] = 1] = "REPOSITORY";
    ACCESS_TYPE[ACCESS_TYPE["USER"] = 2] = "USER";
})(ACCESS_TYPE = exports.ACCESS_TYPE || (exports.ACCESS_TYPE = {}));
class AccessUtils {
    static canUserAccess(accessType, curUserId, entityId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (accessType === ACCESS_TYPE.ORGANIZATION) {
                return yield organization_1.default.canUserAccessOrganization(curUserId, entityId);
            }
            else if (accessType === ACCESS_TYPE.REPOSITORY) {
                return yield repository_1.default.canUserAccessRepository(curUserId, entityId);
            }
            return false;
        });
    }
}
exports.AccessUtils = AccessUtils;
//# sourceMappingURL=access.js.map