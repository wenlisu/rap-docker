Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../models/sequelize");
const utils_1 = require("./utils");
class OrganizationService {
    static canUserAccessOrganization(userId, organizationId) {
        const sql = `
      SELECT COUNT(id) AS num FROM (
        SELECT o.id, o.name
        FROM Organizations o
        WHERE visibility = ${1} OR creatorId = ${userId} OR ownerId = ${userId}
        UNION
        SELECT o.id, o.name
        FROM Organizations o
        JOIN organizations_members om ON o.id = om.organizationId
        WHERE om.userId = ${userId}
      ) as result
      WHERE id = ${organizationId}
    `;
        return new Promise(resolve => {
            sequelize_1.default.query(sql).spread((result) => {
                resolve(+result[0].num > 0);
            });
        });
    }
    static getAllOrganizationIdList(curUserId, pager, query) {
        if (query) {
            query = utils_1.default.escapeSQL(query);
        }
        const sql = `
      SELECT id FROM (
        SELECT o.id, o.name
        FROM Organizations o
        WHERE visibility = ${1} OR creatorId = ${curUserId} OR ownerId = ${curUserId}
        UNION
        SELECT o.id, o.name
        FROM Organizations o
        JOIN organizations_members om ON o.id = om.organizationId
        WHERE om.userId = ${curUserId}
      ) as result
      ${query ? `WHERE id = '${query}' OR name LIKE '%${query}%'` : ''}
      ORDER BY id desc
      LIMIT ${pager.start}, ${pager.limit}
    `;
        return new Promise(resolve => {
            sequelize_1.default.query(sql).spread((result) => {
                resolve(result.map(item => item.id));
            });
        });
    }
    static getAllOrganizationIdListNum(curUserId) {
        const sql = `
      SELECT count(*) AS num FROM (
        SELECT o.id, o.name
        FROM Organizations o
        WHERE visibility = ${1} OR creatorId = ${curUserId} OR ownerId = ${curUserId}
        UNION
        SELECT o.id, o.name
        FROM Organizations o
        JOIN organizations_members om ON o.id = om.organizationId
        WHERE om.userId = ${curUserId}
      ) as result
      ORDER BY id desc
    `;
        return new Promise(resolve => {
            sequelize_1.default.query(sql).spread((result) => {
                resolve(result[0].num);
            });
        });
    }
}
exports.default = OrganizationService;
//# sourceMappingURL=organization.js.map