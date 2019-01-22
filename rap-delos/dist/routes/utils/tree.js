Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("underscore");
const vm = require('vm');
const Mock = require("mockjs");
const { RE_KEY } = require('mockjs/src/mock/constant');
class Tree {
    static ArrayToTree(list) {
        let result = {
            name: 'root',
            children: [],
            depth: 0,
        };
        let mapped = {};
        list.forEach(item => { mapped[item.id] = item; });
        function _parseChildren(parentId, children, depth) {
            for (let id in mapped) {
                let item = mapped[id];
                if (typeof parentId === 'function' ? parentId(item.parentId) : item.parentId === parentId) {
                    children.push(item);
                    item.depth = depth + 1;
                    item.children = _parseChildren(item.id, [], item.depth);
                }
            }
            return children;
        }
        _parseChildren((parentId) => {
            if (parentId === -1)
                return true;
            return false;
        }, result.children, result.depth);
        return result;
    }
    static TreeToTemplate(tree) {
        function parse(item, result) {
            let rule = item.rule ? ('|' + item.rule) : '';
            let value = item.value;
            if (item.value && item.value.indexOf('[') === 0 && item.value.substring(item.value.length - 1) === ']') {
                try {
                    result[item.name + rule] = eval(`(${item.value})`);
                }
                catch (e) {
                    result[item.name + rule] = item.value;
                }
            }
            else {
                switch (item.type) {
                    case 'String':
                        result[item.name + rule] = item.value;
                        break;
                    case 'Number':
                        if (value === '')
                            value = 1;
                        let parsed = parseFloat(value);
                        if (!isNaN(parsed))
                            value = parsed;
                        result[item.name + rule] = value;
                        break;
                    case 'Boolean':
                        if (value === 'true')
                            value = true;
                        if (value === 'false')
                            value = false;
                        if (value === '0')
                            value = false;
                        value = !!value;
                        result[item.name + rule] = value;
                        break;
                    case 'Function':
                    case 'RegExp':
                        try {
                            result[item.name + rule] = eval('(' + item.value + ')');
                        }
                        catch (e) {
                            console.warn(`TreeToTemplate ${e.message}: ${item.type} { ${item.name}${rule}: ${item.value} }`);
                            result[item.name + rule] = item.value;
                        }
                        break;
                    case 'Object':
                        if (item.value) {
                            try {
                                result[item.name + rule] = eval(`(${item.value})`);
                            }
                            catch (e) {
                                result[item.name + rule] = item.value;
                            }
                        }
                        else {
                            result[item.name + rule] = {};
                            item.children.forEach((child) => {
                                parse(child, result[item.name + rule]);
                            });
                        }
                        break;
                    case 'Array':
                        if (item.value) {
                            try {
                                result[item.name + rule] = eval(`(${item.value})`);
                            }
                            catch (e) {
                                result[item.name + rule] = item.value;
                            }
                        }
                        else {
                            result[item.name + rule] = item.children.length ? [{}] : [];
                            item.children.forEach((child) => {
                                parse(child, result[item.name + rule][0]);
                            });
                        }
                        break;
                }
            }
        }
        let result = {};
        tree.children.forEach((child) => {
            parse(child, result);
        });
        return result;
    }
    static TemplateToData(template) {
        const sandbox = { Mock, template, data: {} };
        const script = new vm.Script('data = Mock.mock(template)');
        const context = new vm.createContext(sandbox);
        try {
            script.runInContext(context, { timeout: 1000 });
            let data = sandbox.data;
            let keys = Object.keys(data);
            if (keys.length === 1 && keys[0] === '__root__')
                data = data.__root__;
            return data;
        }
        catch (err) {
            console.error(err);
            return {};
        }
    }
    static ArrayToTreeToTemplate(list) {
        let tree = Tree.ArrayToTree(list);
        let template = Tree.TreeToTemplate(tree);
        return template;
    }
    static ArrayToTreeToTemplateToData(list, extra) {
        let tree = Tree.ArrayToTree(list);
        let template = Tree.TreeToTemplate(tree);
        let data;
        if (extra) {
            let keys = Object.keys(template).map(item => item.replace(RE_KEY, '$1'));
            let extraKeys = _.difference(Object.keys(extra), keys);
            let scopedData = Tree.TemplateToData(Object.assign({}, _.pick(extra, extraKeys), template));
            for (const key in scopedData) {
                if (!scopedData.hasOwnProperty(key))
                    continue;
                let data = scopedData[key];
                for (const eKey in extra) {
                    if (!extra.hasOwnProperty(eKey))
                        continue;
                    const pattern = new RegExp(`\\$${eKey}\\$`, 'g');
                    if (data && pattern.test(data)) {
                        data = scopedData[key] = data.replace(pattern, extra[eKey]);
                    }
                }
            }
            data = _.pick(scopedData, keys);
        }
        else {
            data = Tree.TemplateToData(template);
        }
        return data;
    }
    static ArrayToTreeToTemplateToJSONSchema(list) {
        let tree = Tree.ArrayToTree(list);
        let template = Tree.TreeToTemplate(tree);
        let schema = Mock.toJSONSchema(template);
        return schema;
    }
    static stringifyWithFunctonAndRegExp(json) {
        return JSON.stringify(json, (k, v) => {
            k;
            if (typeof v === 'function')
                return v.toString();
            if (v !== undefined && v !== null && v.exec)
                return v.toString();
            else
                return v;
        }, 2);
    }
}
exports.default = Tree;
//# sourceMappingURL=tree.js.map