
import { test, APIRequestContext, Page } from '@playwright/test'
import { LoginPage } from '../../../pages/login/login.page'
import { Helper } from '../../../utility/helper'
import { CommonPage } from '../../../pages/common/common.page'
import { logoutData } from '../../../testdata/ui/logout.data'
import { commonData } from '../../../testdata/ui/common'
import { LogoutPage } from '../../../pages/logout/logout.page'

let request: APIRequestContext
let page: Page
let loginPage: LoginPage
let commonPage: CommonPage
let logoutPage: LogoutPage

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    request = (await browser.newContext()).request
    loginPage = new LoginPage(page)
    commonPage = new CommonPage(page)
    logoutPage = new LogoutPage(page)
    await page.goto('/demo')
    await commonPage.pageLoadCheck()
    await loginPage.userLoggedIn();
})
logoutData.forEach(data => {
    test.describe.parallel(`Verify the working of Register Account functionality`, async () => {
        test('TC_LG_001 >> Verify Logging out by selecting Logout option from My Account dropmenu', async () => {
            await logoutPage.userLogout()
            await logoutPage.validateUserLogOut()
        })
        test.afterAll(async () => {
            await page.close()
        })
    })
})
