import { test, Page, BrowserContext, APIRequestContext } from '@playwright/test';
import { Helper } from '../../../utility/helper';
import { SFlogin } from '../../../pages/ui/SFlogin/SFlogin.page';
import { CommonPage } from '../../../pages/ui/Common/common.page'

let page: Page;
let request: APIRequestContext
let browserContext: BrowserContext;
let sflogin: SFlogin
let commonPage: CommonPage

test.beforeAll(async ({ browser }) => {
    browserContext = await browser.newContext();
    page = await browserContext.newPage();
    sflogin = new SFlogin(page)
    commonPage = new CommonPage(page)

    await page.goto("/")
});

test.describe.parallel("Automate the salesforce functionality", async () => {

    test("TC_SF_001 >>> verifying logging into the application using credentials", async () => {
        await sflogin.inputLoginUsername(process.env.user == undefined ? "" : process.env.user)
        await sflogin.inputLoginPassword(process.env.uiPassword == undefined ? "" : process.env.uiPassword)
        await sflogin.clickOnLoginBtn()
        await Helper.delay(10000)
    })
    test("TC_SF_002 >>> Navigating to any object from object manager", async () => {
        await sflogin.inputLoginUsername(process.env.user == undefined ? "" : process.env.user)
        await sflogin.inputLoginPassword(process.env.uiPassword == undefined ? "" : process.env.uiPassword)
        await sflogin.clickOnLoginBtn()
        await sflogin.clickOnObjectManager()
        await Helper.delay(2000)
        await sflogin.searchingAnyObjectFromObjectManager
        await Helper.delay(10000)
    })

    test.afterAll(async () => {
        await browserContext.close();
    });

})