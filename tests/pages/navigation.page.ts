import { Helper } from "../utility/helper";
import { Page, Locator } from "@playwright/test";

export class Navigation {
    readonly page: Page;
    readonly navigationMenu: Locator;
    readonly searchField: Locator;
    readonly closeAllTabsButtons: Locator;
    readonly selectListViewButton: Locator;
    readonly allPreliminaryApplicationOption: Locator;
    readonly allCasesOption: Locator;
    readonly allRegistrations: Locator;
    readonly myAccount : Locator;
    readonly registerButton : Locator;
    readonly loginButton : Locator;
    readonly logout: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navigationMenu = page.getByRole("button", { name: 'Show Navigation Menu' });
        this.searchField = page.getByPlaceholder("Search this list...");
        this.closeAllTabsButtons = page.getByRole('button', { name: 'Close All' });
        this.selectListViewButton = page.getByRole('button', { name: 'Select a List View' });
        this.allPreliminaryApplicationOption = page.getByRole("option", { name: 'All Preliminary Application References' });
        this.allCasesOption = page.getByRole("option", { name: 'All Cases' });
        this.allRegistrations = page.getByRole('option', { name: 'all' });
        this.myAccount = page.locator("//a[@title='My Account']");
        this.registerButton = page.getByRole('link', { name: 'Register' });
        this.loginButton = page.getByRole('link', { name: 'Login' });
        this.logout = this.page.locator('#top-links').getByRole('link', { name: 'Logout' });
    }
    async gotoRegisterPage(){
        await this.myAccount.waitFor({ state: "visible" });
        await this.myAccount.click();   
        await this.registerButton.click(); 
    }
    async gotoLoginPage(){
        await this.myAccount.waitFor({ state: "visible" });
        await this.myAccount.click();   
        await this.loginButton.click(); 
    }
    async closeAllTabs() {
        const closedTabsRegex = new RegExp('[0-9] tab[a-z] + closed');
        try {
            await this.page.keyboard.press("shift");
            await Helper.delay(1000);
            if (await this.closeAllTabsButtons.isVisible()) {
                await this.closeAllTabsButtons.click();
            }
            await this.page.getByText(closedTabsRegex).waitFor({ state: "visible", timeout: 10000 });
            await this.page.getByText(closedTabsRegex).waitFor({ state: "hidden", timeout: 10000 });
        }
        catch (error) {

        }
    }
    async Logout() {
        await this.myAccount.click();
        await this.logout.click();
        await this.page.getByRole('link', { name: 'Continue' }).click();
        // await this.page.close();
    }
    async selectievigationMenuOption(optionName: string) {
        await this.navigationMenu.click();
        await this.page.getByRole('option', { name: optionName, exact: true }).click();
    }
    async selectByID(id: string) {
        var idRegex = new RegExp('[0-9]+' + id + '[A-Za-z0-9/,:]+');
        var caseIdRegex = new RegExp('Case [0-9]+' + id);
        await Helper.delay(2000);
        await this.selectListViewButton.waitFor({ state: "visible" });
        await this.selectListViewButton.click();
        await this.allCasesOption.click();
        await Helper.delay(2000);
        await this.searchField.fill(id);
        await this.searchField.press("Enter");
        await this.page.getByRole('option', { name: idRegex }).waitFor({ state: "visible" });
        await this.page.getByRole('option', { name: idRegex }).click();
        await this.page.getByRole('heading', { name: caseIdRegex }).getByText('Case').waitFor({ state: 'visible' });
        return this.page.url().split("Case/")[1].split("/")[0];
    }
    async selectBycpdid(id: string) {
        var idRegex = new RegExp('[0-9]+' + id + '[A-Za-z0-9/1]+');
        await Helper.delay(2000);
        await this.selectListViewButton.waitFor({ state: 'visible' });
        await Helper.delay(2000);
        await this.searchField.fill(id);
        await this.searchField.press('Enter');
        await this.page.getByRole('option', { name: idRegex }).waitFor({ state: "visible" });
        await this.page.getByRole('option', { name: idRegex }).click();
        await this.page.getByRole('heading', { name: 'Case null' }).getByText('Case').waitFor({ state: "visible" });
        return this.page.url().split("Case/")[1].split("/")[0];
    }
    async selectByPreliminaryApplication(id: string) {
        var idRegex = new RegExp(`PAR-[0-9]+${id}`);
        await Helper.delay(2000);
        await this.selectListViewButton.waitFor({ state: 'visible' });
        await this.selectListViewButton.click();
        await this.allPreliminaryApplicationOption.click();
        await Helper.delay(2000);
        await this.searchField.fill(id);
        await this.searchField.press('Enter');
        await this.page.getByRole('option', { name: idRegex }).waitFor({ state: "visible" });
        await this.page.getByRole('option', { name: idRegex }).click();
        await this.page.getByText('Preliminary Application Reference', { exact: true }).waitFor({ state: 'visible' });
        return this.page.url().split("PreliminaryApplicationRef/")[1].split('/')[0];
    }
    async selectByegistrations(regName: string) {
        await Helper.delay(2000);
        await this.selectListViewButton.waitFor({ state: 'visible' });
        await this.selectListViewButton.click();
        await this.allRegistrations.click();
        await Helper.delay(2000);
        await this.searchField.fill(regName);
        await this.searchField.press("Enter");
        await this.page.getByRole('option', { name: regName }).waitFor({ state: "visible" });
        await this.page.getByRole('option', { name: regName }).click();
        await this.page.locator("lightning-formatted-text").filter({ hasText: regName }).waitFor({ state: "visible" });
        return this.page.url().split("usinessLicense/")[1].split("/")[0];
    }
}
