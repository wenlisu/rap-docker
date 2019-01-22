var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var Repository_1;
const sequelize_typescript_1 = require("sequelize-typescript");
const __1 = require("../");
const redis_1 = require("../../service/redis");
let Repository = Repository_1 = class Repository extends sequelize_typescript_1.Model {
    static cleanCache(instance) {
        return __awaiter(this, void 0, void 0, function* () {
            yield redis_1.default.delCache(redis_1.CACHE_KEY.REPOSITORY_GET, instance.id);
        });
    }
    static bulkDeleteCache(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = options && options.attributes && options.attributes.id;
            if (id) {
                yield redis_1.default.delCache(redis_1.CACHE_KEY.REPOSITORY_GET, id);
            }
        });
    }
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Repository.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(256)),
    __metadata("design:type", String)
], Repository.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Repository.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(256)),
    __metadata("design:type", String)
], Repository.prototype, "logo", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Default(true),
    sequelize_typescript_1.Column({ comment: 'true:public, false:private' }),
    __metadata("design:type", Boolean)
], Repository.prototype, "visibility", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => __1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Repository.prototype, "ownerId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => __1.Organization),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Repository.prototype, "organizationId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => __1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Repository.prototype, "creatorId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => __1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Repository.prototype, "lockerId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => __1.User, 'creatorId'),
    __metadata("design:type", __1.User)
], Repository.prototype, "creator", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => __1.User, 'ownerId'),
    __metadata("design:type", __1.User)
], Repository.prototype, "owner", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => __1.Organization, 'organizationId'),
    __metadata("design:type", __1.Organization)
], Repository.prototype, "organization", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => __1.User, 'lockerId'),
    __metadata("design:type", __1.User)
], Repository.prototype, "locker", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => __1.User, 'repositories_members', 'repositoryId', 'userId'),
    __metadata("design:type", Array)
], Repository.prototype, "members", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => __1.Module, 'repositoryId'),
    __metadata("design:type", Array)
], Repository.prototype, "modules", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => __1.Module, 'repositoryId'),
    __metadata("design:type", Array)
], Repository.prototype, "types", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => __1.Module, 'repositoryId'),
    __metadata("design:type", Array)
], Repository.prototype, "interfaces", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => Repository_1, () => __1.RepositoriesCollaborators, 'repositoryId', 'collaboratorId'),
    __metadata("design:type", Array)
], Repository.prototype, "collaborators", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => Repository_1, () => __1.RepositoriesCollaborators, 'collaboratorId'),
    __metadata("design:type", Array)
], Repository.prototype, "repositories", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    sequelize_typescript_1.BeforeUpdate,
    sequelize_typescript_1.BeforeDelete,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Repository]),
    __metadata("design:returntype", Promise)
], Repository, "cleanCache", null);
__decorate([
    sequelize_typescript_1.BeforeBulkCreate,
    sequelize_typescript_1.BeforeBulkUpdate,
    sequelize_typescript_1.BeforeBulkDelete,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Repository, "bulkDeleteCache", null);
Repository = Repository_1 = __decorate([
    sequelize_typescript_1.Table({ paranoid: true, freezeTableName: false, timestamps: true })
], Repository);
exports.default = Repository;
//# sourceMappingURL=repository.js.map