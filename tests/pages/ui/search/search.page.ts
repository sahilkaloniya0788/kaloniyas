import { Page, Locator, expect } from "@playwright/test";
import { text } from "node:stream/consumers";
import { Helper } from "../../../utility/helper";

export class SearchPage {
    readonly page: Page;
    readonly searchButton: Locator;
    readonly searchInput: Locator;
    readonly searchButton1: Locator;
    readonly searchTextBox: Locator;
    readonly searchCriteriaTextBox: Locator;
    readonly searchInProdDescrCheckBox: Locator;
    readonly searchExistingProductTitle: Locator;
    readonly criteriaSearchBtn: Locator
    readonly allCategoryDropdown: Locator
    readonly listVeiwBtn: Locator
    readonly homepageBtn: Locator
    readonly gridVeiwBtn: Locator
    readonly productCompareLink: Locator
    readonly iphoneIcon: Locator
    readonly siteMapLink: Locator
    readonly BreadCrumb: Locator
    readonly pageHeading: Locator
    readonly macbookAddToCartBtn: Locator
    readonly shoppingCartLink:Locator
    readonly checkoutBtn: Locator
    readonly newAddressBtn: Locator

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.getByPlaceholder('Search');
        this.searchButton = page.locator(`//div[@id='search']//button`);
        this.searchTextBox = page.locator('//input[contains(@class,"form-control input-lg")]')
        this.searchCriteriaTextBox = page.getByPlaceholder('Keywords');
        this.searchInProdDescrCheckBox = page.getByText('Search in product descriptions');
        this.searchExistingProductTitle = page.getByText('iMac', { exact: true });
        this.criteriaSearchBtn = page.locator(`//input[contains(@value,"Search")]`)
        this.allCategoryDropdown = page.locator(`//select[contains(@name,"category_id")]`)
        this.listVeiwBtn = page.locator(`//button[contains(@class,"btn btn-default active")]`)
        this.homepageBtn = page.locator(`//h1//a[contains(@href,"https://tutorialsninja.com/demo/index.php?route=common/home")]`)
        this.gridVeiwBtn = page.locator(`//button[contains(@id,"grid-view")]`)
        this.productCompareLink = page.locator(`//a[contains(text(),'Product Compare (0)')]`)
        this.iphoneIcon = page.locator(`//img[contains(@title,"iPhone")]`)
        this.siteMapLink = page.locator(`//a[contains(text(),'Site Map')]`)
        this.BreadCrumb = page.locator(`//ul[@class="breadcrumb"]`)
        this.pageHeading = page.locator(`//a[text()='Qafox.com']`)
        this.macbookAddToCartBtn = page.locator(`(//span[contains(text(),'Add to Cart')])[1]`)
        this.shoppingCartLink = page.locator(`(//a[contains(text(),'shopping cart')])[1]`)
        this.checkoutBtn = page.locator(`//a[text()='Checkout']`)
        this.newAddressBtn = page.locator(`(//input[contains(@name,"payment_address")])[2]`)
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

    async addingMacBOOKToShoppingCart(){
        await this.searchInput.waitFor({ state: 'visible' });
        await this.searchInput.click();
        await this.searchInput.fill('macbook');
        await this.searchButton.click();
        await this.macbookAddToCartBtn.waitFor({state:'visible'})
        await this.macbookAddToCartBtn.click()
        await this.shoppingCartLink.waitFor({state:'visible'})
        await this.shoppingCartLink.click()
        await this.checkoutBtn.waitFor({state:'visible'})
        await this.checkoutBtn.click()
        await this.newAddressBtn.waitFor({state:'visible'})
        await this.newAddressBtn.click()

    }

    async searchingExistingProduct(){
        await this.searchInput.waitFor({ state: 'visible' });
        await this.searchInput.click();
        await this.searchInput.fill('imac');
        await this.searchButton.click();

    }
    async verifySearchPlaceholder() {

        await this.searchTextBox.waitFor({ state: 'visible' });
        expect(this.searchTextBox.getByRole('heading', { name: 'Search' })).toBeVisible();
        await this.searchCriteriaTextBox.waitFor({ state: 'visible' });
        expect(await this.searchCriteriaTextBox.getAttribute('placeholder')).toBe('Keywords');
        await this.searchInProdDescrCheckBox.waitFor({ state: 'visible' });
        expect(this.searchInProdDescrCheckBox).toBe('Search in product descriptions');
    }

    async verifyExistingSearchProduct() {
        await this.searchExistingProductTitle.waitFor({ state: 'visible' });
        await expect(this.searchExistingProductTitle).toContainText('iMac');
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
        await this.searchCriteriaTextBox.waitFor({ state: 'visible' });
        await this.searchCriteriaTextBox.click()
        await this.searchCriteriaTextBox.fill('imac')
        await this.criteriaSearchBtn.click()
        await this.searchExistingProductTitle.waitFor({ state: 'visible' })
        await expect(this.searchExistingProductTitle).toContainText('iMac')

    }

    async searchUsingTextFromProductDiscription() {
        await this.searchInput.waitFor({ state: 'visible' });
        await this.searchInput.click();
        await this.searchInput.fill('');
        await this.searchButton.click();
        await this.searchCriteriaTextBox.waitFor({ state: 'visible' });
        await this.searchCriteriaTextBox.click()
        await this.searchCriteriaTextBox.fill('ilife')
        await this.searchInProdDescrCheckBox.check()
        await this.criteriaSearchBtn.click()
        await this.searchExistingProductTitle.waitFor({ state: 'visible' })
        await expect(this.searchExistingProductTitle).toContainText('iMac')

    }

    async searchByProductCategory(dropdownOption: string) {
        await this.searchInput.waitFor({ state: 'visible' });
        await this.searchInput.click();
        await this.searchInput.fill('');
        await this.searchButton.click();
        await this.searchCriteriaTextBox.waitFor({ state: 'visible' });
        await this.searchCriteriaTextBox.click()
        await this.searchCriteriaTextBox.fill('imac')
       
        // let searchResult = this.page.locator(`//select[@name="category_id"]//option`).all()
        // const resultList: string[] = await Promise.all((await searchResult).map(async (element) => {
        //     return await element.innerText();
        // }));
        // const trimmedStringList: string[] = resultList.map((str) => str.replace(/\s/g, ''));
        // console.log(trimmedStringList)
        // const index = (trimmedStringList.indexOf(dropdownOption))
        // console.log(resultList);
        // if (index !== -1) {
        //     console.log(`Index of ${dropdownOption}: ${index}`);
        // }

        // await this.page.selectOption(this.trimmedStringList[], { index: 2 }); // Replace 2 with the index of the option you want to select

        // // if (index >= 0 && index < elements.length) {
        //     console.log(elements)
        //     await this.allCategoryDropdown.click()
        //     await Helper.delay(2000)
        // await elements[3].click();


        // const dt = this.page.locator(`//select[@name="category_id"]//option`)
        // await this.page.selectOption(dt, { label: 'Option Label' });         

    }

    async verifyingListVeiwOfProducts(){
        await this.searchInput.waitFor({ state: 'visible' });
        await this.searchInput.click();
        await this.searchInput.fill('imac');
        await this.searchButton.click();
        await this.listVeiwBtn.click()
        await this.searchExistingProductTitle.waitFor({state: 'visible'})
        await expect(this.searchExistingProductTitle).toContainText('iMac')
        await this.homepageBtn.click()
    }

    async verifyingGridVeiwOfProducts(){
        await this.searchInput.waitFor({ state: 'visible' });
        await this.searchInput.click();
        await this.searchInput.fill('imac');
        await this.searchButton.click();
        await this.gridVeiwBtn.click()
        await this.searchExistingProductTitle.waitFor({state: 'visible'})
        await expect(this.searchExistingProductTitle).toContainText('iMac')

    }

    async NavigatingToProductComparePage(){
        await this.searchInput.waitFor({ state: 'visible' });
        await this.searchInput.click();
        await this.searchInput.fill('imac');
        await this.searchButton.click();
        await this.productCompareLink.click()

    }

    async verifyingSearchBtnAndFieldDisplayedInEachPage(){
        await this.searchInput.waitFor({ state: 'visible' });
        await this.searchInput.click();
        await this.searchInput.fill('');
        await this.searchButton.click();
        await this.searchInput.isVisible()
        await this.searchButton.isVisible()
        await this.homepageBtn.click()
        await this.iphoneIcon.click()
        await this.searchInput.waitFor({ state: 'visible' })
        await this.searchInput.isVisible()
        await this.searchButton.isVisible()
    }

    async navigatingToSearchPageFromSiteMap(){
        await this.siteMapLink.click()
        await this.searchInput.isVisible()
        await this.searchButton.isVisible()
    }

    async verifyingBreadcrumbOption(){
        await this.searchInput.waitFor({ state: 'visible' })
        await this.searchInput.click()
        await this.searchInput.fill('iMac')
        await this.searchButton.click()
        await Helper.delay(2000)
        await this.BreadCrumb.isVisible()
    }

    async verifyingPageHeadingAndPageURL(){
        await this.pageHeading.isVisible()
      
    }
















}



