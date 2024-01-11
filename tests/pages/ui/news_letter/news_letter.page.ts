import { Locator, Page, test } from "@playwright/test"
import { Helper } from "../../../utility/helper"
import { news_letterData } from "../../../testdata/ui/news_letter.data"


export class News_letter {
    readonly page: Page
    readonly myAccountDropdown: Locator
    readonly myAccountLink: Locator
    readonly subscribeANDunsubscribeBtn: Locator
    readonly pageHeading: Locator
    readonly newsletterRightColmBtn: Locator
    readonly newsletterfooterColmBtnBeforeLogin: Locator
    readonly newsletterfooterColmBtnAfterLogin: Locator
    readonly loginLinkBtn: Locator
    readonly backBtn: Locator
    readonly no_subscriptionBtn: Locator
    readonly yes_subscriptionBtn: Locator
    readonly registerLinkBtn: Locator
    readonly newsletterBreadcrumb: Locator



    constructor(page: Page) {
        this.myAccountDropdown = page.locator(`//span[text()='My Account']`)
        this.myAccountLink = page.locator(`(//a[text()='My Account'])[1]`)
        this.subscribeANDunsubscribeBtn = page.locator(`//a[text()='Subscribe / unsubscribe to newsletter']`)
        this.pageHeading = page.locator(`//h1[text()='Newsletter Subscription']`)
        this.newsletterRightColmBtn = page.locator(`(//a[text()='Newsletter'])[1]`)
        this.newsletterfooterColmBtnBeforeLogin = page.locator(`//a[text()='Newsletter']`)
        this.newsletterfooterColmBtnAfterLogin = page.locator(`(//a[text()='Newsletter'])[2]`)
        this.loginLinkBtn = page.locator(`(//a[text()='Login'])[1]`)
        this.backBtn = page.locator(`//a[text()='Back']`)
        this.no_subscriptionBtn = page.locator(`(//input[contains(@name,"newsletter")])[2]`)
        this.yes_subscriptionBtn = page.locator(`(//input[contains(@name,"newsletter")])[1]`)
        this.registerLinkBtn = page.locator(`//a[text()='Register']`)
        this.newsletterBreadcrumb = page.locator(`(//a[@href="https://tutorialsninja.com/demo/index.php?route=account/newsletter"])[1]`)


    }
    async navigatingToNewsLetterSubscription() {
        await this.myAccountDropdown.waitFor({ state: 'visible' })
        await this.myAccountDropdown.click()
        await this.myAccountLink.waitFor({ state: 'visible' })
        await this.myAccountLink.click()
        await this.subscribeANDunsubscribeBtn.waitFor({ state: 'attached' })
        await this.subscribeANDunsubscribeBtn.click()
        await this.pageHeading.waitFor({ state: 'visible' })
        await this.pageHeading.isVisible()
    }
    async navigatingUsingRightColumnBtn() {
        await this.myAccountDropdown.waitFor({ state: 'visible' })
        await this.myAccountDropdown.click()
        await this.myAccountLink.waitFor({ state: 'visible' })
        await this.myAccountLink.click()
        await this.newsletterRightColmBtn.waitFor({ state: 'visible' })
        await this.newsletterRightColmBtn.click()
        await this.pageHeading.waitFor({ state: 'visible' })
        await this.pageHeading.isVisible()
    }
    async navigatingaBeforeLoggingInFromRightColm() {
        await this.myAccountDropdown.waitFor({ state: 'visible' })
        await this.myAccountDropdown.click()
        await this.loginLinkBtn.waitFor({ state: 'visible' })
        await this.loginLinkBtn.click()
        await this.newsletterRightColmBtn.waitFor({ state: 'visible' })
        await this.newsletterRightColmBtn.click()
    }
    async navigatingaBeforeLoggingInFromfooterColmBeforeLogin() {
        await this.newsletterfooterColmBtnBeforeLogin.waitFor({ state: 'visible' })
        await this.newsletterfooterColmBtnBeforeLogin.click()
    }
    async navigatingUsingFooterColmAfterLogin() {
        await this.newsletterfooterColmBtnAfterLogin.waitFor({ state: 'visible' })
        await this.newsletterfooterColmBtnAfterLogin.click()
        await this.pageHeading.waitFor({ state: 'visible' })
        await this.pageHeading.isVisible()
    }
    async clickOnBackBtn() {
        await this.backBtn.waitFor({ state: 'visible' })
        await this.backBtn.click()
    }
    async updatingSubscriptionOption() {

        const isNoSelected: boolean = await this.no_subscriptionBtn.isChecked();

        if (isNoSelected == false) {
            await this.no_subscriptionBtn.click()
            // console.log("no")
        }
        else (isNoSelected == true); {
            await this.yes_subscriptionBtn.waitFor({state: 'visible'})
            await this.yes_subscriptionBtn.click()
            // console.log("yes")
        }
    }
    async GoToRegisterPage(){
        await this.myAccountDropdown.waitFor({ state: 'visible' })
        await this.myAccountDropdown.click()
        await this.registerLinkBtn.waitFor({ state: 'visible' })
        await this.registerLinkBtn.click()
    }
    async checkingYesSubscriptionbtn(){
        await this.yes_subscriptionBtn.waitFor({state:'visible'})
        await this.yes_subscriptionBtn.isChecked()
    }
    async checkingNoSubscriptionbtn(){
        await this.no_subscriptionBtn.waitFor({state:'visible'})
        await this.no_subscriptionBtn.isChecked()
    }
    async verifyingNewsLetterBreadcrumb(){
        await this.newsletterBreadcrumb.waitFor({state: 'visible'})
        await this.newsletterBreadcrumb.isVisible()
    }
    async verifyingPageHeading(){
        await this.pageHeading.waitFor({ state: 'visible' })
        await this.pageHeading.isVisible()

    }








}















