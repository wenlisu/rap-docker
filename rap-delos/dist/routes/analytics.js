var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
const repository_1 = require("../models/bo/repository");
const logger_1 = require("../models/bo/logger");
const user_1 = require("../models/bo/user");
const moment = require('moment');
const Sequelize = require('sequelize');
const SELECT = { type: Sequelize.QueryTypes.SELECT };
const sequelize_1 = require("../models/sequelize");
const YYYY_MM_DD = 'YYYY-MM-DD';
router_1.default.get('/app/analytics/repositories/created', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let start = moment().startOf('day').subtract(30, 'days').format(YYYY_MM_DD);
    let end = moment().startOf('day').format(YYYY_MM_DD);
    let sql = `
    SELECT
        DATE(createdAt) AS label,
        COUNT(*) as value
    FROM
        ${repository_1.default.getTableName()}
    WHERE
        createdAt >= '${start}' AND createdAt <= '${end}'
    GROUP BY label
    ORDER BY label ASC;
  `;
    let result = yield sequelize_1.default.query(sql, SELECT);
    result = result.map((item) => ({
        label: moment(item.label).format(YYYY_MM_DD),
        value: item.value,
    }));
    ctx.body = {
        data: result,
    };
}));
router_1.default.get('/app/analytics/repositories/updated', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let start = moment().startOf('day').subtract(30, 'days').format(YYYY_MM_DD);
    let end = moment().startOf('day').format(YYYY_MM_DD);
    let sql = `
    SELECT
        DATE(updatedAt) AS label,
        COUNT(*) as value
    FROM
        ${repository_1.default.getTableName()}
    WHERE
        updatedAt >= '${start}' AND updatedAt <= '${end}'
    GROUP BY label
    ORDER BY label ASC;
  `;
    let result = yield sequelize_1.default.query(sql, SELECT);
    result = result.map((item) => ({
        label: moment(item.label).format(YYYY_MM_DD),
        value: item.value,
    }));
    ctx.body = {
        data: result,
    };
}));
router_1.default.get('/app/analytics/users/activation', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let start = moment().startOf('day').subtract(30, 'days').format(YYYY_MM_DD);
    let end = moment().startOf('day').format(YYYY_MM_DD);
    let sql = `
    SELECT
        loggers.userId AS userId,
        users.fullname AS fullname,
        COUNT(*) AS value
    FROM
        ${logger_1.default.getTableName()} loggers
            LEFT JOIN
        ${user_1.default.getTableName()} users ON (loggers.userId = users.id)
    WHERE
        loggers.updatedAt >= '${start}' AND loggers.updatedat <= '${end}'
    GROUP BY loggers.userId
    ORDER BY value DESC
    LIMIT 10
  `;
    let result = yield sequelize_1.default.query(sql, SELECT);
    ctx.body = {
        data: result,
    };
}));
router_1.default.get('/app/analytics/repositories/activation', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let start = moment().startOf('day').subtract(30, 'days').format(YYYY_MM_DD);
    let end = moment().startOf('day').format(YYYY_MM_DD);
    let sql = `
    SELECT
        loggers.repositoryId AS repositoryId,
        repositories.name,
        COUNT(*) AS value
    FROM
        ${logger_1.default.getTableName()} loggers
    LEFT JOIN
        ${repository_1.default.getTableName()} repositories
        ON (loggers.repositoryId = repositories.id)
    WHERE
        loggers.repositoryId IS NOT NULL
            AND loggers.updatedAt >= '${start}'
            AND loggers.updatedat <= '${end}'
    GROUP BY loggers.repositoryId
    ORDER BY value DESC
    LIMIT 10
  `;
    let result = yield sequelize_1.default.query(sql, SELECT);
    ctx.body = {
        data: result,
    };
}));
//# sourceMappingURL=analytics.js.map