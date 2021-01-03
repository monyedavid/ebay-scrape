import { unlink } from "fs";
import jsonfile from "jsonfile";
import { url, ps5, series_x } from "../../Utils/constants";
import cron_scheduler from "../cron";
import { ebay } from "../ebay.scrapper";

export default class EbayBot {
    private xbox_file = "./xbox_sales.json";
    private ps_file = "./ps_sales.json";
    public apply() {
        cron_scheduler(() => this.autoScrape().then());
    }

    /**
     * @description      Scrape ebay & generate local data collection
     */
    private async autoScrape() {
        this.xbox();
        this.ps();
    }

    private async xbox() {
        const _ipg = 200; // Highest item per_page

        // remove previous sale_record
        unlink(this.xbox_file, () => {});

        // const tc = parseInt(total_count, 10); // tc / _ipg;
        const number_of_available_pages = 10000 / _ipg; // | 10k is ebay max
        for (
            let page_number = number_of_available_pages;
            page_number > 0;
            page_number--
        ) {
            const { data } = await ebay(url(page_number, series_x, _ipg));
            jsonfile.writeFile(
                this.xbox_file,
                data,
                { flag: "a" },
                function (err) {
                    console.error("[err]", err);
                }
            );
        }
    }

    private async ps() {
        const _ipg = 200; // Highest item per_page

        // remove previous sale_record
        await unlink(this.ps_file, () => {});

        // const tc = parseInt(total_count, 10); // tc / _ipg;
        const number_of_available_pages = 10000 / _ipg; // | 10k is ebay max
        for (
            let page_number = number_of_available_pages;
            page_number > 0;
            page_number--
        ) {
            const { data } = await ebay(url(page_number, ps5, _ipg));
            jsonfile.writeFile(
                this.ps_file,
                data,
                { flag: "a" },
                function (err) {
                    console.error("[err]", err);
                }
            );
        }
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
