// tslint:disable
// graphql typescript definitions

declare namespace GQL {
interface IGraphQLResponseRoot {
data?: IQuery;
errors?: Array<IGraphQLResponseError>;
}

interface IGraphQLResponseError {
/** Required for all errors */
message: string;
locations?: Array<IGraphQLResponseErrorLocation>;
/** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
[propName: string]: any;
}

interface IGraphQLResponseErrorLocation {
line: number;
column: number;
}

interface IQuery {
__typename: "Query";

/**
 * From Ebay
 */
ebay_ps5: IConsoleStat;
ebay_xbox: IConsoleStat;

/**
 * From Storage
 */
ps5: IConsoleStat;
xbox: IConsoleStat;
}

interface IEbayPs5OnQueryArguments {
page: number;
}

interface IEbayXboxOnQueryArguments {
page: number;
}

interface IPs5OnQueryArguments {
options: IOptions;
}

interface IXboxOnQueryArguments {
options: IOptions;
}

interface IConsoleStat {
__typename: "ConsoleStat";
total_count: string | null;
data: Array<IItem | null> | null;
}

interface IItem {
__typename: "Item";
date_sold: string | null;
item_hash: string | null;
product_link: string | null;
product_price: string | null;
product_bids: string | null;
rating: string | null;
rating_link: string | null;
rating_review_count: string | null;
sub_title: string | null;
}

interface IOptions {
take?: number | null;
skip?: number | null;
date?: string | null;
}

interface ISubscription {
__typename: "subscription";

/**
 * From Ebay -- Live updates
 */
console_live_sales: Array<IItem | null> | null;
}

interface IConsoleLiveSalesOnSubscriptionArguments {
console?: string | null;
}
}

// tslint:enable
