var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const organization_1 = require("./organization");
class RepositoryService {
    static canUserAccessRepository(userId, repositoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = yield models_1.Repository.findById(repositoryId);
            if (!repo)
                return false;
            if (repo.creatorId === userId || repo.ownerId === userId)
                return true;
            const memberExistsNum = yield models_1.RepositoriesMembers.count({
                where: {
                    userId,
                    repositoryId,
                }
            });
            if (memberExistsNum > 0)
                return true;
            return organization_1.default.canUserAccessOrganization(userId, repo.organizationId);
        });
    }
}
exports.default = RepositoryService;
//# sourceMappingURL=repository.js.map