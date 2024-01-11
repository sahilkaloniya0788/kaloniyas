import { Page, Locator, expect } from "@playwright/test";
import { Helper } from "../../../utility/helper";

export class Youtube{
    readonly page: Page
    readonly youtubeLogo: Locator






    constructor(page: Page){
        this.page = page
        this.youtubeLogo = page.locator(`(//div[contains(@style,"width: 100%; height: 100%; fill: currentcolor;")])[5]`)
        
    }

    async verifyingtheLogoOfYoutube(){
       await this.youtubeLogo.waitFor({state:'visible'})
       await this.youtubeLogo.isVisible()
    }




}