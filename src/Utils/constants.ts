export const serverName = "naze-labs";
export const serverMessage =
    "🚀💦💦 Apollo Server is now running on http://localhost:";
export const redisSessionPrefix = "sess:";
// Environments
export const inProduction = process.env.NODE_ENV === "production";
export const inDevelopment = process.env.NODE_ENV === "development";

export const httpOnly =
    process.env.NODE_ENV === "production" ||
    process.env.NODE_ENV === "development";

// ..
export const ps5 = "playstation+5+console";
export const series_x = "xbox+series+x+console";
export const url = (
    pgn: number = 1,
    console: string = series_x,
    _ipg: number = 25
) =>
    `https://www.ebay.com/sch/i.html?_from=R40&_nkw=${console}&_sacat=0&LH_Sold=1&LH_Complete=1&rt=nc&LH_All=1&_ipg=${_ipg}&_pgn=${pgn}`;
