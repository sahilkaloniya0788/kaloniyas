import { Page, Locator, expect } from "@playwright/test";
import { CommonPage } from "../common/common.page";
let commonPage: CommonPage;



export class LoginPage {
    readonly page: Page;
    readonly emailfield: Locator;
    readonly passwordfield: Locator;
    readonly loginBtn: Locator;
    readonly EditYourAccountInfo: Locator;
    readonly loginWarningMsg: Locator;
    readonly forgotPassword: Locator;
    readonly forgotPasswordWarning: Locator;
    readonly placeholer: string;
    readonly myAccountBtn: Locator
    
    


    constructor(page: Page) {
        this.page = page;
        this.emailfield = page.getByPlaceholder('E-Mail Address');
        this.passwordfield = page.getByPlaceholder('Password');
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.EditYourAccountInfo = page.getByRole('link', { name: 'Edit your account information' });
        this.loginWarningMsg = page.getByText('Warning: No match for E-Mail Address and/or Password.');
        this.forgotPassword = page.locator('#content').getByRole('link', { name: 'Forgotten Password' });
        this.forgotPasswordWarning = page.getByText('An email with a confirmation link has been sent your email address.');
        this.myAccountBtn = page.locator("//a[@title='My Account']")
    }
    async userLoggedIn() {
        await this.myAccountBtn.waitFor({ state: "visible" , timeout : 2000})
        await this.myAccountBtn.click()
        await this.page.locator(`//ul[contains(@class,'dropdown-menu')]//li//a[contains(text(),'Login')]`).click()
        await this.inputiLoginUsername(process.env.user == undefined ? "":process.env.user);
        await this.inputiLoginPassword(process.env.uiPassword == undefined ? "" : process.env.uiPassword);
        await this.clickOnLoginBtn();
        await this.validateUserLoginSuccessfully();
    }
    
    async inputiLoginUsername(username: string) {
        await this.emailfield.waitFor({ state: "visible" });
        await this.emailfield.clear();
        await this.emailfield.fill(username);
    }
    async inputiLoginPassword(password: string) {
        await this.passwordfield.waitFor({ state: "visible" });
        await this.passwordfield.clear();
        await this.passwordfield.fill(password);
    }

    async clickOnLoginBtn() {
        await this.loginBtn.waitFor({ state: "visible" });
        await this.loginBtn.click();
    }
    async validateUserLoginSuccessfully() {
        await this.EditYourAccountInfo.waitFor({ state: "visible" });
        await this.EditYourAccountInfo.isVisible();
        return true;
    }
    async verifyLoginWarningMsgIsVisible() {
        await this.loginWarningMsg.waitFor({ state: "visible" })
        await this.loginWarningMsg.isVisible();
        return true;
    }
    async ValidateForgotPasswordLinkIsVisible() {
        await this.forgotPassword.waitFor({ state: "visible" })
        await this.forgotPassword.isVisible();
        return true;
    }
    async clickOnForgotPassword() {
        await this.forgotPassword.waitFor({ state: "visible" })
        await this.forgotPassword.click();
    }
    async ValidateForgotPasswordWarning() {
        await this.forgotPasswordWarning.waitFor({ state: "visible" })
        await this.forgotPasswordWarning.isVisible();
        return true;
    }
    async ValidateEmailPlaceholderText(emailPlaceholder : string) {
        await this.emailfield.waitFor({ state: "visible" })
        const data = await this.emailfield.getAttribute('placeholder')
        if (emailPlaceholder == data) {
            console.log("Placeholder is expected")
        } else {
            console.log("Placeholder is not expected")
        }
    }
   
}