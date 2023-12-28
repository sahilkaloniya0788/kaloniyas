import { test, APIRequestContext, Page } from '@playwright/test'
import { LoginPage } from '../../../pages/login/login.page'
import { Helper } from '../../../utility/helper'
import { CommonPage } from '../../../pages/common/common.page'
import { loginData } from '../../../testdata/ui/login.data'

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
    test.describe.serial(`Verify the working of Register Account functionality`, async () => {
        When('Test', async function () {
            await loginPage.inputLoginUsername(process.env.user == undefined ? "" : process.env.user)
            await loginPage.inputLoginPassword(process.env.uiPassword == undefined ? "" : process.env.uiPassword)
            await loginPage.clickOnLoginBtn()
            await loginPage.validateUserLoginSuccessfully()
        })
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


    })
    test.afterAll(async () => {
        await page.close()
    })
})
function When(arg0: string, arg1: () => Promise<void>) {
    throw new Error('Function not implemented.')
}

