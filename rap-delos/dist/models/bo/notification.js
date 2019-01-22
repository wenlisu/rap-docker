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
let Notification = class Notification extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Notification.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column({ comment: 'sender' }),
    __metadata("design:type", Number)
], Notification.prototype, "fromId", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column({ comment: 'receiver' }),
    __metadata("design:type", Number)
], Notification.prototype, "toId", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column({ comment: 'msg type' }),
    __metadata("design:type", String)
], Notification.prototype, "type", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(128)),
    __metadata("design:type", String)
], Notification.prototype, "param1", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(128)),
    __metadata("design:type", String)
], Notification.prototype, "param2", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(128)),
    __metadata("design:type", String)
], Notification.prototype, "param3", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Notification.prototype, "readed", void 0);
Notification = __decorate([
    sequelize_typescript_1.Table({ paranoid: true, freezeTableName: false, timestamps: true })
], Notification);
exports.default = Notification;
//# sourceMappingURL=notification.js.map