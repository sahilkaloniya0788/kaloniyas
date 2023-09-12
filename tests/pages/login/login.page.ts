import { Page, Locator } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.emailField = page.getByPlaceholder("E-Mail Address");
        this.passwordField = page.getByPlaceholder("Password");
        this.loginButton = page.getByRole('button', { name: 'Login' });
        
    }
    async inputLoginUsername(username : string) {
        await this.emailField.waitFor({ state: 'visible' });
        await this.emailField.clear();
        await this.emailField.fill(username);
    }
    
    async inputLoginPassword(password : string) {
        await this.passwordField.waitFor({ state: 'visible' });
        await this.passwordField.clear();
        await this.passwordField.fill(password);
    }
    async clickOnLoginButton() {
        await this.loginButton.waitFor({ state: 'visible' });
        await this.passwordField.click();
     }

}