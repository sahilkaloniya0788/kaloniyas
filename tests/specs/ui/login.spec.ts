
import { account } from '../../testdata/api/account';
import { test,  APIRequestContext, Page } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { Helper } from '../../utility/helper';
let request: APIRequestContext;
let page : Page;
let loginPage: LoginPage;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    request = (await browser.newContext()).request;
    loginPage = new LoginPage(page);
    await page.goto('/demo');
    await loginPage.pageLoadCheck();
    await loginPage.login(process.env.user == undefined ? "":process.env.user, process.env.uiPassword == undefined ? "" : process.env.uiPassword);
});
account.forEach(data => {
    test.describe.serial('TestData Create Registration Case', () => {
        test('I create a account', async () => {
            // accountID = await apiActions.accountCreation(token);
            // expect(accountID).not.toBeUndefined();
            console.log('Hi');
            await Helper.delay(10000);
    });
    });
});
