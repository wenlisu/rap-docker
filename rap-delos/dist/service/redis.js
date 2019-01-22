Object.defineProperty(exports, "__esModule", { value: true });
const redis = require("redis");
const config_1 = require("../config");
const ioredis = require("ioredis");
var CACHE_KEY;
(function (CACHE_KEY) {
    CACHE_KEY["REPOSITORY_GET"] = "REPOSITORY_GET";
})(CACHE_KEY = exports.CACHE_KEY || (exports.CACHE_KEY = {}));
class RedisService {
    static getCacheKey(key, entityId) {
        return `${key}:${entityId || ''}`;
    }
    static getCache(key, entityId) {
        const cacheKey = this.getCacheKey(key, entityId);
        return new Promise((resolve, reject) => {
            RedisService.client.get(cacheKey, (error, value) => {
                if (error) {
                    return reject(error);
                }
                resolve(value);
            });
        });
    }
    static setCache(key, val, entityId, expireTime) {
        const cacheKey = this.getCacheKey(key, entityId);
        return new Promise((resolve, reject) => {
            RedisService.client.set(cacheKey, val, 'EX', expireTime || 1 * 24 * 60 * 60, (err) => {
                if (err) {
                    return reject(false);
                }
                return resolve(true);
            });
        });
    }
    static delCache(key, entityId) {
        let cacheKey = this.getCacheKey(key, entityId);
        return new Promise((resolve, reject) => {
            RedisService.client.del(cacheKey, (error) => {
                if (error) {
                    reject(error);
                }
                resolve(true);
            });
        });
    }
}
RedisService.client = config_1.default.redis && config_1.default.redis.isRedisCluster ? new ioredis.Cluster(config_1.default.redis.nodes, { redisOptions: config_1.default.redis.redisOptions }) : redis.createClient(config_1.default.redis);
exports.default = RedisService;
//# sourceMappingURL=redis.js.map