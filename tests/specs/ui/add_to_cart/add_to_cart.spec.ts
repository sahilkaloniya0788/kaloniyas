
import { test, APIRequestContext, Page } from '@playwright/test'
import { LoginPage } from '../../../pages/login/login.page'
import { CommonPage } from '../../../pages/common/common.page'
import { add_to_cart_data } from '../../../testdata/ui/add_to_cart.data'
import { Add_To_Cart_Page } from '../../../pages/add_to_cart/add_to_cart.page'

let request: APIRequestContext
let page: Page
let commonPage: CommonPage
let add_to_cart: Add_To_Cart_Page;
let loginPage: LoginPage

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    request = (await browser.newContext()).request
    commonPage = new CommonPage(page)
    add_to_cart = new Add_To_Cart_Page(page)
    loginPage = new LoginPage(page)
    await page.goto('/demo')
    await commonPage.pageLoadCheck()
    await loginPage.userLoggedIn();
    
})
add_to_cart_data.forEach(data => {
    test.describe.parallel(`Verify the working of Register Account functionality`, async () => {
        test('TC_LG_001 >> Verify Logging out by selecting Logout option from My Account dropmenu', async () => {
            await comparePage.searchProductByText(data.product)
            await comparePage.clickOnProductByTitle(data.product)
            await add_to_cart.clickOnAddToCartButton()
            await add_to_cart.verifyAddToCartProductSuccessMsgIsVisible()
            await add_to_cart.clickOnShppingCartLinkUnderMsg()
        })
        test.afterAll(async () => {
            await page.close()
        })
    })
})
