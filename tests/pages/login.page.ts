import { Page, Locator } from "@playwright/test";
import { Navigation } from "./navigation.page";

export class LoginPage {
    readonly page: Page;
    readonly navigation: Navigation;
    readonly pageLoadElement: Locator;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly myAccount: Locator;
    readonly selectLogin: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageLoadElement = page.locator("//a[@title='My Account']");
        this.myAccount = page.locator("//a[@title='My Account']");
        this.selectLogin = page.getByRole('link', { name: 'Login' });
        this.usernameField = page.getByPlaceholder('E-Mail Address');
        this.passwordField = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.navigation = new Navigation(page);
    }
    async pageLoadCheck() {
        await this.pageLoadElement.waitFor({ state: "visible" });
        return true;
    }
    async login(email: string, password: string) {
        await this.myAccount.click();
        await this.selectLogin.click();
        await this.usernameField.fill(email);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

}