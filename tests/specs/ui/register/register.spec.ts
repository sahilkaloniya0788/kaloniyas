import { test, APIRequestContext, Page } from '@playwright/test';
import { Helper } from '../../../utility/helper';
import { registerPage } from '../../../testdata/ui/register.data';
import { Navigation } from '../../../pages/navigation.page';
import { RegisterPage } from '../../../pages/register/resgister.page';
let request: APIRequestContext;

let page: Page;
let navigation: Navigation;
let register: RegisterPage;

registerPage.forEach(data => {
    test.describe.serial(`Verify the working of Register Account functionality ${data.tc}`, async () => {
        test.beforeAll(async ({ browser }) => {
            page = await browser.newPage();
            request = (await browser.newContext()).request;
            navigation = new Navigation(page);
            await page.goto('/demo');
            register = new RegisterPage(page);
        });
        test('TC_RF_001 - Verify Registering an Account by providing only the Mandatory fields', async () => {
            await navigation.gotoRegisterPage();
            await register.inputFirstName(data.firstName + Helper.uniqueNumbers());
            await register.inputiLastName(data.lastName + Helper.uniqueNumbers());
            await register.inputEmail(data.email + Helper.uniqueNumbers() + '@gmail.com');
            await register.inputTelephone(data.telephone);
            await register.inputPassword(data.password);
            await register.inputConfirmPassword(data.confirmPassword);
            await register.selectYesCheckbox();
            await register.selectPrivacyPolicy();
            await register.clickOnContinueBtn();
            await register.clickOnContinueBtnAfterSuccess();
            await navigation.Logout();
        });
        test('TC_RF_005 -Verify Registering an Account when Yes option is selected for Newsletter field', async () => {
            await navigation.gotoRegisterPage();
            await register.inputFirstName(data.firstName + Helper.uniqueNumbers());
            await register.inputiLastName(data.lastName + Helper.uniqueNumbers());
            await register.inputEmail(data.email + Helper.uniqueNumbers() + '@gmail.com');
            await register.inputTelephone(data.telephone);
            await register.inputPassword(data.password);
            await register.inputConfirmPassword(data.confirmPassword);
            await register.selectYesCheckbox();
            await register.selectPrivacyPolicy();
            await register.clickOnContinueBtn();
            await register.clickOnContinueBtnAfterSuccess();
            await register.clickOnSubscribeUnsubscribeToNewsLetterLink();
            await register.verifyNewsLetterSubscribeCheckedOrNot('Yes');
            // await Helper.delay(30000);
            await navigation.Logout();

        });

        test('TC_RF_003 - Verify proper notification messages are displayed for the mandatory fields, when you dont provide any fields in the Register Account page and submit', async () => {
            await navigation.gotoRegisterPage();
            await register.inputPassword(data.password);
            await register.inputConfirmPassword(Helper.uniqueNumbers());
            await register.clickOnContinueBtn();
            await register.verifyFirstNameErrorMsg();
            await register.verifyLastNameErrorMsg();
            await register.verifyEmailErrorMsg();
            await register.verifyTelephoneErrorMsg();
            await register.verifyPrivacyPolicyErrorMsg();
            await register.verifyConfirmPasswordErrorMsg();
        });
        
        test.afterAll(async () => {
            await page.keyboard.press('Shift+w')
        });
    });
});
