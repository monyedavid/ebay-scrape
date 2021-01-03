import { Redis } from "ioredis";
import { Request, Response } from "express-serve-static-core";
import { PubSub } from "apollo-server";

export interface Context {
  redis: Redis;
  res: Response;
  req: Request;
  request_origin: string | string[] | undefined;
  pubSub: PubSub;
}

export type Resolver = (
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;

export type GRAQPHQLmiddlewareFunc = (
  resolver: Resolver,
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;

export interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver | { [key: string]: Resolver };
  };
}
