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
const sequelize_typescript_1 = require("sequelize-typescript");
const __1 = require("../");
let Organization = class Organization extends sequelize_typescript_1.Model {
    static createLog(instance) {
        return __awaiter(this, void 0, void 0, function* () {
            yield __1.Logger.create({
                userId: instance.creatorId,
                type: 'create',
                organizationId: instance.id
            });
        });
    }
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Organization.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(256)),
    __metadata("design:type", String)
], Organization.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Organization.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(256)),
    __metadata("design:type", String)
], Organization.prototype, "logo", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Default(true),
    sequelize_typescript_1.Column({ comment: 'true:public, false:private' }),
    __metadata("design:type", Boolean)
], Organization.prototype, "visibility", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => __1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Organization.prototype, "creatorId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => __1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Organization.prototype, "ownerId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => __1.User, 'creatorId'),
    __metadata("design:type", __1.User)
], Organization.prototype, "creator", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => __1.User, 'ownerId'),
    __metadata("design:type", __1.User)
], Organization.prototype, "owner", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => __1.User, () => __1.OrganizationsMembers),
    __metadata("design:type", Array)
], Organization.prototype, "members", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => __1.OrganizationsMembers),
    __metadata("design:type", Array)
], Organization.prototype, "organizationMembersList", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => __1.Repository, 'organizationId'),
    __metadata("design:type", Array)
], Organization.prototype, "repositories", void 0);
__decorate([
    sequelize_typescript_1.AfterCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Organization]),
    __metadata("design:returntype", Promise)
], Organization, "createLog", null);
Organization = __decorate([
    sequelize_typescript_1.Table({ paranoid: true, freezeTableName: false, timestamps: true })
], Organization);
exports.default = Organization;
//# sourceMappingURL=organization.js.map