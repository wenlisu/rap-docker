Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    static escapeSQL(str) {
        if (typeof str === 'string') {
            str = str.replace(/[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gi, '');
            str = str.replace(/['",\.]/ig, '');
            return str;
        }
        return '';
    }
}
exports.default = Utils;
//# sourceMappingURL=utils.js.map