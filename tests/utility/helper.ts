import { Page, expect } from "@playwright/test";
import moment from "moment"
let page: Page
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

    static convertToStarPattern(inputString: string): string {
        return '*'.repeat(inputString.length);
    }


    static async retry<T>(
        action: () => Promise<T>,
        maxAttempts: number = 5,
        delayBetweenAttempts: number = 2000
    ): Promise<T> {
        let attempts = 0;

        while (attempts < maxAttempts) {
            try {
                const result = await action();
                return result; // Return the result if the action is successful
            } catch (error) {
                console.error(`Attempt ${attempts + 1} failed with error: ${error.message}`);

                attempts++;

                if (attempts < maxAttempts) {
                    console.log(`Retrying in ${delayBetweenAttempts / 1000} seconds...`);
                    await new Promise(resolve => setTimeout(resolve, delayBetweenAttempts));
                }
            }
        }

        // If all attempts fail, throw the last encountered error
        throw new Error(`All ${maxAttempts} attempts failed.`);
    }


}


