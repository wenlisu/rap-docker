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
var Interface_1;
const sequelize_typescript_1 = require("sequelize-typescript");
const __1 = require("../");
const redis_1 = require("../../service/redis");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
var methods;
(function (methods) {
    methods["GET"] = "GET";
    methods["POST"] = "POST";
    methods["PUT"] = "PUT";
    methods["DELETE"] = "DELETE";
})(methods || (methods = {}));
let Interface = Interface_1 = class Interface extends sequelize_typescript_1.Model {
    static deleteCache(instance) {
        return __awaiter(this, void 0, void 0, function* () {
            yield redis_1.default.delCache(redis_1.CACHE_KEY.REPOSITORY_GET, instance.repositoryId);
        });
    }
    static bulkDeleteCache(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = +(options && options.attributes && options.attributes.id);
            if (!id) {
                id = options.where && +options.where.id;
            }
            if (options.where && options.where[Op.and]) {
                const arr = options.where[Op.and];
                if (arr && arr[1] && arr[1].id) {
                    id = arr[1].id;
                }
            }
            if (+id) {
                id = +id;
                const itf = yield Interface_1.findById(id);
                yield redis_1.default.delCache(redis_1.CACHE_KEY.REPOSITORY_GET, itf.repositoryId);
            }
        });
    }
};
Interface.METHODS = methods;
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Interface.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(256)),
    __metadata("design:type", String)
], Interface.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(256)),
    __metadata("design:type", String)
], Interface.prototype, "url", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column({ comment: 'API method' }),
    __metadata("design:type", String)
], Interface.prototype, "method", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Interface.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Default(1),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.BIGINT(11)),
    __metadata("design:type", Number)
], Interface.prototype, "priority", void 0);
__decorate([
    sequelize_typescript_1.Default(200),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Interface.prototype, "status", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => __1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Interface.prototype, "creatorId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => __1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Interface.prototype, "lockerId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => __1.Module),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Interface.prototype, "moduleId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => __1.Repository),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Interface.prototype, "repositoryId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => __1.Type),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Interface.prototype, "typeId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => __1.User, 'creatorId'),
    __metadata("design:type", __1.User)
], Interface.prototype, "creator", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => __1.User, 'lockerId'),
    __metadata("design:type", __1.User)
], Interface.prototype, "locker", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => __1.Module, 'moduleId'),
    __metadata("design:type", __1.Module)
], Interface.prototype, "module", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => __1.Repository, 'repositoryId'),
    __metadata("design:type", __1.Repository)
], Interface.prototype, "repository", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => __1.Type, 'typeId'),
    __metadata("design:type", __1.Type)
], Interface.prototype, "types", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => __1.Property, 'interfaceId'),
    __metadata("design:type", Array)
], Interface.prototype, "properties", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    sequelize_typescript_1.BeforeUpdate,
    sequelize_typescript_1.BeforeDelete,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Interface]),
    __metadata("design:returntype", Promise)
], Interface, "deleteCache", null);
__decorate([
    sequelize_typescript_1.BeforeBulkCreate,
    sequelize_typescript_1.BeforeBulkUpdate,
    sequelize_typescript_1.BeforeBulkDelete,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Interface, "bulkDeleteCache", null);
Interface = Interface_1 = __decorate([
    sequelize_typescript_1.Table({ paranoid: true, freezeTableName: false, timestamps: true })
], Interface);
exports.default = Interface;
//# sourceMappingURL=interface.js.map