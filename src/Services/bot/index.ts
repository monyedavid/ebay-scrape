import jsonfile from "jsonfile";
import { naze } from "../../Database/entities/naze";
import { url, ps5, series_x } from "../../Utils/constants";
import cron_scheduler from "../cron";
import { ebay } from "../ebay.scrapper";

export default class EbayBot {
    private xbox_file = "./xbox_sales.json";
    private ps_file = "./ps_sales.json";
    public apply() {
        cron_scheduler(() => this.autoScrape());
    }

    /**
     * @description      Scrape ebay & generate local data collection
     */
    private async autoScrape() {
        this.console().then(() => this.console(ps5, "ps5").then());
    }

    private async console(
        console_url_query: string = series_x,
        console_type: string = "xbox"
    ) {
        const _ipg = 200; // Highest item per_page
        // const tc = parseInt(total_count, 10); | tc / _ipg | 10k is ebay max
        const number_of_available_pages = 10000 / _ipg;

        const items = await naze.find({ where: { console_type } });

        if (!items.length) {
            for (
                let page_number = number_of_available_pages;
                page_number > 0;
                page_number--
            ) {
                const { data } = await ebay(
                    url(page_number, console_url_query, _ipg)
                );

                for (let index = data.length - 1; index >= 0; index--) {
                    await naze.insert({
                        ...data[index],
                        console_type,
                    });
                }
            }
        } else {
            let page = 1;
            const ipg = 25;
            let keep_looking = true;
            const to_save = []; // save in reverse-order

            const { item_hash, ...rest } = await naze.findOne({
                order: { id: "DESC" },
                where: { console_type },
            });

            while (keep_looking) {
                const { data } = await ebay(url(page, console_url_query, ipg));

                for (let i = 0; i < data.length; i++) {
                    if (data[i].item_hash == item_hash) {
                        // identify marker item
                        // exist search for new item
                        keep_looking = false;
                        break;
                    } else {
                        // new-item
                        to_save.push(
                            naze.create({
                                ...data[i],
                                console_type,
                            })
                        );
                    }
                }

                page++;
            }

            for (let index = to_save.length - 1; index >= 0; index--) {
                await naze.insert({
                    ...to_save[index],
                    console_type: "xbox",
                });
            }
        }

        return;
    }

    /*
     * this sets up the blank file so
     * the first appended object wont fail
     */
    public setUpFile() {
        jsonfile.readFile(this.xbox_file, "utf8", (err, data) => {
            if (err) {
                if (err.code === "ENOENT") {
                    console.error("creating xbox-sales fiile");
                    jsonfile.writeFileSync(this.xbox_file, "");
                    return;
                }
            }
        });

        jsonfile.readFile(this.ps_file, "utf8", (err, data) => {
            if (err) {
                if (err.code === "ENOENT") {
                    console.error("creating ps5-sales fiile");
                    jsonfile.writeFileSync(this.ps_file, "");
                    return;
                }
            }
        });
    }
}
