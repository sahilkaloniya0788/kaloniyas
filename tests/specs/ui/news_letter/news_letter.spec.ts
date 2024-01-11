import { test, APIRequestContext, Page } from '@playwright/test';
import { Helper } from '../../../utility/helper';
import { LoginPage } from '../../../pages/ui/login/login.page'
import { CommonPage } from '../../../pages/ui/Common/common.page'
import { News_letter } from '../../../pages/ui/news_letter/news_letter.page';
import { RegisterPage } from '../../../pages/ui/register/resgister.page';
import { news_letterData } from '../../../testdata/ui/news_letter.data';

let request: APIRequestContext;
let page: Page;
let loginPage: LoginPage;
let commonPage: CommonPage;
let news_letter: News_letter
let register: RegisterPage

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    request = (await browser.newContext()).request;
    loginPage = new LoginPage(page);
    commonPage = new CommonPage(page);
    news_letter = new News_letter(page)
    register = new RegisterPage(page)

    await page.goto('/demo');
    await commonPage.pageLoadCheck();
});
news_letterData.forEach(data => {
    test.describe.parallel('Automate the NewsLetter functionality', async () => {

        test("TC_NL_001 >>> Verify navigating to 'Newsletter Subscription' page from 'My Account' page", async () => {
            await loginPage.userLoggedIn()
            await news_letter.navigatingToNewsLetterSubscription()
        })
        test("TC_NL_002 >>> Verify navigating to 'Newsletter Subscription' page using Right Column options", async () => {
            await loginPage.userLoggedIn()
            await news_letter.navigatingUsingRightColumnBtn()
        })
        test("TC_NL_003 >>> Verify navigating to 'Newsletter' page by selecting the option from Right Column options before login", async () => {
            await news_letter.navigatingaBeforeLoggingInFromRightColm()
            await loginPage.fillingloggingDetailsAndLoggdIn()
        })
        test("TC_NL_004 >>> Verify navigating to 'Newsletter' page by selecting the option using 'Newsletter' Footer option before login", async () => {
            await news_letter.navigatingaBeforeLoggingInFromfooterColmBeforeLogin()
            await loginPage.fillingloggingDetailsAndLoggdIn()
        })
        test("TC_NL_005 >>> Verify navigating to 'Newsletter' page by selecting the option using 'Newsletter' Footer option after login", async () => {
            await loginPage.userLoggedIn()
            await news_letter.navigatingUsingFooterColmAfterLogin()
        })
        test("TC_NL_006 >>> Verify 'Back' button in the 'Newsletter Subscription' page", async () => {
            await loginPage.userLoggedIn()
            await news_letter.navigatingUsingRightColumnBtn()
            await news_letter.clickOnBackBtn()
        })
        test("TC_NL_007 >>> Verify udpating the 'Subscribe' option in the 'Newsletter Subscription' page", async () => {
            await loginPage.userLoggedIn()
            await news_letter.navigatingUsingRightColumnBtn()
            await news_letter.updatingSubscriptionOption()
            await Helper.delay(5000)
        })
        test("TC_NL_008 >>> Register a new Account by opting for 'Newsletter' and check the 'Newsletter Subscription' page", async () => {
            await news_letter.GoToRegisterPage()
            await register.inputFirstName(data.firstName + Helper.uniqueNumbers())
            await register.inputiLastName(data.lastName + Helper.uniqueNumbers())
            await register.inputEmail(data.email + Helper.uniqueNumbers() + 'mj@gmail.com')
            await register.inputTelephone(data.telephone)
            await register.inputPassword(data.password)
            await register.inputConfirmPassword(data.confirmPassword)
            await register.selectYesCheckbox()
            await register.selectPrivacyPolicy()
            await register.clickOnContinueBtn()
            await register.clickOnContinueBtnAfterSuccess()
            await news_letter.navigatingUsingRightColumnBtn()
            await news_letter.checkingYesSubscriptionbtn()
        })
        test("TC_NL_009 >>> Register a new Account by not opting for 'Newsletter' and check the 'Newsletter Subscription' page", async () => {
            await news_letter.GoToRegisterPage()
            await register.inputFirstName(data.firstName + Helper.uniqueNumbers())
            await register.inputiLastName(data.lastName + Helper.uniqueNumbers())
            await register.inputEmail(data.email + Helper.uniqueNumbers() + 'mj@gmail.com')
            await register.inputTelephone(data.telephone)
            await register.inputPassword(data.password)
            await register.inputConfirmPassword(data.confirmPassword)
            await register.selectNoCheckbox()
            await register.selectPrivacyPolicy()
            await register.clickOnContinueBtn()
            await register.clickOnContinueBtnAfterSuccess()
            await news_letter.navigatingUsingRightColumnBtn()
            await news_letter.checkingNoSubscriptionbtn()
        })
        test("TC_NL_0010 >>> Verify the Breadcrumb of 'Newsletter Subscription' page", async () => {
            await loginPage.userLoggedIn()
            await news_letter.navigatingUsingRightColumnBtn()
            await news_letter.verifyingNewsLetterBreadcrumb()
        })
        test("TC_NL_0011 >>> Verify the Page URL, Page Heading and Page Title of 'Newsletter Subscription' page", async () => {
            await loginPage.userLoggedIn()
            await news_letter.navigatingUsingRightColumnBtn()
            await news_letter.verifyingPageHeading()
            const currentUrl = await page.url()
            if (currentUrl === 'https://tutorialsninja.com/demo/index.php?route=account/newsletter') {
                console.log('URL is correct!');
            } else {
                console.error('URL is incorrect!');
            }

        })





    })

})