import {test,  APIRequestContext, Page } from "playwright/test";
import { Currencies } from "../../../pages/ui/currencies/currencies.page";


let page : Page
let request : APIRequestContext
let currencies : Currencies

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    request = (await browser.newContext()).request;
    currencies = new Currencies(page)
    await page.goto('/demo')

})

test.describe.parallel("Automate the 'currencies' functionality", async() => {
    test("TC_C_001 >>> Verify the complete functionality of the Application by selecting 'Euro' currency", async() => {
        await currencies.VerifyingFunctionalityOfEuroCurrency()
    })
    test("TC_C_002 >>> Verify the complete functionality of the Application by selecting 'Pound Sterling' currency", async() => {
        await currencies.VerifyingFunctionalityOfPoundSterlingCurrency()
    })
    test("TC_C_003 >>> Verify the complete functionality of the Application by selecting 'US Dollar' currency", async() => {
        await currencies.VerifyingFunctionalityOfusDollarCurrency()
    })
})


