import { Page, Locator } from "@playwright/test";
import { registerPage } from "../../testdata/ui/register.data";
import { Helper } from "../../utility/helper";
type registerData = typeof registerPage[0];

export class RegisterPage {
    readonly page: Page;
    readonly firstName : Locator;
    readonly firstNameErrorMsg : Locator;
    readonly lastName : Locator;
    readonly email : Locator;
    readonly telephone : Locator;
    readonly password : Locator;
    readonly confirmPassword : Locator;
    readonly subscribeYesRadioBtn : Locator;
    readonly subscribeNoRadioBtn : Locator;
    readonly privacyPolicyCheckboxBtn : Locator;
    readonly continueButton : Locator;
    readonly continueBtnAfterSuccess : Locator;
    readonly passwordErrorMsg : Locator;
    readonly emailErrorMsg : Locator;
    readonly lastNameErrorMsg: Locator;
    readonly telephoneErrorMsg:Locator;
    readonly confirmPasswordErrorMsg: Locator;
    readonly privacyPolicyErrorMsg: Locator;
    readonly subscribeUnsubscribeToNewsLetter: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.getByPlaceholder('First Name');
        this.lastName = page.getByPlaceholder('Last Name');
        this.email = page.getByPlaceholder('E-Mail');
        this.telephone = page.getByPlaceholder('Telephone');
        this.password = page.getByPlaceholder('Password', { exact: true });
        this.confirmPassword = page.getByPlaceholder('Password Confirm');
        this.subscribeYesRadioBtn = page.getByLabel('Yes');
        this.subscribeNoRadioBtn = page.getByLabel('No');
        this.privacyPolicyCheckboxBtn = page.getByRole('checkbox');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.continueBtnAfterSuccess = page.getByRole('link', { name: 'Continue' });
        this.firstNameErrorMsg = page.getByText('First Name must be between 1 and 32 characters!');
        this.lastNameErrorMsg = page.getByText('Last Name must be between 1 and 32 characters!');
        this.emailErrorMsg = page.getByText('E-Mail Address does not appear to be valid!');
        this.telephoneErrorMsg = page.getByText('Telephone must be between 3 and 32 characters!');
        this.passwordErrorMsg = page.getByText('Password must be between 4 and 20 characters!');
        this.confirmPasswordErrorMsg = page.getByText('Password confirmation does not match password!');
        this.privacyPolicyErrorMsg = page.getByText('Warning: You must agree to the Privacy Policy!');
        this.subscribeUnsubscribeToNewsLetter = page.getByRole('link', { name: 'Subscribe / unsubscribe to newsletter' });
       
        
    }
    async inputFirstName(firstName : string) {
        await this.firstName.waitFor({ state: "visible" });
        await this.firstName.fill(firstName);
    }
    async verifyFirstNameErrorMsg() {
        await this.firstNameErrorMsg.waitFor({ state: "visible" });
        await this.firstNameErrorMsg.isVisible();
        return true;
    }
    async inputiLastName(lastName : string) {
        await this.lastName.waitFor({ state: "visible" });
        await this.lastName.fill(lastName);
    }
    async verifyLastNameErrorMsg() {
        await this.lastNameErrorMsg.waitFor({ state: "visible" });
        await this.lastNameErrorMsg.isVisible();
        return true;
    }
    async inputEmail(email : string) {
        await this.email.waitFor({ state: "visible" });
        await this.email.fill(email);
    }
    async verifyEmailErrorMsg(){
        await this.emailErrorMsg.waitFor({state :"visible"});
        await this.emailErrorMsg.isVisible();
        return true;
    }
    async inputTelephone(telephone : string) {
        await this.telephone.waitFor({ state: "visible" });
        await this.telephone.fill(telephone);
    }
    async verifyTelephoneErrorMsg() {
        await this.telephoneErrorMsg.waitFor({ state: "visible" });
        await this.telephoneErrorMsg.isVisible();
        return true;
    }
    async inputPassword(password: string) {
        await this.password.waitFor({ state: "visible" });
        await this.password.fill(password);
    }
    async verifyPasswordErrorMsg() {
        await this.passwordErrorMsg.waitFor({ state: "visible" });
        await this.passwordErrorMsg.isVisible();
        return true;
    }
    async inputConfirmPassword(confirmPassword: string) {
        await this.confirmPassword.waitFor({ state: "visible" });
        await this.confirmPassword.fill(confirmPassword);
    }
    async verifyConfirmPasswordErrorMsg() {
        await this.confirmPasswordErrorMsg.waitFor({ state: "visible" });
        await this.confirmPasswordErrorMsg.isVisible();
        return true;
    }
    async selectYesCheckbox() {
        await this.subscribeYesRadioBtn.waitFor({ state: "visible" });
        await this.subscribeYesRadioBtn.click();
    }
    async selectNoCheckbox() {
        await this.subscribeNoRadioBtn.waitFor({ state: "visible" });
        await this.subscribeNoRadioBtn.click();
    }
    async selectPrivacyPolicy() {
        await this.privacyPolicyCheckboxBtn.waitFor({ state: "visible" });
        await this.privacyPolicyCheckboxBtn.click();
    }
    async verifyPrivacyPolicyErrorMsg() {
        await this.privacyPolicyErrorMsg.waitFor({ state: "visible" });
        await this.privacyPolicyErrorMsg.click();
    }
    async clickOnContinueBtn() {
        await this.continueButton.waitFor({ state: "visible" });
        await this.continueButton.click();
    }
    async clickOnContinueBtnAfterSuccess() {
        await this.continueBtnAfterSuccess.waitFor({ state: "visible" });
        await this.continueBtnAfterSuccess.click();
    }
    async clickOnSubscribeUnsubscribeToNewsLetterLink(){
        await this.subscribeUnsubscribeToNewsLetter.waitFor({state :'visible'});
        await this.subscribeUnsubscribeToNewsLetter.click();
    }
    async verifyNewsLetterSubscribeCheckedOrNot(chekedValue : string){
        await this.page.getByText(chekedValue, { exact: true }).waitFor({state: 'visible'});
        await this.page.getByText(chekedValue,{ exact: true }).isChecked();
    }
}