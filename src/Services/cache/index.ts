import { default as Redis } from "ioredis";

export const redis = new Redis({
    host: process.env.REDIS_HOST as string,
    port: process.env.REDIS_PORT as any,
    retryStrategy: (times) => {
        // reconnect after
        return Math.min(times * 50, 2000);
    },
});

export const subRedis = new Redis({
    host: process.env.REDIS_HOST as string,
    port: process.env.REDIS_PORT as any,
    retryStrategy: (times) => {
        // reconnect after
        return Math.min(times * 50, 2000);
    },
});

export const pubRedis = new Redis({
    host: process.env.REDIS_HOST as string,
    port: process.env.REDIS_PORT as any,
    retryStrategy: (times) => {
        // reconnect after
        return Math.min(times * 50, 2000);
    },
});
