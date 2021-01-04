import { ebay } from "../../Services/ebay.scrapper";
import { url, ps5, series_x } from "../../Utils/constants";
import { ResolverMap } from "../Utils/graphql-utile";
import ScrappedData from "../../Services/scrapped.data";
import cron_scheduler from "../../Services/cron";
import { pubSub } from "../../apollo.server";

export const resolvers: ResolverMap = {
    Subscription: {
        live_sales_seriesx: {
            subscribe: () => pubSub.asyncIterator("LIVE_SALES_XBOX"),
        },
        live_sales_ps5: {
            subscribe: () => pubSub.asyncIterator("LIVE_SALES_PS5"),
        },
    },
    Query: {
        ebay_ps5: async (_, { page }: GQL.IEbayPs5OnQueryArguments) => {
            return await ebay(url(page, ps5));
        },
        ebay_xbox: async (_, { page }: GQL.IEbayXboxOnQueryArguments) => {
            return await ebay(url(page, series_x));
        },
        get: async (_, args: GQL.IGetOnQueryArguments) => {
            const service = new ScrappedData();
            return service.get(args);
        },
        daily: async (_, { options, console }: GQL.IDailyOnQueryArguments) => {
            const service = new ScrappedData();
            return service.get({
                console,
                options: { ...options, date: "daily" },
            });
        },
        live_sales: async (
            _,
            { console: game_console }: GQL.ILiveSalesOnQueryArguments
        ) => {
            let c_query = series_x;
            let trigger;
            if (game_console === "xbox") {
                c_query = series_x;
                trigger = "LIVE_SALES_XBOX";
            } else {
                c_query = ps5;
                trigger = "LIVE_SALES_PS5";
            }

            const doTheThing = async () => {
                const { data } = await ebay(url(1, c_query));
                if (game_console === "xbox")
                    pubSub.publish(trigger, { live_sales_seriesx: data });
                else pubSub.publish(trigger, { live_sales_ps5: data });
            };

            doTheThing();

            cron_scheduler(doTheThing, "*/10 * * * *");

            return true;
        },
    },
};
