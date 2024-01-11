import { Page, Locator, expect } from "@playwright/test";
import { CommonPage } from "../Common/common.page";
import { Helper } from "../../../utility/helper";
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
    readonly myAccountLink: Locator
    readonly loginlinkbtn : Locator
    readonly logoutlinkbtn : Locator
    readonly logoutContinuebtn: Locator
    readonly loginAttempWarningMsg: Locator
    readonly hiddenpassword: Locator
    readonly passwordChangebtn: Locator
    readonly changePasswordField: Locator
    readonly changeConfirmPasswordField: Locator
    readonly continueBtnToChangePassword: Locator
    readonly continueBtnUnderNewCostomer: Locator
    readonly backToAccountBtn: Locator
    readonly rightSideLoginBtn: Locator
    readonly pageHeading: Locator
    
    


    constructor(page: Page) {
        this.page = page;
        this.emailfield = page.getByPlaceholder('E-Mail Address');
        this.passwordfield = page.getByPlaceholder('Password');
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.EditYourAccountInfo = page.getByRole('link', { name: 'Edit your account information' });
        this.loginWarningMsg = page.getByText('Warning: No match for E-Mail Address and/or Password.');
        this.forgotPassword = page.locator('#content').getByRole('link', { name: 'Forgotten Password' });
        this.forgotPasswordWarning = page.getByText('An email with a confirmation link has been sent your email address.');
        this.myAccountBtn = page.locator(`//span[contains(text(),'My Account')]`)
        this.myAccountLink = page.locator(`(//a[text()='My Account'])[1]`)
        this.loginlinkbtn = page.getByRole('link', { name: 'Login' })
        this.logoutlinkbtn = page.locator('#top-links').getByRole('link', { name: 'Logout' })
        this.logoutContinuebtn = page.locator(`//a[contains(@class,"btn btn-primary")]`)
        this.loginAttempWarningMsg = page.locator(`//div[contains(@class,"alert alert-danger alert-dismissible")]`)
        this.hiddenpassword = page.locator(`//input[contains(@id,"input-password")]`)
        this.passwordChangebtn = page.locator(`//a[contains(text(),'Change your password')]`)
        this.changePasswordField = page.getByPlaceholder('Password', { exact: true })
        this.changeConfirmPasswordField = page.getByPlaceholder('Password Confirm')
        this.continueBtnToChangePassword = page.locator(`//input[contains(@value,"Continue")]`)
        this.continueBtnUnderNewCostomer =  page.getByRole('link', { name: 'Continue' })
        this.backToAccountBtn = page.locator(`//ul[contains(@class,"breadcrumb")]//li//a[contains(text(),'Account')]`)
        this.rightSideLoginBtn = page.locator(`//div[contains(@class,"list-group")]//a[contains(@href,"https://tutorialsninja.com/demo/index.php?route=account/login")]`)
        this.pageHeading = page.locator(`//a[contains(text(),'Qafox.com')]`)
    }

    async GoToMyAccount(){
        await this.myAccountBtn.waitFor({ state: "visible" , timeout : 2000})
        await this.myAccountBtn.click()
    }
    async clickonMyAccountLink(){
        await this.myAccountLink.waitFor({ state: "visible" , timeout : 2000})
        await this.myAccountLink.click()
        
    }

    async fillingloggingDetailsAndLoggdIn(){
        await this.inputLoginUsername(process.env.user == undefined ? "":process.env.user);
        await this.inputLoginPassword(process.env.uiPassword == undefined ? "" : process.env.uiPassword);
        await this.clickOnLoginBtn();
    }
    async userLoggedIn() {
        await this.myAccountBtn.waitFor({ state: "visible" , timeout : 2000})
        await this.myAccountBtn.click()
        await this.loginlinkbtn.click()
        await this.inputLoginUsername(process.env.user == undefined ? "":process.env.user);
        await this.inputLoginPassword(process.env.uiPassword == undefined ? "" : process.env.uiPassword);
        await this.clickOnLoginBtn();
        await this.validateUserLoginSuccessfully();
    }
    
    async inputLoginUsername(username: string) {
        await this.emailfield.waitFor({ state: "visible" });
        await this.emailfield.clear();
        await this.emailfield.fill(username);
    }
    async inputLoginPassword(password: string) {
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

    async validatingUserIsLoggedout(){
        await this.myAccountBtn.click()
        await this.loginlinkbtn.isVisible()
    }

    async LoggingOut(){
        await this.myAccountBtn.click()
        await this.logoutlinkbtn.waitFor({state: 'visible'})
        await this.logoutlinkbtn.click()
        await this.logoutContinuebtn.waitFor({state: 'visible'})
        await this.logoutContinuebtn.click()
    }

    async validatingUserIsLoggedIn(){
        await this.myAccountBtn.click()
        await this.logoutlinkbtn.isVisible()
    }

    async verifyingUnsuccessfulLoggingAttemps(){
        await this.loginAttempWarningMsg.isVisible()
    }

    async verifyingPasswordIsHidden(){
        
        
        let convertPass = Helper.convertToStarPattern('123123')
        console.log(convertPass)
        await this.hiddenpassword.fill(convertPass)
        expect(await this.hiddenpassword.inputValue()).toBe('******'); // Password is mask    
       
    }

    async copyingTheHiddenPassword(){
        await this.hiddenpassword.fill('Mohit')
        await this.page.locator(`//h2[text()='Returning Customer']`).click()
        await this.page.locator(`//h2[text()='Returning Customer']`).press('Control+A')
        await this.page.locator(`//h2[text()='Returning Customer']`).press('Control+C')
        await Helper.delay(2000)
        await this.hiddenpassword.click();
        await this.hiddenpassword.press('Control+A');
        await this.hiddenpassword.press('Control+C');
        await this.emailfield.press('Control+V');
        const pastedText = await this.emailfield.inputValue();
        expect(pastedText).not.toBe('Mohit');
        console.log("copied text is", pastedText);
// open search bar in terminal and search your hiddenpassword and expect it should not be there.
    }

    async InspectingPassworField(){
        await this.hiddenpassword.fill('Mohit')
        await this.loginBtn.click()
        const fieldValue = await this.hiddenpassword.inputValue()
        expect(fieldValue).toBe('Mohit')

    }

    async changingNewPassword(){
        await this.passwordChangebtn.click()
        await this.changePasswordField.click()
        await this.changePasswordField.fill("12341234")
        await this.changeConfirmPasswordField.click()
        await this.changeConfirmPasswordField.fill("12341234")
        await this.continueBtnToChangePassword.click()
    
    }

    async loggingWithNewCredentials(){
        await this.myAccountBtn.click()
        await this.loginlinkbtn.isVisible()
        await this.loginlinkbtn.click()
        await this.emailfield.waitFor({ state: "visible" });
        await this.emailfield.clear();
        await this.emailfield.fill("sahilkaloniya2002@gmail.com")
        await this.passwordfield.waitFor({ state: "visible" });
        await this.passwordfield.clear();
        await this.passwordfield.fill("12341234")
        await this.loginBtn.click()
    }

    async navigatingDifferentPagesFromLoginPages(){
        await this.myAccountBtn.waitFor({state: 'visible'})
        await this.myAccountBtn.click()
        await this.loginlinkbtn.isVisible()
        await this.loginlinkbtn.click()
        await this.continueBtnUnderNewCostomer.waitFor({state: 'visible'})
        await this.continueBtnUnderNewCostomer.click()
        await this.backToAccountBtn.click()
        await this.rightSideLoginBtn.click()

    }

    async verifyingPageHeading(){
        await this.pageHeading.isVisible()
        await Helper.delay(2000)
    }

        

    async navigatingToLoginPageFromDifferentWays(){
        await this.myAccountBtn.waitFor({state: 'visible'})
        await this.myAccountBtn.click()
        await Helper.delay(2000)

        await this.loginlinkbtn.click()
        await this.pageHeading.click()
        await this.myAccountBtn.click()
        await this.loginlinkbtn.waitFor({state: 'visible'})
        await this.loginlinkbtn.click()
        await this.rightSideLoginBtn.waitFor({state: 'visible'})
        await this.rightSideLoginBtn.click()

    }

    async GotoLoginPage(){
        await this.myAccountBtn.click()
        await this.loginlinkbtn.isVisible()
        await this.loginlinkbtn.click()
    }



    }

    
       





    

