import { Page, test, Locator } from "@playwright/test";

export class CommonPage{
    readonly page: Page;
    readonly myAccount: Locator;
    readonly loginButton: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.myAccount = page.locator("//span[contains(text(),'My Account')]");
        this.loginButton = page.getByRole('link', { name: "Login" });
        
    }

    async clickOnMyAccount() {
        await this.myAccount.waitFor({ state: 'visible' });
        await this.myAccount.click();
    }

    async clickOnLoginButton() {
        await this.loginButton.waitFor({ state: 'visible' });
        await this.loginButton.click();
    }

    async pageLoadCheck() {
        await this.myAccount.waitFor({ state: 'visible' });
        return true;

    }
}
