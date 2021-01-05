import cheerio from "cheerio";
import rp from "request-promise";
import Promises from "bluebird";

async function proxy($: cheerio.Root) {
  const ip_addresses = [];
  const port_numbers = [];
  const random_number = Math.floor(Math.random() * 18);

  await Promises.each($("td:nth-child(1)").get(), function (element, i) {
    const val = $(element).text();
    if (i <= 18) ip_addresses[i] = val;
  });

  await Promises.each($("td:nth-child(2)").get(), function (element, i) {
    const val = $(element).text();
    if (i <= 18) port_numbers[i] = val;
  });

  return `http://${ip_addresses[random_number]}:${port_numbers[random_number]}`;
}

export default async function proxyGenerator(): Promise<string> {
  const _options_ = {
    url: "https://sslproxies.org",
    transform: (body: any) => cheerio.load(body),
  };

  try {
    const $ = await rp(_options_);
    return await proxy($);
  } catch (error) {
    console.error("[error]", error);
    return "";
  }
}
