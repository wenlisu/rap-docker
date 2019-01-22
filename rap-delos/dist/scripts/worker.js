Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const app_1 = require("./app");
const start = () => {
    const graceful = require('graceful');
    const now = () => new Date().toISOString().replace(/T/, ' ').replace(/Z/, '');
    const { serve: { port } } = config_1.default;
    const server = app_1.default.listen(port, () => {
        console.log(`[${now()}]   worker#${process.pid} rap2-dolores is running as ${port}`);
    });
    graceful({
        servers: [server],
        killTimeout: '10s',
        error: function (err, throwErrorCount) {
            if (err.message)
                err.message += ` (uncaughtException throw ${throwErrorCount} times on pid:${process.pid})`;
            console.error(`[${now()}] worker#${process.pid}] ${err.message}`);
        },
    });
};
start();
//# sourceMappingURL=worker.js.map