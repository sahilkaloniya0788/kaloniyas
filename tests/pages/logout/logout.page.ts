import { Page, Locator, expect } from "@playwright/test";

export class LogoutPage {
    readonly page: Page;
    
    

    constructor(page: Page) {
        this.page = page;
        
    }
}