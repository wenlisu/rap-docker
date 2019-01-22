Object.defineProperty(exports, "__esModule", { value: true });
let pathToRegexp = require('path-to-regexp');
class UrlUtils {
}
UrlUtils.getRelative = (url) => {
    url = url.toLowerCase();
    const prefixes = ['https://', 'http://'];
    for (let item of prefixes) {
        if (url.indexOf(item) > -1) {
            url = url.substring(item.length);
            if (url.indexOf('/') > -1) {
                url = url.substring(url.indexOf('/'));
            }
            else {
                url = '/';
            }
            break;
        }
    }
    if (url.indexOf('?') > -1) {
        url = url.substring(0, url.indexOf('?'));
    }
    if (url[0] !== '/')
        url = '/' + url;
    return url;
};
UrlUtils.urlMatchesPattern = (url, pattern) => {
    url = UrlUtils.getRelative(url);
    pattern = UrlUtils.getRelative(pattern);
    let re = pathToRegexp(pattern);
    return re.test(url);
};
exports.default = UrlUtils;
//# sourceMappingURL=url.js.map