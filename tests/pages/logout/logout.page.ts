import { Page, Locator, expect } from "@playwright/test"
import { CommonPage } from "../common/common.page";
let commonPage: CommonPage;



export class LogoutPage {
    readonly page: Page
    readonly logout: Locator
    readonly myAccountBtn: Locator
    readonly continueButton : Locator



    constructor(page: Page) {
        this.page = page
        this.logout = page.locator(`//ul[contains(@class,'dropdown-menu')]//li//a[contains(text(),'Logout')]`)
        this.myAccountBtn = page.locator("//span[contains(text(),'My Account')]")
        this.continueButton = page.locator(`//a[contains(text(),'Continue')]`)
    }
    async userLogout() {
        await this.myAccountBtn.waitFor({ state: "visible" , timeout : 2000})
        await this.myAccountBtn.click()
        await this.logout.click()
        await this.continueButton.click()
    }
    async validateUserLogOut() {
        await this.logout.waitFor({ state: 'hidden' })
        await this.logout.isVisible()
        return false
    }



}

