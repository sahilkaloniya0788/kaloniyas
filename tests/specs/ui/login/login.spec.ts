
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
    await commonPage.selectMyAccountOptions('Login');


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
        
    });    
});
