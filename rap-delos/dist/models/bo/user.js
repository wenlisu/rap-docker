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
let User = class User extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(32)),
    __metadata("design:type", String)
], User.prototype, "fullname", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(32)),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(128)),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => __1.Organization, 'ownerId'),
    __metadata("design:type", Array)
], User.prototype, "ownedOrganizations", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => __1.Organization, () => __1.OrganizationsMembers),
    __metadata("design:type", Array)
], User.prototype, "joinedOrganizations", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => __1.Repository, 'ownerId'),
    __metadata("design:type", Array)
], User.prototype, "ownedRepositories", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => __1.Repository, () => __1.RepositoriesMembers),
    __metadata("design:type", Array)
], User.prototype, "joinedRepositories", void 0);
User = __decorate([
    sequelize_typescript_1.Table({ paranoid: true, freezeTableName: false, timestamps: true })
], User);
exports.default = User;
//# sourceMappingURL=user.js.map