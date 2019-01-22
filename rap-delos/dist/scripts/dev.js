Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const app_1 = require("./app");
const start = () => {
    let execSync = require('child_process').execSync;
    let port = config_1.default.serve.port;
    let url = `http://localhost:${port}`;
    let open = false;
    console.log('----------------------------------------');
    app_1.default.listen(port, () => {
        console.log(`rap2-dolores is running as ${url}`);
        if (!open)
            return;
        try {
            execSync(`osascript openChrome.applescript ${url}`, { cwd: __dirname, stdio: 'ignore' });
        }
        catch (e) {
            execSync(`open ${url}`);
        }
    });
};
start();
//# sourceMappingURL=dev.js.map