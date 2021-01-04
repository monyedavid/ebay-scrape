import cheerio from "cheerio";
import rp from "request-promise";
import Promises from "bluebird";

/**
 * @param         $ cheerio.root instance
 * @description   Get Total count
 */

function getTotalCount($: cheerio.Root): string {
  return $("h1.srp-controls__count-heading")
    .children("span")
    .first()
    .text()
    ?.split(",")
    .join("");
}

/**
 * @param         $ cheerio.root instance
 * @description   Construct console data objects
 */

async function getItems($: cheerio.Root): Promise<Item[]> {
  const data: Item[] = [];

  await Promises.each(
    $("ul.srp-results.srp-list.clearfix").children("li.s-item    ").get(),
    function (element: any, i: number) {
      const obj: Item = {};
      obj.date_sold = $(element)
        .find("span.s-item__title--tagblock__COMPLETED > span.POSITIVE")
        .text()
        .split("Sold")[1]
        .trim();
      obj.product_link = $(element).find("div > div > a").attr("href");
      obj.sub_title = $(element).find("div > div > a > h3").text();
      obj.item_hash = $(element)
        .find("div > div > a")
        .attr("href")
        .split("hash=")[1]
        .split("&")[0];

      const rating = $(element).find("div > div > div.s-item__reviews");
      const rate_link = rating.find("a").attr("href");
      obj.rating_link = rate_link ? rate_link : "";
      obj.rating = rating
        .find("a > div.x-star-rating > span")
        .text()
        .split(" ")[0];
      obj.rating_review_count = rating
        .find("a > span.s-item__reviews-count")
        .children("span")
        .first()
        .text()
        .split(" ")[0];
      obj.product_price = $(element)
        .find(
          "div > div > div > div.s-item__detail.s-item__detail--primary > span.s-item__price > span"
        )
        .text();
      obj.product_bids = $(element)
        .find(
          "div > div > div.s-item__detail.s-item__detail--primary > span.s-item__bids.s-item__bidCount"
        )
        .text()
        .split(" ")[0];

      data.push(obj);
    }
  );

  return data;
}

/**
 * @param         url ebay.query
 * @description   Begin scraping of url
 */
export async function ebay(
  url: string
): Promise<{
  total_count: string;
  data: Item[];
}> {
  const _options_ = {
    url,
    transform: (body: any) => cheerio.load(body),
  };

  try {
    const $ = await rp(_options_);
    const total_count = getTotalCount($);
    const data = await getItems($);

    return { total_count, data };
  } catch (error) {
    console.error("[error]", error);
    return { total_count: "0", data: [] };
  }
}

export interface Item {
  date_sold?: string;
  item_hash?: string;
  product_link?: string;
  product_price?: string;
  product_bids?: string;
  rating?: string;
  rating_link?: string;
  rating_review_count?: string;
  sub_title?: string;
}
