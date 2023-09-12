import { test, Page, APIRequestContext } from "@playwright/test";
import { RegisterPage } from "../../../pages/register/register.page";
import { registerPage } from "../../../testdata/ui/register.data";

let page: Page;
let register: RegisterPage;
let request: APIRequestContext;
// let navigation: Navigation;


registerPage.forEach(data => {
    test.describe.serial(`This one is related to testing of ${data.tc}`, async () => {
        test.beforeAll(async ({ browser }) => {
            page = await browser.newPage();
            // request = (await browser.newContext)).request;
        // navigation = new navigation(Page);
       
    });



    test.afterAll(async () => {
        await page.close();
    })
})
    
});