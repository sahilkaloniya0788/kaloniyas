import { Locator, Page } from "@playwright/test"

export class Currencies {
    readonly page: Page
    readonly currencyBtn: Locator
    readonly euroBtn: Locator
    readonly poundSterlingBtn: Locator
    readonly usdollarBtn: Locator





    constructor(page: Page){
        this.page = page;
        this.currencyBtn = page.locator(`//span[text()='Currency']`)
        this.euroBtn = page.locator(`//button[text()='€Euro']`)
        this.poundSterlingBtn = page.locator(`//button[text()='£Pound Sterling']`)
        this.usdollarBtn  = page.locator(`//button[text()='$US Dollar']`)



    }

    async VerifyingFunctionalityOfEuroCurrency(){
        await this.currencyBtn.waitFor({state:'visible'})
        await this.currencyBtn.click()
        await this.euroBtn.waitFor({state:'visible'})
        await this.euroBtn.click()
    }
    async VerifyingFunctionalityOfPoundSterlingCurrency(){
        await this.currencyBtn.waitFor({state:'visible'})
        await this.currencyBtn.click()
        await this.poundSterlingBtn.waitFor({state:'visible'})
        await this.poundSterlingBtn.click()
    }
    async VerifyingFunctionalityOfusDollarCurrency(){
        await this.currencyBtn.waitFor({state:'visible'})
        await this.currencyBtn.click()
        await this.usdollarBtn.waitFor({state:'visible'})
        await this.usdollarBtn.click()

    }




}