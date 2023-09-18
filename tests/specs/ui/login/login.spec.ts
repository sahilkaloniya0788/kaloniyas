
import { account } from '../../../testdata/api/account';
import { test,  APIRequestContext, Page } from '@playwright/test';
import { Helper } from '../../../utility/helper';
import { LoginPage } from '../../../pages/login/login.page';
import { CommonPage } from '../../../pages/common.page.ts/common.page';
let request: APIRequestContext;
let page : Page;
let loginPage: LoginPage;
let commonPage: CommonPage;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    request = (await browser.newContext()).request;
    loginPage = new LoginPage(page);
    commonPage = new CommonPage(page);
    await page.goto('/demo');
    await commonPage.pageLoadCheck();
    await commonPage.clickOnMyAccount();
    await commonPage.clickOnLoginButton();


    //await loginPage.login(process.env.user == undefined ? "":process.env.user, process.env.uiPassword == undefined ? "" : process.env.uiPassword);
});
account.forEach(data => {
    test.describe.serial('Automate the login functionality', () => {
        test('TC_LF_001 >> Verify logging into the Application using valid credentials', async () => {
            await loginPage.inputLoginUsername(process.env.user == undefined ? "" : process.env.user);
            await loginPage.inputLoginPassword(process.env.uipassword == undefined ? "" : process.env.uipassword);
            await loginPage.clickOnLoginButton();
        });
        test('TC_LF_002 >> Verify logging into the Application using invalid credentials (i.e. Invalid email address and Invalid Password)', async () => {
            await loginPage.inputLoginUsername(Helper.uniqueNumbers());
            await loginPage.inputLoginPassword(Helper.uniqueNumbers());
            await loginPage.clickOnLoginButton();
        });
        test('TC_LF_003 >> Verify logging into the Application using invalid email address and valid Password)', async () => {
            await loginPage.inputLoginUsername(Helper.uniqueNumbers());
            await loginPage.inputLoginPassword(process.env.uipassword == undefined ? "" : process.env.uipassword);
            await loginPage.clickOnLoginButton();
        });
        test('TC_LF_004 >> Verify logging into the Application using valid email address and invalid Password)', async () => {
            await loginPage.inputLoginUsername(process.env.user == undefined ? "" : process.env.user);
            await loginPage.inputLoginPassword(Helper.uniqueNumbers());
            await loginPage.clickOnLoginButton();
        });
        test('TC_LF_005 >>Verify logging into the Application without providing any credentials', async () => {
            await loginPage.inputLoginUsername('');
            await loginPage.inputLoginPassword('');
            await loginPage.clickOnLoginButton();
        });
        test('TC_LF_006 >>Verify Forgotten Password link is available in the Login page and is working', async () => {
            await loginPage.clickOnForgottenPassword();
        });
        test('TC_LF_008 >>Verify E-Mail Address and Password text fields in the Login page have the place holder text ', async () => {
            await loginPage.verifyPlaceholder();
        });
        test('TC_LF_013 >>Verify the text into the Password field is toggled to hide its visibility', async () => {
            await loginPage.verifyPasswordHideVisibility();
        });
        test('TC_LF_014 >>Verify the copying of the text entered into the Password field', async () => {
            await loginPage.verifyCanCopyPassword();
        });
        test('TC_LF_015 >>Verify the Password is not visible in the Page Source', async () => {
            await loginPage.verifyPasswordVisibilityInPageSource();
        });
        test('TC_LF_023 >> Verify the Login page functionality in all the supported environments', async () => {
            await loginPage.inputLoginUsername(process.env.user == undefined ? "" : process.env.user);
            await loginPage.inputLoginPassword(process.env.uipassword == undefined ? "" : process.env.uipassword);
            await loginPage.clickOnLoginButton();
        });
        test('TC_LF_009 >>Verify Logging into the Application and browsing back using Browser back button', async () => {
           // await loginPage.verifyBackButtonAndUserLogin();
           await loginPage.inputLoginUsername(process.env.user == undefined ? "" : process.env.user);
           await loginPage.inputLoginPassword(process.env.uipassword == undefined ? "" : process.env.uipassword);
           await loginPage.clickOnLoginButton();
           await loginPage.page.goBack();
           await loginPage.logout.waitFor({state:'visible'});  //if its not visible page not refreshed
        });
        // test('TC_LF_010 >>Verify Loggingout from the Application and browsing back using Browser back button', async () => {
        //     // await loginPage.verifyBackButtonAndUserLogin();
        //     await loginPage.inputLoginUsername(process.env.user == undefined ? "" : process.env.user);
        //     await loginPage.inputLoginPassword(process.env.uipassword == undefined ? "" : process.env.uipassword);
        //     await loginPage.clickOnLoginButton();
        //     await loginPage.logout.waitFor({state:'visible'});
        //     await loginPage.page.goBack();

        //  });
    });    
});
