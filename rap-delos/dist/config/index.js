Object.defineProperty(exports, "__esModule", { value: true });
let configObj = (process.env.NODE_ENV === 'local' && require('./config.local')).default ||
    (process.env.NODE_ENV === 'development' && require('./config.dev')).default ||
    require('./config.prod').default;
exports.default = configObj;
//# sourceMappingURL=index.js.map