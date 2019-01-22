Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = require("../config");
const migrate_1 = require("../service/migrate");
const chalk = require('chalk');
const now = () => new Date().toISOString().replace(/T/, ' ').replace(/Z/, '');
const logging = process.env.NODE_ENV === 'development'
    ? (sql) => {
        sql = sql.replace('Executing (default): ', '');
        console.log(`${chalk.bold('SQL')} ${now()} ${chalk.gray(sql)}`);
    }
    : console.log;
const sequelize = new sequelize_typescript_1.Sequelize({
    database: config_1.default.db.database,
    dialect: config_1.default.db.dialect,
    username: config_1.default.db.username,
    password: config_1.default.db.password,
    host: config_1.default.db.host,
    port: config_1.default.db.port,
    pool: config_1.default.db.pool,
    logging: config_1.default.db.logging ? logging : false,
});
sequelize.addModels([__dirname + '/bo']);
sequelize.authenticate()
    .then(() => {
    console.log('----------------------------------------');
    console.log('DATABASE √');
    console.log('    HOST     %s', config_1.default.db.host);
    console.log('    PORT     %s', config_1.default.db.port);
    console.log('    DATABASE %s', config_1.default.db.database);
    console.log('----------------------------------------');
    migrate_1.default.checkAndFix();
})
    .catch(err => {
    console.log('Unable to connect to the database:', err);
});
exports.default = sequelize;
//# sourceMappingURL=sequelize.js.map