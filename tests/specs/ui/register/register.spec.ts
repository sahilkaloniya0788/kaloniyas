import { test, APIRequestContext, Page } from '@playwright/test'
import { Helper } from '../../../utility/helper'
import { registerData } from '../../../testdata/ui/register.data'
import { RegisterPage } from '../../../pages/ui/register/resgister.page'
import { CommonPage } from '../../../pages/ui/Common/common.page'

let request: APIRequestContext
let page: Page
let register: RegisterPage
let commonPage: CommonPage

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    request = (await browser.newContext()).request
    commonPage = new CommonPage(page)
    register = new RegisterPage(page)
    await page.goto('/demo')
    await commonPage.pageLoadCheck()
    await commonPage.clickOnMyAccount()
    await commonPage.selectAccountOption('Register')
    
    
})
registerData.forEach(data => {
    test.describe.parallel(`Verify the working of Register Account functionality ${data.tc}`, async () => {
        test('TC_RF_001 - Verify Registering an Account by providing only the Mandatory fields', async () => {
            await commonPage.selectAccountOption('Register')
            await register.inputFirstName(data.firstName + Helper.uniqueNumbers())
            await register.inputiLastName(data.lastName + Helper.uniqueNumbers())
            await register.inputEmail(data.email + Helper.uniqueNumbers() + '@gmail.com')
            await register.inputTelephone(data.telephone)
            await register.inputPassword(data.password)
            await register.inputConfirmPassword(data.confirmPassword)
            await register.selectYesCheckbox()
            await register.selectPrivacyPolicy()
            await register.clickOnContinueBtn()
            await register.clickOnContinueBtnAfterSuccess()
            await navigation.Logout()
        })
        test('TC_RF_005 -Verify Registering an Account when Yes option is selected for Newsletter field', async () => {
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
            await register.clickOnSubscribeUnsubscribeToNewsLetterLink()
            await register.verifyNewsLetterSubscribeCheckedOrNot('Yes')
            await navigation.Logout()

        })

        test('TC_RF_003 - Verify proper notification messages are displayed for the mandatory fields, when you dont provide any fields in the Register Account page and submit', async () => {
            await register.inputPassword(data.password)
            await register.inputConfirmPassword(Helper.uniqueNumbers())
            await register.clickOnContinueBtn()
            await register.verifyFirstNameErrorMsg()
            await register.verifyLastNameErrorMsg()
            await register.verifyEmailErrorMsg()
            await register.verifyTelephoneErrorMsg()
            await register.verifyPrivacyPolicyErrorMsg()
            await register.verifyConfirmPasswordErrorMsg()
        })
        
        test.afterAll(async () => {
            await page.close()
        })
    })
})
