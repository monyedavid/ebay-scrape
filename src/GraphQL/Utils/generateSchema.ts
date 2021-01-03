import * as fs from "fs";
import * as path from "path";
import * as glob from "glob";
import { makeExecutableSchema } from "graphql-tools";
import { mergeTypes, mergeResolvers } from "merge-graphql-schemas";

export const genschema = () => {
    const pathToModules = path.join(__dirname, "../Modules");

    const graphqlTypes = glob // returns an array of all the graphql types in the project
        .sync(`${pathToModules}/*.graphql`)
        .map((x) => fs.readFileSync(x, { encoding: "utf8" }));

    const resolvers = glob // returns an array of all the resolvers in the project
        .sync(`${pathToModules}/resolvers.?s`)
        .map((resolver) => require(resolver).resolvers);

    return makeExecutableSchema({
        typeDefs: mergeTypes(graphqlTypes),
        resolvers: mergeResolvers(resolvers),
    });
};
