var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { URL } = require('url');
const http = require('http');
const _ = require('underscore');
const vm = require('vm');
const RULE_NUM_INT = /^(\d+)-(\d+)/;
const RULE_NUM_DEC = /\.(\d+)-(\d+)$/;
class RoomHelper {
    static requestRoom(path, body, method = 'get') {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof body === 'object') {
                path = path + '?' + RoomHelper.formatKV(body);
            }
            if (path[0] !== '/') {
                path = '/' + path;
            }
            const parsedData = yield new Promise((resolve, reject) => {
                let req = http.request({
                    hostname: 'room.daily.taobao.net',
                    path,
                    method: method.toUpperCase(),
                    timeout: 2e3,
                }, (res) => {
                    const { statusCode } = res;
                    if (statusCode !== 200) {
                        reject(new Error(`Request Failed for ${path}\nStatus Code: ${statusCode}`));
                        res.resume();
                        return;
                    }
                    res.setEncoding('utf8');
                    let rawData = '';
                    res.on('data', (chunk) => { rawData += chunk; });
                    res.on('end', () => {
                        try {
                            const parsedData = JSON.parse(rawData);
                            resolve(parsedData);
                        }
                        catch (e) {
                            reject(e);
                        }
                    });
                }).on('error', (e) => {
                    reject(e);
                });
                req.end();
            });
            if (!parsedData || !parsedData.info || !parsedData.info.ok) {
                throw new Error('Error from room remote: ' + parsedData.info.message);
            }
            return (parsedData && parsedData.data && parsedData.data.result) || parsedData.info.message;
        });
    }
    static matches(inputUrl, inputPath) {
        let beforeUrl = new URL(inputUrl, 'http://localhost');
        let afterUrl = new URL(inputPath, 'http://localhost');
        return beforeUrl.pathname === afterUrl.pathname;
    }
    static generateRules({ name, type, rule, value }) {
        let rules = [];
        switch (type) {
            case 'RegExp':
            case 'Function':
            case 'Object':
                return;
            case 'Array':
                if (rule !== '+1') {
                    return;
                }
                let arr;
                try {
                    let ctx = vm.createContext();
                    arr = vm.runInContext(value, ctx, {
                        timeout: 1000,
                    });
                }
                catch (err) {
                    break;
                }
                let set = new Set();
                for (let item in arr) {
                    if (!_.isBoolean(item) && typeof item !== 'string' && typeof item !== 'number') {
                        continue;
                    }
                    set.add(item.toString().charAt(0));
                }
                for (let i = 'A'.charCodeAt(0), j = 'z'.charCodeAt(0); i < j; i++) {
                    if (!set.has(String.fromCharCode(i))) {
                        rules.push(encapsulate(String.fromCharCode(i), '数组枚举边界'));
                        break;
                    }
                }
                break;
            case 'String': {
                if (!RULE_NUM_INT.test(rule)) {
                    break;
                }
                RULE_NUM_INT.lastIndex = -1;
                let [, intMin, intMax] = RULE_NUM_INT.exec(rule);
                intMin = +intMin;
                intMax = +intMax;
                if (intMin > 0) {
                    rules.push(encapsulate('x'.repeat((value.length || 1) * (intMin - 1)), '字符串长度下界'));
                }
                if (intMax < Number.MAX_SAFE_INTEGER) {
                    rules.push(encapsulate('x'.repeat((value.length || 1) * (intMax + 1)), '字符串长度上界'));
                }
                break;
            }
            case 'Number': {
                rules.push(encapsulate('NaN', '数字类型边界'));
                if (!RULE_NUM_INT.test(rule)) {
                    break;
                }
                RULE_NUM_INT.lastIndex = -1;
                let [, intMin, intMax] = RULE_NUM_INT.exec(rule);
                intMin = +intMin;
                intMax = +intMax;
                if (RULE_NUM_DEC.test(rule)) {
                    RULE_NUM_DEC.lastIndex = -1;
                    let [, decMin, decMax] = RULE_NUM_INT.exec(rule);
                    decMin = +decMin;
                    decMax = +decMax;
                    let dec = (decMin + Math.round(Math.random() * (decMax - decMin))) * 0.01;
                    rules.push(encapsulate(dec + intMin - 1, '数值下界'));
                    rules.push(encapsulate(dec + intMax + 1, '数值上界'));
                }
                else {
                    rules.push(encapsulate(intMin - 1, '数值下界'));
                    rules.push(encapsulate(intMax + 1, '数值上界'));
                }
                break;
            }
            case 'Boolean':
                rules.push(encapsulate('NaN', 'Boolean类型边界'));
                break;
        }
        return rules;
        function encapsulate(stuff, remark) {
            let Type = stuff.constructor;
            let obj = new Type(stuff);
            Object.defineProperty(obj, '$type', {
                value: '-' + name + '-' + (remark || ''),
            });
            return obj;
        }
    }
    static formatKV(obj) {
        let str = '';
        for (let key of Object.keys(obj)) {
            str && (str += '&');
            str += key + '=' + encodeURIComponent(obj[key]);
        }
        return str;
    }
}
exports.default = RoomHelper;
//# sourceMappingURL=roomHelper.js.map