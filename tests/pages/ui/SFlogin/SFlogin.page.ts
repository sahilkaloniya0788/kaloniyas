import { Page, Locator, expect } from "@playwright/test";
import { Helper } from "../../../utility/helper";

let page: Page;


export class SFlogin {
    readonly page: Page;
    readonly sfuser: Locator
    readonly sfpassword: Locator
    readonly loginBtn: Locator
    readonly objectManagerBtn: Locator
    readonly quicksearchforobjectmanager: Locator
    readonly quicksearchpage: Locator
    readonly applauncherbtn: Locator
    readonly viewAllapp: Locator
    readonly salesApp: Locator
    readonly opportunitiesBtn: Locator
    readonly newopportunityBtn: Locator
    readonly opportunitynameField: Locator
    readonly closedatefield: Locator
    readonly stagedropdown: Locator
    readonly saveBtn: Locator

    constructor(page: Page) {
        this.sfuser = page.locator(`//input[@id="username"]`)
        this.sfpassword = page.locator(`//input[@id="password"]`)
        this.loginBtn = page.locator(`//input[@id="Login"]`)
        this.objectManagerBtn = page.locator(`(//span[text()='Object Manager'])[1]`)
        this.quicksearchforobjectmanager = page.locator(`//input[@id="globalQuickfind"]`)
        this.quicksearchpage = page.locator(`//table[contains(@class,"slds-table slds-table--bordered uiVirtualDataGrid--default uiVirtualDataGrid")]`)
        this.applauncherbtn = page.locator(`//div[@class="slds-icon-waffle"]`)
        this.viewAllapp = page.locator(`//button[text()='View All']`)
        this.salesApp = page.locator(`//a[@href="/lightning/app/06m5j000005AtbDAAS"]`)
        this.opportunitiesBtn = page.locator(`//span[text()='Opportunities']`)
        this.newopportunityBtn = page.locator(`//div[text()='New']`)
        this.opportunitynameField = page.locator(`//input[@name="Name"]`)
        this.closedatefield = page.locator(`//input[@name="CloseDate"]`)
        this.stagedropdown = page.locator(`//button[@aria-label="Stage, --None--"]`)
        this.saveBtn = page.locator(`//button[@name="SaveEdit"]`)

    }
    async inputLoginUsername(sfuser: string) {
        await this.sfuser.waitFor({ state: "visible" });
        await this.sfuser.clear();
        await this.sfuser.fill(sfuser);
    }
    async inputLoginPassword(sfpassword: string) {
        await this.sfpassword.waitFor({ state: "visible" });
        await this.sfpassword.clear();
        await this.sfpassword.fill(sfpassword);
    }
    async clickOnLoginBtn() {
        await this.loginBtn.waitFor({ state: "visible" });
        await this.loginBtn.click();
    }
    async clickOnObjectManager() {
        await this.objectManagerBtn.waitFor({ state: "visible" });
        await this.objectManagerBtn.click()
        await Helper.delay(2000)
    }
    async searchingAnyObjectFromObjectManager() {
        await this.quicksearchforobjectmanager.waitFor({ state: "visible" });
        await this.quicksearchforobjectmanager.click()
        await this.quicksearchforobjectmanager.fill("case")
        await Helper.delay(2000)
        // const searchedElement = await  expect(this.quicksearchpage).toContainText("case")
        // if (this.quicksearchpage) {
        //     await this.quicksearchpage.click();
        // } else {
        //     console.log("Element 'case' is not visible.");
        // }
    }
    async clickingOnAppLauncher(){
        await this.applauncherbtn.waitFor({ state: "visible" });
        await this.applauncherbtn.click()
    }
    async clickingOnViewAllAppBtn(){
        await this.viewAllapp.waitFor({ state: "visible" });
        await this.viewAllapp.click()
    }
    async clickOnSalesApp(){
        await this.salesApp.waitFor({ state: "visible" });
        await this.salesApp.click()
    }
    async creatingNewOppotunities(){
        await this.opportunitiesBtn.waitFor({ state: "visible" });
        await this.opportunitiesBtn.click()
        await this.newopportunityBtn.waitFor({ state: "visible" });
        await this.newopportunityBtn.click()
        await Helper.delay(5000)
        await this.opportunitynameField.waitFor({ state: "visible" });
        await this.opportunitynameField.click()
        await this.opportunitynameField.fill("sam123")
        await this.closedatefield.waitFor({ state: "visible" });
        await this.closedatefield.click()
        await this.closedatefield.fill("06/04/2024")
        await this.stagedropdown.waitFor({ state: "visible" });
        await this.stagedropdown.click()
        await this.stagedropdown.type("Qualificaton")
        await Helper.delay(5000)


        await this.saveBtn.click()
    }


}

