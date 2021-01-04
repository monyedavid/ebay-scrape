import moment from "moment";
import { naze } from "../../Database/entities/naze";

export default class ScrappedData {
    public async get({
        console: console_type,
        options: { date, skip, take },
    }: GQL.IGetOnQueryArguments | GQL.IDailyOnQueryArguments): Promise<{
        total_count: number;
        data: naze[];
        error?: {
            path: string;
            message: string;
        }[];
    }> {
        if (!date) {
            return {
                total_count: await naze.count({
                    where: { console_type },
                }),
                data: await naze.find({
                    where: { console_type },
                    order: { id: "DESC" },
                    skip,
                    take,
                }),
            };
        } else if (date && date === "daily") {
            const today = moment().format("MMM D, YYYY");
            return {
                total_count: await naze.count({
                    where: { console_type, date_sold: today },
                }),
                data: await naze.find({
                    where: { console_type, date_sold: today },
                    order: { id: "DESC" },
                    skip,
                    take,
                }),
            };
        } else {
            if (moment(date, "MMM D, YYYY").isValid()) {
                return {
                    total_count: await naze.count({
                        where: { console_type, date_sold: date },
                    }),
                    data: await naze.find({
                        where: { console_type, date_sold: date },
                        order: { id: "DESC" },
                        skip,
                        take,
                    }),
                };
            } else {
                return {
                    total_count: 0,
                    data: [],
                    error: [
                        {
                            path: "date-format",
                            message: "Invalid date format",
                        },
                    ],
                };
            }
        }
    }
}
