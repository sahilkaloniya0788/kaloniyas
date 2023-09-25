import { Locator, Page, test } from "@playwright/test";

export class Add_To_Cart_Page{
    readonly page: Page;
    readonly add_to_Cart_btn : Locator
    
    constructor(page: Page) { 
        this.add_to_Cart_btn = page.locator(`//button[@id='button-cart']`)

    }

    async clickOnAddToCartButton() {
        await this.add_to_Cart_btn.waitFor({ state: 'visible' })
        await this.add_to_Cart_btn.click()
        
    }
    async verifyAddToCartProductSuccessMsgIsVisible() {
        
    }
    async clickOnShppingCartLinkUnderMsg() {
        
    }

    
}