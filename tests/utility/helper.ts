import { expect } from "@playwright/test";
import moment from "moment"

export class Helper {
    static async delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    static async currentDateDDMMYYYY() {
        return moment(new Date()).format("DD/MM/YYYY");
    }
    static async currentDateDHYYYY() {
        return moment(new Date()).format("D/M/YYYY");
    }
    static async currentDateYYYYMMDDHHmmss() {
        return moment(new Date()).format("YYYY-MM-DOTHH:mm:ss");
    }
    static async addDays(days: number) {
        return moment().add(days, 'd').format('D MMM YYYY');
    }
    static async substractDays(days: number) {
        return moment().subtract(days, 'd').format('D/M/YYYY');
    }
    static uniqueNumbers() {
        return moment().format("DDHHmmss");
    }
    static compareResponseValues(jsonObjects: any, jsonObject2: any) {
        for (const [key1, value1] of Object.entries(jsonObjects)) {
            for (const [key2, value2] of Object.entries(jsonObject2)) {
                if (key1 == key2) {
                    expect(value1).toEqual(value2);
                }
            }
        }
    }

}