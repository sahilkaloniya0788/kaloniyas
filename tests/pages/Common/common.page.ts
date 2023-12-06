import { Page, Locator } from "@playwright/test"


export class CommonPage {
    readonly page: Page
    readonly pageLoadElement: Locator
    readonly myAccountBtn: Locator
    readonly AnyBtn: Locator
    readonly AnyText: Locator
    readonly continueButton: Locator

    constructor(page: Page) {
        this.page = page
        this.pageLoadElement = page.locator("//a[@title='My Account']")
        this.myAccountBtn = page.locator("//span[contains(text(),'My Account')]")
        this.AnyBtn = page.getByRole('button', { name: 'Continue' })
        this.AnyText = page.getByText('I am a returning customer')

    }
    async pageLoadCheck() {
        await this.pageLoadElement.waitFor({ state: "visible" })
        return true;
    }
    async clickOnMyAccount() {
        await this.myAccountBtn.waitFor({ state: "visible", timeout: 2000 })
        await this.myAccountBtn.click()
    }
    async clickOnBtn() {
        await this.AnyBtn.waitFor({ state: "visible" })
        await this.AnyBtn.click()
    }
    async validateTextIsVisible() {
        await this.AnyText.waitFor({ state: "visible" })
        await this.AnyText.isVisible()
        return true
    }
    async selectAccountOption(option: string) {
        const locatorValue = this.page.locator(`//ul[contains(@class,'dropdown-menu')]//li//a[contains(text(),'${option}')]`)
        locatorValue.waitFor({ state: 'visible' })
        locatorValue.click()
    }
    async clickOnContinueButton() {
        await this.continueButton.waitFor({ state: 'visible' })
        await this.continueButton.click()
    }
    async setResolution(width: number, height: number) {
        await this.page.setViewportSize({
            width: width,
            height: height,
        });
    }

}
