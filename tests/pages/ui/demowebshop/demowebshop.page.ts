import { Page, Locator, expect } from "@playwright/test";
import { Helper } from "../../../utility/helper";

export class Demowebshop{
    readonly page: Page        
    readonly homePageHeading: Locator



    constructor(page: Page) {
        this.page = page 
        this.homePageHeading = page.locator(`//img[contains(@alt,"Tricentis Demo Web Shop")]`)




    }

    async verifyinghomepageheading(){
        await this.homePageHeading.waitFor({state: 'visible'})
        await this.homePageHeading.click()
        await Helper.delay(1000)
    }








}