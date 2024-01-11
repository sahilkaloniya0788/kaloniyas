
import { test, APIRequestContext, Page } from '@playwright/test'
import { LoginPage } from '../../../pages/ui/login/login.page'
import { CommonPage } from '../../../pages/ui/Common/common.page'
import { add_to_cart_data } from '../../../testdata/ui/add_to_cart.data'
import { Add_To_Cart_Page } from '../../../pages/ui/add_to_cart/add_to_cart.page'
import { SearchPage } from '../../../pages/ui/search/search.page';
import { addAbortSignal } from 'stream'
import { Helper } from '../../../utility/helper'



let request: APIRequestContext
let page: Page
let commonPage: CommonPage
let add_to_cart: Add_To_Cart_Page;
let loginPage: LoginPage
let searchPage: SearchPage;


test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    request = (await browser.newContext()).request;
    loginPage = new LoginPage(page);
    commonPage = new CommonPage(page);
    searchPage = new SearchPage(page);
    add_to_cart = new Add_To_Cart_Page(page)
    await page.goto('/demo');
    await commonPage.pageLoadCheck();

})
add_to_cart_data.forEach(data =>{ 
    test.describe.parallel(`Verify the working of Add TO Cart functionality`, () => {
        test("TC_ATC_001 >> Verify adding the product to Cart from 'Product Display' Page", async () => {
            await add_to_cart.verifyingAddingToCartFromProductDisplayPage()
            await Helper.delay(7000)

        })

        test("TC_ATC_002 >>> Verify adding the product to Cart from 'Wish List' Page", async () => {
            await loginPage.userLoggedIn()
            await searchPage.searchingExistingProduct()
            await add_to_cart.addingProductToWishlist()
            await add_to_cart.navigatingToWishlistPage()
            await add_to_cart.addingProductToCartFromWishlistPage()
            await add_to_cart.verifyAddToCartProductSuccessMsgIsVisible()
            // await Helper.delay(7000)

        })

        test("TC_ATC_003 >>> Verify adding the product to Cart from Search Results Page", async () => {
            await searchPage.searchingExistingProduct()
            await add_to_cart.clickOnAddToCartButton()
            await add_to_cart.verifyAddToCartProductSuccessMsgIsVisible()

        })

        test("TC_ATC_004 >>> Verify adding the product to Cart from the Related Products section of the Product Display Page", async () => {
            await searchPage.searchingExistingProduct()
            await add_to_cart.clickOnAddToCartButton()
        })

        test("TC_ATC_006 >>> Verify adding the product to Cart from the Products displayed in the 'Featured' section of Home page", async () => {
            await add_to_cart.verifyingAddingToCartFromProductFeaturedPage()

        })

        test("TC_ATC_007 >>> Verify adding the product to Cart from 'Product Comparison' Page", async () => {
            await add_to_cart.AddingProductFromComparisonPage()
        })

        test.afterAll(async () => {
            await page.close()
        })

        


    })
})
