import { ebay } from "../../Services/ebay.scrapper";
import { url, ps5, series_x } from "../../Utils/constants";
import { ResolverMap } from "../Utils/graphql-utile";

export const resolvers: ResolverMap = {
    Query: {
        ebay_ps5: async (_, { page }: GQL.IEbayPs5OnQueryArguments) => {
            return await ebay(url(page, ps5));
        },
        ebay_xbox: async (_, { page }: GQL.IEbayXboxOnQueryArguments) => {
            return await ebay(url(page, series_x));
        },
    },
};
