import { Page, Locator, expect } from "@playwright/test";
import { Helper } from "../../../utility/helper";

let page: Page;


export class SFlogin {
    readonly page: Page;
    readonly user: Locator
    readonly password: Locator
    readonly loginBtn: Locator
    readonly objectManagerBtn: Locator
    readonly quicksearchforobjectmanager: Locator
    readonly quicksearchpage: Locator

    constructor(page: Page) {
        this.user = page.locator(`//input[@id="username"]`)
        this.password = page.locator(`//input[@id="password"]`)
        this.loginBtn = page.locator(`//input[@id="Login"]`)
        this.objectManagerBtn = page.locator(`(//span[text()='Object Manager'])[1]`)
        this.quicksearchforobjectmanager = page.locator(`//input[@id="globalQuickfind"]`)
        this.quicksearchpage = page.locator(`//table[contains(@class,"slds-table slds-table--bordered uiVirtualDataGrid--default uiVirtualDataGrid")]`)

    }
    async inputLoginUsername(user: string) {
        await this.user.waitFor({ state: "visible" });
        await this.user.clear();
        await this.user.fill(user);
    }
    async inputLoginPassword(password: string) {
        await this.password.waitFor({ state: "visible" });
        await this.password.clear();
        await this.password.fill(password);
    }
    async clickOnLoginBtn() {
        await this.loginBtn.waitFor({ state: "visible" });
        await this.loginBtn.click();
    }
    async clickOnObjectManager() {
        await this.objectManagerBtn.waitFor({ state: "visible" });
        await this.objectManagerBtn.click()
        await Helper.delay(2000)
    }
    async searchingAnyObjectFromObjectManager() {
        await this.quicksearchforobjectmanager.waitFor({ state: "visible" });
        await this.quicksearchforobjectmanager.click()
        await this.quicksearchforobjectmanager.fill("case")
        await Helper.delay(2000)
        // const searchedElement = await  expect(this.quicksearchpage).toContainText("case")
        // if (this.quicksearchpage) {
        //     await this.quicksearchpage.click();
        // } else {
        //     console.log("Element 'case' is not visible.");
        // }i8
    }

}

