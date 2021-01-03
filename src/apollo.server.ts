import "reflect-metadata";
import "dotenv/config";

import { default as session } from "express-session";
import { default as express } from "express";
import { default as bodyParser } from "body-parser";
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import { RedisPubSub } from "graphql-redis-subscriptions";
import api_v1 from "./Api/v1";
import { subRedis, redis, pubRedis } from "./Services/cache";
import { genschema } from "./GraphQL/Utils/generateSchema";
import GraphQLogger from "./Utils/log/request-logger";
import {
    redisSessionPrefix,
    serverName,
    serverMessage,
    inDevelopment,
    httpOnly,
} from "./Utils/constants";

import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import EbayBot from "./Services/bot";

const RedisStore = connectRedis(session);
const sessionSecret = process.env.SESSION_SECRET as string;

export const pubSub = new RedisPubSub({
    publisher: pubRedis,
    subscriber: subRedis,
});

export const startServer = async () => {
    const app = express();
    const schema = genschema();

    /**
     * @description   GraphQl Server Logger
     *
     */

    GraphQLogger(app);

    /**
     * @description  Session redis config
     */
    app.set("trust proxy", 1); // trust first proxy

    app.use(
        session({
            store: new RedisStore({
                client: redis as any,
                prefix: redisSessionPrefix,
            }),
            name: serverName,
            secret: sessionSecret,
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: !httpOnly,
                maxAge: 1000 * 60 * 60 * 24 * 7,
                secure: false,
                sameSite: "strict",
            },
        })
    );

    app.use("/graphql", bodyParser.json());

    const apolloServer = new ApolloServer({
        schema,
        context: async ({ req: request, res: response }) => ({
            redis,
            res: response,
            req: request,
            request_origin: request ? request.headers.origin : "", //  [header: string]: string | string[] | undefined;
            pubSub,
        }),
        playground: true,
        introspection: true,
        debug: inDevelopment,
    });

    apolloServer.applyMiddleware({
        app,
        cors: {
            credentials: true,
            origin: [
                /^http:\/\/localhost:/, // [*ports]
            ],
        },
    });

    app.use("/api/v1", api_v1);

    /** running automated scrape */
    const bot = new EbayBot();
    bot.apply();

    const port = process.env.PORT || 4000;
    const server = createServer(app);

    server.listen(port, () => {
        console.log(serverMessage + port);
        new SubscriptionServer(
            {
                execute,
                subscribe,
                schema,
                keepAlive: 10000,
            },
            {
                server,
            }
        );
    });

    return server;
};
