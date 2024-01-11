import { Locator, Page, test } from "@playwright/test";
import { Helper } from "../../../utility/helper";

export class Address_Book_Page {
    readonly page: Page;
    readonly modifyyourAddressBookEntriesBtn: Locator
    readonly addressBookBtn: Locator
    readonly siteMapBtn: Locator
    readonly myAccountBtn: Locator
    readonly registerBtn: Locator
    readonly addressBookDetails: Locator
    readonly deleteAddressDetails: Locator
    readonly newAddressLink: Locator
    readonly firstnameField: Locator
    readonly lastnameField: Locator
    readonly addressname: Locator
    readonly cityName: Locator
    readonly postcodeField: Locator
    readonly stateField: Locator
    readonly continueBtn: Locator
    readonly EditAddressBtn: Locator
    readonly DefaultAddressNObtn: Locator
    readonly companyField: Locator
    readonly address2Field: Locator
    readonly warningMsgForEmptyNameField:Locator
    readonly backBtnONAddressEditedField:Locator
    readonly addressBookEnteriesBackBtn: Locator
    readonly homePageHeading: Locator
    readonly successMsgForAddressAdded: Locator 
    readonly DefaultAddressYESbtn : Locator
    readonly addressBookPageHeading: Locator
    readonly addressbookBreadcrumb:Locator
    
    constructor(page: Page) {
        this.modifyyourAddressBookEntriesBtn = page.locator(`//a[text()='Modify your address book entries']`)
        this.addressBookBtn = page.locator(`//a[contains(text(),'Address Book')]`)
        this.siteMapBtn = page.locator(`//a[text()='Site Map']`)
        this.myAccountBtn = page.locator(`//span[text()='My Account']`)
        this.registerBtn = page.locator(`//a[text()='Register']`)
        this.addressBookDetails = page.locator(`//p[text()='You have no addresses in your account.']`)
        this.deleteAddressDetails = page.locator(`(//a[text()='Delete'])[2]`)
        this.newAddressLink = page.locator(`//a[text()='New Address']`)
        this.firstnameField = page.locator(`//input[contains(@name,"firstname")]`)
        this.lastnameField = page.locator(`//input[contains(@name,"lastname")]`)
        this.addressname = page.locator(`//input[contains(@name,"address_1")]`)
        this.cityName = page.locator(`//input[contains(@name,"city")]`)
        this.postcodeField = page.locator(`//input[contains(@name,"postcode")]`)
        this.stateField = page.locator(`//select[contains(@name,"zone_id")]`)
        this.continueBtn = page.locator(`//input[contains(@value,"Continue")]`)
        this.EditAddressBtn = page.locator(`(//a[contains(text(),'Edit')])[1]`)
        this.DefaultAddressNObtn = page.locator(`(//input[contains(@name,"default")])[2]`)
        this.companyField = page.locator(`//input[contains(@name,"company")]`)
        this.address2Field = page.locator(`//input[contains(@name,"address_2")]`)
        this.warningMsgForEmptyNameField = page.locator(`(//div[contains(@class,"text-danger")])[1]`)
        this.backBtnONAddressEditedField = page.locator(`//a[text()='Back']`)
        this.addressBookEnteriesBackBtn = page.locator(`(//div[contains(@class,"pull-left")])[2]`)
        this.homePageHeading = page.locator(`//a[text()='Qafox.com']`)
        this.successMsgForAddressAdded = page.locator(`//div[contains(@class,"alert alert-success alert-dismissible")]`)
        this.DefaultAddressYESbtn = page.locator(`(//input[contains(@name,"default")])[1]`)
        this.addressBookPageHeading = page.locator(`//h2[text()='Address Book Entries']`)
        this.addressbookBreadcrumb = page.locator(`(//a[text()='Address Book'])[1]`)
    }
    async clickOnModdifyYourAddressBookEntries() {
        await this.modifyyourAddressBookEntriesBtn.click()
    }
    async clickOnAddressBookBtn() {
        await this.addressBookBtn.click()
    }
    async clickOnSiteBtn() {
        await this.siteMapBtn.click()
    }
    async clickOnMyAccountBtn() {
        await this.myAccountBtn.click()
    }
    async clickOnRegisterBtn() {
        await this.registerBtn.click()
    }
    async verifyingAddressBookDetails() {
        await this.addressBookDetails.isVisible()
    }
    async addingNewAddressDetails() {
        // for (let i = 0; i < 10; i++) {
            await this.newAddressLink.click()
            await this.firstnameField.waitFor({ state: 'visible' })
            await this.firstnameField.click()
            await this.firstnameField.fill('sahil' + Helper.uniqueNumbers())
            await this.lastnameField.click()
            await this.lastnameField.fill('kaloniya' + Helper.uniqueNumbers())
            await this.addressname.click()
            await this.addressname.fill(Helper.uniqueNumbers())
            await this.cityName.click()
            await this.cityName.fill('panipat')
            await this.postcodeField.click()
            await this.postcodeField.fill(Helper.uniqueNumbers())
            await this.stateField.waitFor({ state: 'visible' })
            await this.stateField.click()
            await this.stateField.selectOption("Angus")
            await this.continueBtn.click()
            await Helper.delay(2000)
        // }
    }
    async addingAllFieldsOnNewAddressDetailsPage(){
        await this.firstnameField.waitFor({ state: 'visible' })
            await this.firstnameField.click()
            await this.firstnameField.fill('sahil' + Helper.uniqueNumbers())
            await this.lastnameField.click()
            await this.lastnameField.fill('kaloniya' + Helper.uniqueNumbers())
            await this.addressname.click()
            await this.addressname.fill(Helper.uniqueNumbers())
            await this.cityName.click()
            await this.cityName.fill('panipat')
            await this.postcodeField.click()
            await this.postcodeField.fill(Helper.uniqueNumbers())
            await this.stateField.waitFor({ state: 'visible' })
            await this.stateField.click()
            await this.stateField.selectOption("Angus")
            await this.continueBtn.click()
            await Helper.delay(2000)
    }
    async deletingAddressDetails() {
        for (let i = 2; i < 9; i++) {
            await this.deleteAddressDetails.waitFor({ state: 'visible' })
            await Helper.delay(2000)
            await this.deleteAddressDetails.click()
            await Helper.delay(2000)
        }
    }
    async clickingOnEditBtn(){
        await this.EditAddressBtn.waitFor({ state: 'visible' })
        await this.EditAddressBtn.click()
    }
    async updatingAddressDetails() {
        await this.EditAddressBtn.waitFor({ state: 'visible' })
        await this.EditAddressBtn.click()
        await this.firstnameField.waitFor({ state: 'visible' })
        await this.firstnameField.click()
        await this.firstnameField.fill('john' + Helper.uniqueNumbers())
        await this.lastnameField.click()
        await this.lastnameField.fill('dean' + Helper.uniqueNumbers())
        await this.addressname.click()
        await this.addressname.fill(Helper.uniqueNumbers())
        await this.cityName.click()
        await this.cityName.fill('st.mary')
        await this.postcodeField.click()
        await this.postcodeField.fill(Helper.uniqueNumbers())
        await this.stateField.waitFor({ state: 'visible' })
        await this.stateField.click()
        await this.stateField.selectOption("Conwy")
        await this.continueBtn.click()
        await Helper.delay(2000)
    }
    async changingDefaultAddressToNO(){
        await this.DefaultAddressNObtn.click()
        await this.continueBtn.click()
        await Helper.delay(2000)
    }
    async changingDefaultAddressToYES(){
        await this.DefaultAddressYESbtn.click()
        await this.continueBtn.click()
        await Helper.delay(2000)
    }
    async updatingByClearingAllManatoryField(){
        await this.companyField.waitFor({state: 'visible'})
        await this.companyField.click()
        await this.companyField.clear()
        await this.address2Field.waitFor({state: 'visible'})
        await this.address2Field.click()
        await this.address2Field.clear()
        await this.continueBtn.click()
        await Helper.delay(2000)
    }
    async clearingAllAddressBookFields(){
        await this.EditAddressBtn.waitFor({ state: 'visible' })
        await this.EditAddressBtn.click()
        await this.firstnameField.waitFor({ state: 'visible' })
        await this.firstnameField.click()
        await this.firstnameField.fill('')
        await this.lastnameField.click()
        await this.lastnameField.fill('')
        await this.addressname.click()
        await this.addressname.fill('')
        await this.cityName.click()
        await this.cityName.fill('')
        await this.postcodeField.click()
        await this.postcodeField.fill('')
        await this.stateField.waitFor({ state: 'visible' })
        await this.stateField.click()
        await this.stateField.selectOption("Conwy")
        await this.continueBtn.click()
        await Helper.delay(2000)
    }
    async warningMsgForEmptyField(){
        await this.warningMsgForEmptyNameField.waitFor({state: 'visible'})
        await this.warningMsgForEmptyNameField.isVisible()
    }
    async verifyingBackBtbOnAddressEditPageAfterUpdating(){
        await this.firstnameField.waitFor({ state: 'visible' })
        await this.firstnameField.click()
        await this.firstnameField.fill('devsingh' + Helper.uniqueNumbers())
        await this.backBtnONAddressEditedField.waitFor({state: 'visible'})
        await this.backBtnONAddressEditedField.click()
        await Helper.delay(5000)
    }
    async VerifyingAddressBookEntriesBackBtn(){
        await this.addressBookEnteriesBackBtn.waitFor({state:'visible'})
        await this.addressBookEnteriesBackBtn.click()
    }
    async verifyingHomePageHeading(){
        await this.homePageHeading.waitFor({state:'visible'})
        await this.homePageHeading.isVisible()
    }
    async GotoHomePage(){
        await this.homePageHeading.waitFor({state:'visible'})
        await this.homePageHeading.click()
    }
    async verifyingSuccessMsgAfterNewAddressAdded(){
        await this.successMsgForAddressAdded.waitFor({state:'visible'})
        await this.successMsgForAddressAdded.isVisible()
    }
    async verifyingAddressBookHeading(){
        await this.addressBookPageHeading.waitFor({state:'visible'})
        await this.addressBookPageHeading.isVisible()
    }
    async verifyingaddressbookBreadcrumb(){
        await this.addressbookBreadcrumb.waitFor({state:'visible'})
        await this.addressbookBreadcrumb.isVisible()
    }
}