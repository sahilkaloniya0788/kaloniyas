import { Page, Locator, expect } from "@playwright/test";
import { text } from "node:stream/consumers";

export class SearchPage {
    readonly page: Page;
    readonly searchButton: Locator;
    readonly searchInput: Locator;
    readonly searchButton1: Locator;
    readonly searchTextBox: Locator;
    readonly searchCriteriaTextBox: Locator;
    readonly searchInProdDescrCheckBox: Locator;
    readonly searchExistingProductTitle: Locator;
   
    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.getByPlaceholder('Search');
        this.searchButton = page.locator(`//div[@id='search']//button`);
        this.searchTextBox = page.getByRole('heading', { name: 'Search', exact: true });
        this.searchCriteriaTextBox = page.getByPlaceholder('Keywords');
        this.searchInProdDescrCheckBox = page.getByText('Search in product descriptions');
        this.searchExistingProductTitle = page.getByText('iMac', { exact: true });

    }
    async inputSearchProduct(productName: string) {
        await this.searchInput.waitFor({ state: 'visible' });
        await this.searchInput.clear();
        await this.searchInput.click();
        await this.searchInput.fill(productName);

    }
    async emptyInputSearchProduct() {
        await this.searchInput.waitFor({ state: 'visible' });
        await this.searchInput.click();
        await this.searchInput.fill('');
        await this.searchButton.click();

    }
    async verifySearchPlaceholder() {
    
        await this.searchTextBox.waitFor({ state: 'visible' });
        expect(this.searchTextBox.getByRole('heading', { name: 'Search' })).toBeVisible();
        await this.searchCriteriaTextBox.waitFor({ state: 'visible' });
        expect(await this.searchCriteriaTextBox.getAttribute('placeholder')).toBe('Keywords');
        await this.searchInProdDescrCheckBox.waitFor({ state: 'visible' });
        await expect(this.searchInProdDescrCheckBox).toBe('Search in product descriptions');
    }

    async verifyExistingSearchProduct() {
        await this.searchExistingProductTitle.waitFor({ state: 'visible' });
        await expect(this.searchExistingProductTitle).toBe('iMac');
    }
    async verifyNonExistingSearchProduct() {
        await this.searchExistingProductTitle.waitFor({ state: 'hidden' });
        await this.searchExistingProductTitle.isVisible();
        return false;
    }
    async clickOnSearchButton() {
        await this.searchButton.waitFor({ state: 'visible' });
        await this.searchButton.click();
    }
    async searchByCriteria() {
        await this.searchInput.waitFor({ state: 'visible' });
        await this.searchInput.click();
        await this.searchInput.fill('');
        await this.searchButton.click();

    }
}