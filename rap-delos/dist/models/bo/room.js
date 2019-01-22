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
let Room = class Room extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Room.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => __1.Repository),
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.BIGINT, comment: 'rap中的项目id' }),
    __metadata("design:type", Number)
], Room.prototype, "repositoryId", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.BIGINT, comment: 'room中的项目id' }),
    __metadata("design:type", Number)
], Room.prototype, "roomProjectId", void 0);
__decorate([
    sequelize_typescript_1.Column({ comment: '项目域名' }),
    __metadata("design:type", String)
], Room.prototype, "hostname", void 0);
Room = __decorate([
    sequelize_typescript_1.Table({ paranoid: true, freezeTableName: false, timestamps: false, tableName: 'foreign_room' })
], Room);
exports.default = Room;
//# sourceMappingURL=room.js.map