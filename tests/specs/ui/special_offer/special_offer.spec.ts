import { Page, APIRequestContext, test } from "playwright/test"
import { Helper } from "../../../utility/helper"
import { LoginPage } from "../../../pages/ui/login/login.page"
import { Special_Offer } from "../../../pages/ui/special_offer/special_offer.page"

let page: Page
let request: APIRequestContext
let loginPage: LoginPage
let special_offer: Special_Offer

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    request = (await browser.newContext()).request
    loginPage = new LoginPage(page)
    special_offer = new Special_Offer(page)

    await page.goto('/demo')
})

test.describe.parallel("Automate the 'special offer' functionality", async () => {
    test("TC_SO_001 >>> Verify navigating to 'Special Offers' page using 'Specials' footer link", async () => {
        await special_offer.verifyingSpecialOfferFooterLinkBtn()
    })
    test("TC_SO_002 >>> Verify navigating to 'Special Offers' page from 'Site Map' page", async () => {
        await special_offer.navigatingToSpecialOfferThroughSiteMap()
    })
    test("TC_SO_003 >>> Verify the Products which are sold at offer price are displayed in the 'Special Offers' page", async () => {
        await special_offer.verifyingProductsOnSpecialOfferPag()
    })
    test("TC_SO_004 >>> Verify viewing the Products in Speical Offers' page in List view", async () => {
        await special_offer.verifyingSpecialOfferProductsInListVeiw()
    })
    test("TC_SO_005 >>> Verify viewing the Products in Speical Offers' page in Grid view", async () => {
        await special_offer.verifyingSpecialOfferProductsInGridVeiw()
    })
    test("TC_SO_006 >>> Verify 'Product Compare' link in the 'Special Offers' page", async () => {
        await special_offer.navigatingToProductComparisonPageFromSpecialPage()
    })
    test("TC_SO_007 >>> Verify Sorting the Products in the 'Special Offers' page using 'Sort By' field", async () => {
        await special_offer.sortingOutTheProductInSpecialPage()
    })
    test("TC_SO_008 >>> Verify the number of Products displayed in the 'Special Offers' page using the 'Show' field", async () => {
        await special_offer.verifyingNumberOfProductUsingShowField()
    })
    test("TC_SO_009 >>> Verify adding the Product to Cart from the 'Special Offers' page", async () => {
        await special_offer.verifyingAddingToCartFromSpecialOfferPage()
    })
    test("TC_SO_0010 >>> Verify adding the Product to Wish List from the 'Special Offers' page", async () => {
        await loginPage.userLoggedIn()
        await special_offer.verifyingAddingToWishlistFromSpecialPage()
    })
    test("TC_SO_0011 >>> Verify adding the Product for Comparison from the 'Special Offers' page", async () => {
        await special_offer.verifyAddingTheProductForComparison()
    })
    test("TC_SO_0012 >>> Verify User is navigating to Product Display Page from 'Special Offers' page", async () => {
        await special_offer.navigatingToProductDisplayPageFromSpecialPage()
    })
    test("TC_SO_0013 >>> Verify the Breadcrumb of 'Special Offers' page", async () => {
        await special_offer.verifyingBreadCrumbOfSpecialOffer()
    })
    test("TC_SO_0014 >>> Verify the Page URL, Page Heading and Page Title of 'Special Offers' page", async () => {
        await special_offer.verifyingPageHeading()
        const currentUrl = await page.url()
        if (currentUrl === "https://tutorialsninja.com/demo/index.php?route=product/special") {
            console.log("url is correct")
        } else {
            console.log("url is incorrect")
        }
    })
    
})

