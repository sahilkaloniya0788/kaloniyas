import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly forgotpassword: Locator;
    readonly logout:Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.emailField = page.getByPlaceholder("E-Mail Address");
        this.passwordField = page.getByPlaceholder("Password");
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.forgotpassword = page.locator("//body/div[@id='account-login']/div[1]/div[1]/div[1]/div[2]/div[1]/form[1]/div[2]/a[1]");
        this.logout = page.locator("//a[text()='Logout']"); 
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
        await this.loginButton.click();
     }
    async clickOnForgottenPassword() {
        await this.forgotpassword.waitFor({ state: 'visible' });
        await this.forgotpassword.click();
     }
    async verifyPlaceholder() {
        await this.emailField.waitFor({ state: 'visible' });
        expect(await this.emailField.getAttribute('placeholder')).toBe('E-Mail Address')
        await this.passwordField.waitFor({ state: 'visible' });
        expect(await this.passwordField.getAttribute('placeholder')).toBe('Password')
     }
    async verifyPasswordHideVisibility() {
        await this.passwordField.waitFor({ state: 'visible' });
        expect(await this.passwordField.getAttribute("type")).toBe("password")
     }
    async verifyCanCopyPassword() {
        await this.passwordField.waitFor({ state: 'visible' });
        await this.passwordField.type("serg")
        await this.page.keyboard.press("Control+A")
        await this.page.keyboard.press("Control+C")
        await this.page.keyboard.press("ContextMenu")
        await this.page.click("text=copy")
    }
    async verifyPasswordVisibilityInPageSource(){
        await this.passwordField.waitFor({ state: 'visible' });
        const pass = "rhcj"
        const rt = await this.passwordField.type(pass)
        await this.loginButton.click()
        const val = await this.passwordField.getAttribute("value")
       expect(val).not.toBe(pass)      
    }
    async verifyBackButtonAndUserLogin(){
        await this.inputLoginUsername(process.env.user == undefined ? "" : process.env.user);
        await this.inputLoginPassword(process.env.uipassword == undefined ? "" : process.env.uipassword);
        await this.clickOnLoginButton();
        await this.page.goBack();
        await this.logout.waitFor({state:'visible'});
    }
}