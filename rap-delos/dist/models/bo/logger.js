var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const __1 = require("../");
var types;
(function (types) {
    types["CREATE"] = "create";
    types["UPDATE"] = "update";
    types["DELETE"] = "delete";
    types["LOCK"] = "lock";
    types["UNLOCK"] = "unlock";
    types["JOIN"] = "join";
    types["EXIT"] = "exit";
})(types || (types = {}));
let Logger = class Logger extends sequelize_typescript_1.Model {
};
Logger.TYPES = types;
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Logger.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.ENUM(types.CREATE, types.UPDATE, types.DELETE, types.LOCK, types.UNLOCK, types.JOIN, types.EXIT),
        comment: 'operation type',
    }),
    __metadata("design:type", String)
], Logger.prototype, "type", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => __1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Logger.prototype, "creatorId", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.ForeignKey(() => __1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Logger.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => __1.Organization),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Logger.prototype, "organizationId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => __1.Repository),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Logger.prototype, "repositoryId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => __1.Module),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Logger.prototype, "moduleId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => __1.Type),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Logger.prototype, "typeId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => __1.Interface),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Logger.prototype, "interfaceId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => __1.User, 'creatorId'),
    __metadata("design:type", __1.User)
], Logger.prototype, "creator", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => __1.User, 'userId'),
    __metadata("design:type", __1.User)
], Logger.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => __1.Repository, 'repositoryId'),
    __metadata("design:type", __1.Repository)
], Logger.prototype, "repository", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => __1.Organization, 'organizationId'),
    __metadata("design:type", __1.Organization)
], Logger.prototype, "organization", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => __1.Module, 'moduleId'),
    __metadata("design:type", __1.Module)
], Logger.prototype, "module", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => __1.Type, 'typeId'),
    __metadata("design:type", __1.Type)
], Logger.prototype, "types", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => __1.Interface, 'interfaceId'),
    __metadata("design:type", __1.Interface)
], Logger.prototype, "interface", void 0);
Logger = __decorate([
    sequelize_typescript_1.Table({ paranoid: true, freezeTableName: false, timestamps: true })
], Logger);
exports.default = Logger;
//# sourceMappingURL=logger.js.map