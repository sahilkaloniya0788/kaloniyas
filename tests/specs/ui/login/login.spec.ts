import { test, APIRequestContext, Page } from '@playwright/test'
import { Helper } from '../../../utility/helper'
import { loginData } from '../../../testdata/ui/login.data'
import { LoginPage } from '../../../pages/ui/login/login.page'
import { CommonPage } from '../../../pages/ui/Common/common.page'
import { log } from 'console'

let request: APIRequestContext
let page: Page
let loginPage: LoginPage
let commonPage: CommonPage

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    request = (await browser.newContext()).request
    loginPage = new LoginPage(page)
    commonPage = new CommonPage(page)
    await page.goto('/demo')
    await commonPage.pageLoadCheck()
    await commonPage.clickOnMyAccount()
    await commonPage.selectAccountOption('Login')
})
loginData.forEach(data => {
    test.describe.parallel(`Verify the working of Register Account functionality`, async () => {
        test('TC_LF_001 >> Verify logging into the Application using valid credentials', async () => {
            await loginPage.inputLoginUsername(process.env.user == undefined ? "" : process.env.user)
            await loginPage.inputLoginPassword(process.env.uiPassword == undefined ? "" : process.env.uiPassword)
            await loginPage.clickOnLoginBtn()
            await loginPage.validateUserLoginSuccessfully()
        });
        test('TC_LF_002 >> Verify logging into the Application using invalid credentials', async () => {
            await loginPage.inputLoginUsername(Helper.uniqueNumbers())
            await loginPage.inputLoginPassword(Helper.uniqueNumbers())
            await loginPage.clickOnLoginBtn()
            await loginPage.verifyLoginWarningMsgIsVisible()
        })
        test('TC_LF_003 >> Verify logging into the Application using invalid email address and valid Password', async () => {
            await loginPage.inputLoginUsername(Helper.uniqueNumbers())
            await loginPage.inputLoginPassword(process.env.uiPassword == undefined ? "" : process.env.uiPassword)
            await loginPage.clickOnLoginBtn()
            await loginPage.verifyLoginWarningMsgIsVisible()
        })
        test('TC_LF_004 >> Verify logging into the Application using valid email address and invalid Password', async () => {
            await loginPage.inputLoginUsername(process.env.user == undefined ? "" : process.env.user)
            await loginPage.inputLoginPassword(Helper.uniqueNumbers())
            await loginPage.clickOnLoginBtn()
            await loginPage.verifyLoginWarningMsgIsVisible()
        })
        test('TC_LF_005 >> Verify logging into the Application without providing any credentials', async () => {
            await loginPage.inputLoginUsername('')
            await loginPage.inputLoginPassword('')
            await loginPage.clickOnLoginBtn()
            await loginPage.verifyLoginWarningMsgIsVisible()
        })
        test('TC_LF_006 >> Verify Forgotten Password link is available in the Login page and is working', async () => {
            await loginPage.ValidateForgotPasswordLinkIsVisible()
            await loginPage.clickOnForgotPassword()
        })
        test('TC_LF_007 >> Verify Forgotten Password link is available in the Login page and is working', async () => {
            await loginPage.ValidateForgotPasswordLinkIsVisible()
            await loginPage.clickOnForgotPassword()
        })
        test('TC_LF_008 >> Verify E-Mail Address and Password text fields in the Login page have the place holder text ', async () => {
            await loginPage.ValidateEmailPlaceholderText(data.emailPlaceholder)
        })

        test("TC_LF_009 >>> Verify Logging into the Application and browsing back using Browser back button ", async() => {
            await loginPage.inputLoginUsername(process.env.user == undefined ? "" : process.env.user)
            await loginPage.inputLoginPassword(process.env.uiPassword == undefined ? "" : process.env.uiPassword)
            await loginPage.clickOnLoginBtn()
            await page.goBack()
            await loginPage.validatingUserIsLoggedout()
        })

        test("TC_LF_0010 >>> Verify Loggingout from the Application and browsing back using Browser back button", async() => {
            await loginPage.inputLoginUsername(process.env.user == undefined ? "" : process.env.user)
            await loginPage.inputLoginPassword(process.env.uiPassword == undefined ? "" : process.env.uiPassword)
            await loginPage.clickOnLoginBtn()
            await loginPage.LoggingOut()
            await page.goBack()
            await loginPage.validatingUserIsLoggedIn()
        })


        test("TC_LF_0011 >>> Verify logging into the Application using inactive credentials", async() => {

        })

        test("TC_LF_0012 >>> Verify the number of unsucessful login attemps ",async () => {
            await loginPage.inputLoginUsername(Helper.uniqueNumbers())
            await loginPage.inputLoginPassword(Helper.uniqueNumbers())
            await loginPage.clickOnLoginBtn()
            await loginPage.inputLoginUsername(Helper.uniqueNumbers())
            await loginPage.inputLoginPassword(Helper.uniqueNumbers())
            await loginPage.clickOnLoginBtn()
            await loginPage.inputLoginUsername(Helper.uniqueNumbers())
            await loginPage.inputLoginPassword(Helper.uniqueNumbers())
            await loginPage.clickOnLoginBtn()
            await loginPage.inputLoginUsername(Helper.uniqueNumbers())
            await loginPage.inputLoginPassword(Helper.uniqueNumbers())
            await loginPage.clickOnLoginBtn()
            await loginPage.inputLoginUsername(Helper.uniqueNumbers())
            await loginPage.inputLoginPassword(Helper.uniqueNumbers())
            await loginPage.clickOnLoginBtn()
            await loginPage.verifyingUnsuccessfulLoggingAttemps()
            
        })

        test("TC_LF_0013 >>> Verify the text into the Password field is toggled to hide its visibility", async() => {
            await loginPage.verifyingPasswordIsHidden()
           
        })

        test('TC_LF_0014 >>> Verify the copying of the text entered into the Password field', async() => {
            await loginPage.copyingTheHiddenPassword()

        })

        test('TC_LF_0015 >>> Verify the copying of the text entered into the Password field', async() => {
            await loginPage.InspectingPassworField()
        
        })

        test('TC_LF_0016 >>> Verify Logging into the Application after changing the password', async() => {
            await loginPage.inputLoginUsername(process.env.user == undefined ? "" : process.env.user)
            await loginPage.inputLoginPassword(process.env.uiPassword == undefined ? "" : process.env.uiPassword)
            await loginPage.clickOnLoginBtn()
            await loginPage.changingNewPassword()
            await loginPage.LoggingOut()
            await loginPage.loggingWithNewCredentials()
            
        })

        test('TC_LF_0017 >>> Verify Logging into the Application, closing the Browser without loggingout and opening the application in the Browser again',async() => {
            await loginPage.inputLoginUsername(process.env.user == undefined ? "" : process.env.user)
            await loginPage.inputLoginPassword(process.env.uiPassword == undefined ? "" : process.env.uiPassword)
            await loginPage.clickOnLoginBtn() 
            await page.close();
            // await commonPage.openingTheBrowserAgain(chromium)
        })

        test('TC_LF_0019 >>> Verify user is able to navigate to different pages from Login page ', async() => {
            await loginPage.navigatingDifferentPagesFromLoginPages()


        })

        test('TC_LF_0020 >>> Verify the different ways of navigating to the Login page', async() => {
            await loginPage.navigatingToLoginPageFromDifferentWays()
        })

        test('TC_LF_0021 >>> Verify the Page Heading and Page URL of Login page', async() => {
            await loginPage.verifyingPageHeading()
        })










    })
    test.afterAll(async ({ browser }) => {
        // page = await browser.newPage()
        // request = (await browser.newContext()).request
        await page.close()
        // await page.goto('/demp')
    })
})
function When(arg0: string, arg1: () => Promise<void>) {
    throw new Error('Function not implemented.')
}













