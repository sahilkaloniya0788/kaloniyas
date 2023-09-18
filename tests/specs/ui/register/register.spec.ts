import { test, Page, APIRequestContext } from "@playwright/test";
import { RegisterPage } from "../../../pages/register/register.page";
import { registerPage } from "../../../testdata/ui/register.data";
import { LoginPage } from "../../../pages/login/login.page";
import { CommonPage } from "../../../pages/common.page.ts/common.page";

let page: Page;
let register: RegisterPage;
let request: APIRequestContext;
let loginPage: LoginPage;
let commonPage: CommonPage;
// let navigation: Navigation;


test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    request = (await browser.newContext()).request;
    loginPage = new LoginPage(page);
    commonPage = new CommonPage(page);
    await page.goto('/demo');
    await commonPage.pageLoadCheck();
    await commonPage.selectMyAccountOptions('Register');
    


    //await loginPage.login(process.env.user == undefined ? "":process.env.user, process.env.uiPassword == undefined ? "" : process.env.uiPassword);
});

registerPage.forEach(data => {
    test.describe.serial('Automate the login functionality', () => {
        test('TC_LF_001 >> Verify logging into the Application using valid credentials', async () => {
            
            
            
        });

    })
})
