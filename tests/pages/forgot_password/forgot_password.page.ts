import { Page, Locator, expect } from "@playwright/test";

export class ForgotPage {
    readonly page: Page;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly forgotpassword: Locator;
    readonly forgotEmailInputField:Locator;
    readonly forgotEmailContinueButton:Locator;
    readonly warningMessage:Locator;
    readonly mandatoryEmail:Locator;
    readonly forgotPasswordColumn:Locator;
    readonly breadcrumbHome : Locator;
    readonly breadcrumbHomeFeatured : Locator;
    readonly breadcrumbAccount : Locator;
    readonly breadcrumbForgottenPassword : Locator;
    readonly breadcrumbForgottenPasswordHeading : Locator;
    readonly backButton : Locator;
    readonly loginColumn : Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailField = page.getByPlaceholder("E-Mail Address");
        this.passwordField = page.getByPlaceholder("Password");
        this.forgotpassword = page.locator("//body/div[@id='account-login']/div[1]/div[1]/div[1]/div[2]/div[1]/form[1]/div[2]/a[1]");
        this.forgotEmailInputField = page.locator("//input[@id='input-email']");
        this.forgotEmailContinueButton = page.locator("//input[@type='submit']");
        this.warningMessage = page.locator("//div[contains(@class,'alert')]");
        this.mandatoryEmail = page.locator("//div[contains(@class,'req')]");
        this.forgotPasswordColumn = page.locator("//body/div[@id='account-login']/div[1]/aside[1]/div[1]/a[3]");
       // this.breadcrumbHome = page.locator("//body/div[@id='account-forgotten']/ul[1]/li[1]/a[1]/i[1]");
      //  this.breadcrumbHome = page.locator("//i[@class='fa fa-home']");
        //this.breadcrumbHome = page.locator("//li/a[contains(@href,'?route=common/home')]");
        this.breadcrumbHome = page.locator(`//ul[@class="breadcrumb"]/li[1]/a`);
        this.breadcrumbHomeFeatured = page.locator("//h3[contains(text(),'Featured')]");
        this.breadcrumbAccount = page.locator("//body/div[@id='account-forgotten']/ul[1]/li[2]/a[1]");
        this.breadcrumbForgottenPassword = page.locator("//body/div[@id='account-forgotten']/ul[1]/li[3]/a[1]");
        this.backButton = page.locator("//a[contains(text(),'Back')]");
        this.loginColumn = page.locator("//div/a[contains(text(),'Login')]");
        this.breadcrumbForgottenPasswordHeading = page.locator("//legend[contains(text(),'Your E-Mail Address')]");
    }
    async inputLoginUsername(username : string) {
        await this.emailField.waitFor({ state: 'visible' });
        await this.emailField.clear();
        await this.emailField.fill(username);
    }

    async clickOnForgottenPassword() {
        await this.forgotpassword.waitFor({ state: 'visible' });
        await this.forgotpassword.click();
     }
    async resetPasswordNonRegisteredAccount(username : string) {
        await this.forgotpassword.waitFor({ state: 'visible' });
        await this.forgotpassword.click();
        await this.forgotEmailInputField.waitFor({state:'visible'})
        await this.forgotEmailInputField.clear();
        await this.forgotEmailInputField.fill(username);
        await this.forgotEmailContinueButton.waitFor({state: 'visible'});
        await this.forgotEmailContinueButton.click();
        await this.warningMessage.waitFor({state: 'visible'});
     }
     async resetPasswordWithoutEmail() {
        await this.forgotpassword.waitFor({ state: 'visible' });
        await this.forgotpassword.click();
        await this.forgotEmailContinueButton.waitFor({state: 'visible'});
        await this.forgotEmailContinueButton.click();
        await this.warningMessage.waitFor({state: 'visible'});
     }
     async verifyEmailPlaceholder() {
        await this.forgotpassword.waitFor({ state: 'visible' });
        await this.forgotpassword.click();
        await this.forgotEmailInputField.waitFor({state:'visible'})
        expect(await this.forgotEmailInputField.getAttribute('placeholder')).toBe('E-Mail Address');
     }
     async verifyEmailMandatory() {
        await this.forgotpassword.waitFor({ state: 'visible' });
        await this.forgotpassword.click();
        await this.mandatoryEmail.waitFor({state:'visible'});
     }
     async invalidFormatOfMail() {
        await this.forgotpassword.waitFor({ state: 'visible' });
        await this.forgotpassword.click();
        await this.forgotEmailInputField.waitFor({state:'visible'})
        await this.forgotEmailInputField.clear();
        await this.forgotEmailInputField.fill('amotoori');
        await this.forgotEmailContinueButton.waitFor({state: 'visible'});
        await this.forgotEmailContinueButton.click();
        await this.warningMessage.waitFor({state: 'visible'});
     }
     async verifyBackButton() {
        await this.forgotpassword.waitFor({ state: 'visible' });
        await this.forgotpassword.click();
        await this.backButton.waitFor({state:'visible'});
        await this.backButton.click();
        await this.passwordField.waitFor({ state: 'visible' });
     }
     async clickOnForgottenPasswordColumn() {
        await this.forgotPasswordColumn.waitFor({ state: 'visible' });
        await this.forgotPasswordColumn.click();
     }
     async verifyBreadcrumb() {
      await this.forgotpassword.waitFor({ state: 'visible' });
      await this.forgotpassword.click();
      await this.breadcrumbHome.waitFor({state : 'visible'});
      await this.breadcrumbHome.click({force:true});
      await this.breadcrumbHomeFeatured.waitFor({state:'visible'});
      await this.page.goBack();
      await this.breadcrumbAccount.waitFor({state : 'visible'});
      await this.breadcrumbAccount.click();
      await this.passwordField.waitFor({ state: 'visible' });
      await this.page.goBack();
      await this.breadcrumbForgottenPassword.waitFor({state : 'visible'});
      await this.breadcrumbForgottenPassword.click();
      await this.breadcrumbForgottenPasswordHeading.waitFor({state:'visible'});
   }
   async verifyEmailCarryForward() {
      await this.inputLoginUsername('abc@gmail.com');
      await this.forgotpassword.waitFor({ state: 'visible' });
      await this.forgotpassword.click();
      await this.forgotEmailInputField.waitFor({state:'visible'});
      expect(await this.forgotEmailInputField.getAttribute('value')).toBe('abc@gmail.com');
   }
   async verifyUILoginOnColumn() {
      await this.forgotpassword.waitFor({ state: 'visible' });
      await this.forgotpassword.click();
      await this.loginColumn.waitFor({state:'visible'});
      await this.loginColumn.click();
      await this.passwordField.waitFor({state:'visible'});
   }
}