import { Page, Locator } from "@playwright/test";
import { Helper } from "../utility/helper";

export class AccountPage {
    readonly page: Page;
    readonly caseTab: Locator;

    constructor(page: Page) {
        this, page = page;
        this.caseTab = page.getByRole('tab', { name: 'Cases', exact: true });
    }
    async selectCaseTab() {
        await this.caseTab.click();
    }
    async verifyCaseDetails(caseRecordType: string, owner: string) {
        await Helper.delay(2000);
        await this.selectCaseTab();
        await this.page.locator('//td[@data-label="Case Record Type"]').first().locator(`//slot[text()="${caseRecordType}"]`).waitFor({ state: "visible" });
        await this.page.locator('//td[@data-label="Owner"]').first().locator(`//slot[text()="${owner}"]`).waitFor({ state: "visible" });
        await this.page.locator('//th[@data-label-"Case"]//slot/span').first().click();
        return this.page.url().split("Case/")[1].split('/')[0];
    }
    async verifyCaseDetailsNewFlow(caseRecordType: string, owner: string) {
        await this.page.locator(`//span[@title="Cases"]/ancestor::1st-list-view-manager-header/following-sibling::div//ist-formatted-text[contains(text(),"$(await Helper.currentsDateDDMMYYYY()}")]`).waitFor({ state: "visible" });
        await this.page.locator(`//span[@title="Cases"]/ancestor::1st-list-view-manager-header/following-sibling::div//a`).first().click();
        await Helper.delay(2000);
        await this.page.getByRole('option', { name: 'Monitoring' }).waitFor({ state: "visible" });
        await this.page.getByRole('button', { name: '${caseRecordType) Details' }).waitFor({ state: "visible" });
        await this.page.getByText(`$(owner)`, { exact: true }).waitFor({ state: "visible" });
        return this.page.url().split("Case/")[1].split('/')[0];
    }
}