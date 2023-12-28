import { test,  APIRequestContext, Page } from '@playwright/test';
import { ForgotPage } from '../../../pages/forgot_password/forgot_password.page';
import { CommonPage } from '../../../pages/Common/common.page';
import { forgot_passwordData } from '../../../testdata/ui/forgot_password.data';

let request: APIRequestContext;
let page : Page;
let commonPage: CommonPage;
let forgotPage: ForgotPage;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    request = (await browser.newContext()).request;
    forgotPage = new ForgotPage(page);
    commonPage = new CommonPage(page);
    await page.goto('/demo');
    await commonPage.pageLoadCheck();
    await commonPage.clickOnMyAccount();
    await commonPage.selectAccountOption('Login');
});

forgot_passwordData.forEach(data => {
    test.describe.parallel('Automate the login functionality', async() => {
       
        test('TC_FP_005 >>Verify resetting the password for a non-registered account', async () => {
            await forgotPage.resetPasswordNonRegisteredAccount(data.nonRegisteredUser);
        });
        test('TC_FP_015 >>Verify reseting the Password without providing the registered email address', async () => {
            await forgotPage.resetPasswordWithoutEmail();
        });
        test('TC_FP_016 >>Verify Placeholder text is displayed in the "E-Mail Address" field of "Forgotten Password" page', async () => {
            await forgotPage.verifyEmailPlaceholder();
        });
        //May be we need to use Selectors over here 017
        test('TC_FP_017 >>Verify "E-Mail Address" fied on the "Forgotten Password" page is marked as mandatory "page"', async () => {
            await forgotPage.verifyEmailMandatory();
        });
        //Showing warning message but not the invalid format
        test('TC_FP_018 >>Verify entering invalid format email address into the "E-Mail Address" field of "Forgotten Password" page', async () => {
            await forgotPage.invalidFormatOfMail();
        });
        test('TC_FP_019 >>Verify Back button on the "Forgotten Password" page', async () => {
            await forgotPage.verifyBackButton();
        });
        test("TC_FP_020 >>Verify navigating to 'Forgotten Password' page from 'Right Column' options", async () => {
            await forgotPage.clickOnForgottenPasswordColumn();
        });
         test("TC_FP_021 >>Verify Breadcrumb of the 'Forgotten Password' page", async () => {
            await forgotPage.verifyBreadcrumb();
        });
        test("TC_FP_022 >>Verify the email address provided in the 'E-Mail Address' field of 'Login' page, need to be carry forwarded to the 'Forgotten Password' page", async () => {
            await forgotPage.verifyEmailCarryForward();
        });
        test("TC_FP_023 >>Verify the UI of the 'Forgotten Password' page", async () => {
            await forgotPage.verifyUILoginOnColumn();
        });
    });    
});
