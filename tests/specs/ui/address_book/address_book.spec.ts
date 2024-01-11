import { test, APIRequestContext, Page } from '@playwright/test';
import { Helper } from '../../../utility/helper';
import { LoginPage } from '../../../pages/ui/login/login.page'
import { CommonPage } from '../../../pages/ui/Common/common.page'
import { Address_Book_Page } from '../../../pages/ui/address_book/address_book.page';
import { SearchPage } from '../../../pages/ui/search/search.page';

let request: APIRequestContext;
let page: Page;
let loginPage: LoginPage;
let commonPage: CommonPage;
let address_Book_Page: Address_Book_Page
let searchPage: SearchPage

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    request = (await browser.newContext()).request;
    loginPage = new LoginPage(page);
    commonPage = new CommonPage(page);
    address_Book_Page = new Address_Book_Page(page)
    searchPage = new SearchPage(page)
    await page.goto('/demo');
    await commonPage.pageLoadCheck();
});
test.describe.parallel('Automate the address book functionality', async () => {
    test(`TC_AB_001 >>> Verify navigating to 'Address Book Entries' page from 'My Account' dropmenu`, async () => {
        await loginPage.userLoggedIn()
        await address_Book_Page.clickOnModdifyYourAddressBookEntries()
    })
    test(`TC_AB_002 >>> Verify navigating to 'Address Book Entries' page from Right Column options`, async () => {
        await loginPage.userLoggedIn()
        await address_Book_Page.clickOnAddressBookBtn()
    })
    test(`TC_AB_003 >>> Verify navigating to 'Address Book Entries' page from 'Site Map' page`, async () => {
        await loginPage.userLoggedIn()
        await address_Book_Page.clickOnSiteBtn()
        await address_Book_Page.clickOnAddressBookBtn()
    })
    test(`TC_AB_004 >>> Verify navigating to 'Address Book Entries' page from Right Column options before logging into the Application`, async () => {
        await loginPage.userLoggedIn()
        await address_Book_Page.clickOnAddressBookBtn()
    })
    test(`TC_AB_005 >>> Verify default address displayed in the 'Address Book Entries' page`, async () => {
        await loginPage.userLoggedIn()
        await address_Book_Page.clickOnAddressBookBtn()
        await address_Book_Page.verifyingAddressBookDetails()
    })
    test(`TC_AB_006 >>> Verify deleting the default address in the 'Address Book Entries' page`, async () => {
        await loginPage.userLoggedIn()
        await address_Book_Page.clickOnAddressBookBtn()
        // await address_Book_Page.addingNewAddressDetails()
        await address_Book_Page.deletingAddressDetails()
        // await Helper.delay(10000)
    })
    test(`TC_AB_007 >>> Verify updating the Address in the 'Address Book Entries' page`, async () => {
        await loginPage.userLoggedIn()
        await address_Book_Page.clickOnAddressBookBtn()
        await address_Book_Page.updatingAddressDetails()
    })
    test(`TC_AB_008 >>> Verify changing the Default Address when there is only one address in the 'Address Book Entries' page`, async () => {
        await loginPage.userLoggedIn()
        await address_Book_Page.clickOnAddressBookBtn()
        await address_Book_Page.clickingOnEditBtn()
        await address_Book_Page.changingDefaultAddressToNO()
    })
    test(`TC_AB_009 >>> Verify updating the Address  by clearing all the non-mandatory fields`, async () => {
        await loginPage.userLoggedIn()
        await address_Book_Page.clickOnAddressBookBtn()
        await address_Book_Page.clickingOnEditBtn()
        await address_Book_Page.updatingByClearingAllManatoryField()
    })
    test(`TC_AB_0010 >>> Verify clearing all the fields in the 'Edit Address' page and updating the Address`, async () => {
        await loginPage.userLoggedIn()
        await address_Book_Page.clickOnAddressBookBtn()
        await address_Book_Page.clickingOnEditBtn()
        await address_Book_Page.clearingAllAddressBookFields()
        await address_Book_Page.warningMsgForEmptyField()
    })
    test(`TC_AB_0011 >>> Verify Back button in the 'Edit Address' page`, async () => {
        await loginPage.userLoggedIn()
        await address_Book_Page.clickOnAddressBookBtn()
        await address_Book_Page.clickingOnEditBtn()
        await address_Book_Page.verifyingBackBtbOnAddressEditPageAfterUpdating()
    })
    test(`TC_AB_0012 >>> Verify Back button in the 'Address Book Entries' page`, async () => {
        await loginPage.userLoggedIn()
        await address_Book_Page.clickOnAddressBookBtn()
        await address_Book_Page.VerifyingAddressBookEntriesBackBtn()
        await address_Book_Page.verifyingHomePageHeading()
        await Helper.delay(3000)
    })
    test(`TC_AB_0013 >>> Verify adding new Address by providing only the mandatory fields`, async () => {
        await loginPage.userLoggedIn()
        await address_Book_Page.clickOnAddressBookBtn()
        await address_Book_Page.addingNewAddressDetails()
        await address_Book_Page.verifyingSuccessMsgAfterNewAddressAdded()
        await Helper.delay(3000)
    })
    test(`TC_AB_0014 >>> Verify selecting the newly added Address as default address`, async () => {
        await loginPage.userLoggedIn()
        await address_Book_Page.clickOnAddressBookBtn()
        await address_Book_Page.clickingOnEditBtn()
        await address_Book_Page.changingDefaultAddressToYES()
    })
    test(`TC_AB_0015 >>> Verify new address given for Billing Details while placing the order should get added in 'Address Book Entries' page`, async () => {
        await loginPage.userLoggedIn()
        await searchPage.addingMacBOOKToShoppingCart()
        await address_Book_Page.addingAllFieldsOnNewAddressDetailsPage()
    })
    test("TC_AB_0016 >>> Verify new address given for Billing Details while placing the order should get added in 'Address Book Entries' page", async () => {
        await loginPage.userLoggedIn()
        await searchPage.addingMacBOOKToShoppingCart()
        await address_Book_Page.addingAllFieldsOnNewAddressDetailsPage()
        await address_Book_Page.GotoHomePage()
        await loginPage.GoToMyAccount()
        await loginPage.clickonMyAccountLink()
        await address_Book_Page.clickOnAddressBookBtn()
        await address_Book_Page.verifyingAddressBookDetails()
    })
    test("TC_AB_0017 >>> Verify the Breadcrumb, Page URL, Page Heading and Page Title of 'Address Book Entries' page", async () => {
        await loginPage.userLoggedIn()
        await address_Book_Page.clickOnAddressBookBtn()
        await address_Book_Page.verifyingAddressBookHeading()
        await address_Book_Page.verifyingaddressbookBreadcrumb()
        const currentUrl = await page.url()
        if (currentUrl === 'https://tutorialsninja.com/demo/index.php?route=account/address') {
            console.log('URL is correct!');
        } else {
            console.error('URL is incorrect!');
        }
    })
})
