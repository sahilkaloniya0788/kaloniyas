import { Page, Locator } from "@playwright/test";
let setupPage: Page;

export class SetupPage {
    readonly page: Page;
    readonly setupButton: Locator;
    readonly setupLink: Locator;
    readonly notificationButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.setupButton = page.getByRole('button', { name: 'Setup' }).getByRole('button', { name: 'Setup', exact: true }).filter({ hasText: 'Setup' });
        this.setupLink = page.getByRole('menuitem', { name: 'Setup Opens in a new tab Setup for current app' });
        this.notificationButton = page.getByRole("button", { name: 'Notifications' });
    }
    async navigateToApplicationSetting() {
        await this.setupButton.click();
        const page1Promise = this.page.waitForEvent('popup');
        await this.setupLink.click();
        setupPage = await page1Promise;
        await setupPage.getByPlaceholder('Quick Find').fill('custom metadata types');
        await setupPage.getByPlaceholder('Quick Find').press('Enter');
        await setupPage.getByRole('link', { name: 'Custom Metadata Types' }).click();
        await setupPage.frameLocator('iframe[name"-"vfFrameId"]').getByRole('link', { name: 'Application Settings' }).click();
        await setupPage.frameLocator('iframe[name"-"vfFrameId"]').getByRole('link', { name: 'Number Of Days for Reminder' }).click();
    }
    async updateReminderDays(reminderDays: string) {
        await setupPage.frameLocator('iframe[name"-"vfFrameId"]').getByRole('button', { name: 'Edit' }).click();
        await setupPage.frameLocator('iframe[name"-"vfFrameId"]').getByLabel('Default Value').fill(reminderDays);
        await setupPage.frameLocator('iframe[name"-"vfFrameId"]').getByRole('row', { name: 'Save Cancel', exact: true }).getByRole('button', { name: 'Save' }).click();
        return await setupPage.frameLocator('iframe[name="vfFrameId"]').locator('//td[text()="Default Value"]/following-sibling::td').textContent();
    }
}