import { Locator, Page, test } from "@playwright/test";
import { SearchPage } from "../search/search.page";
let searchPage :SearchPage
export class Product_Compare_Page{
    readonly page: Page;
    readonly searchItems:SearchPage;
    readonly clickOnProduct:Locator;
    readonly clickOncompare:Locator;
    readonly productCompareFromLink:Locator;
    readonly productDetails:Locator;

    readonly gridViewButton:Locator;
    readonly listViewButton:Locator;

    readonly categorySelect:Locator;
    readonly subCategoryProduct:Locator;
    readonly subcategoryCheckbox:Locator;
    readonly searchButton:Locator;

    readonly compareProductButton:Locator;

    readonly compareFromRelated:Locator;
    readonly compareFromHome:Locator;

    readonly productCompare:Locator;
    readonly productComparison:Locator;

    readonly desktopsMenu:Locator;
    readonly showAllDesktops:Locator;
    readonly noProductChoose:Locator;
    readonly continueOnNoProduct:Locator;
    readonly featuredAfterContinue:Locator;
    readonly productComparisonBreadcrumb:Locator;
    readonly homeBreadcrumb:Locator;
    readonly productNameInLink:Locator;
    readonly searchInput: Locator;
    readonly addToCartButton:Locator;
    readonly removeButton:Locator;

    readonly comPareButtonAfterSearch:Locator;

    readonly product1iMac:Locator;
    readonly product2iPhone:Locator;
    readonly product3MacBookAir:Locator;
    readonly product4MacBook:Locator;

    constructor(page: Page) { 
        this.page=page;
        this.clickOnProduct=;
        this.clickOncompare=page.locator("//body/div[@id='product-product']/div[1]/div[1]/div[1]/div[2]/div[1]/button[2]");
        this.productCompareFromLink=page.locator("//a[contains(text(),'product comparison')]");
        this.productDetails=page.locator("//strong[contains(text(),'Product Details')]");

        this.gridViewButton=page.locator("//button[@id='grid-view']");
        this.listViewButton=page.locator("//button[@id='list-view']");
        this.searchInput = page.getByPlaceholder('Search');
        this.searchButton = page.locator(`//div[@id='search']//button`);
        this.categorySelect=page.locator("//body/div[@id='product-search']/div[1]/div[1]/div[1]/div[2]/select[1]");
        this.subCategoryProduct=page.locator("//option[contains(text(),'Desktops')]");
        this.compareProductButton=page.locator("//body/div[@id='product-search']/div[2]/div[1]/div[3]/div[1]/div[1]/div[2]/div[2]/button[3]");
        this.subcategoryCheckbox=page.locator("//body/div[@id='product-search']/div[1]/div[1]/div[1]/div[3]/label[1]");
        this.searchButton=page.getByRole('button',{name:'Search'});
        this.compareFromRelated=page.locator("//body/div[@id='product-product']/div[2]/div[1]/div[2]/div[1]/div[1]/div[3]/button[3]/i[1]");
        this.compareFromHome=page.locator("//body/div[@id='common-home']/div[1]/div[1]/div[2]/div[1]/div[1]/div[3]/button[3]");
        
        this.productCompare=page.locator("//a[@id='compare-total']");
        this.productComparison=page.locator("//h1[contains(text(),'Product Comparison')]");

        this.desktopsMenu=page.locator("//a[text()= 'Desktops']");
        this.showAllDesktops=page.locator("//a[contains(text(),'Show AllDesktops')]");

        this.noProductChoose=page.locator("//p[contains(text(),'You have not chosen any products to compare.')]");
        this.continueOnNoProduct=page.locator("//a[contains(text(),'Continue')]");
        this.featuredAfterContinue=page.locator("//h3[contains(text(),'Featured')]");
        this.productComparisonBreadcrumb=page.locator("//a[contains(text(),'Product Comparison')]");
        this.homeBreadcrumb=page.locator("//body/div[@id='product-compare']/ul[1]/li[1]/a[1]/i[1]");
        this.productNameInLink=page.locator("//body/div[@id='product-product']/div[1]/a[1]");
        this.addToCartButton=page.getByRole("button",{name:'Add To Cart'});
        this.removeButton=page.getByRole('button',{name:'Remove'});
        this.comPareButtonAfterSearch=page.locator("//body/div[@id='product-search']/div[1]/div[1]/div[3]/div[1]/div[1]/div[2]/div[2]/button[3]");
        this.product1iMac=page.locator("//strong[contains(text(),'iMac')]");
        this.product2iPhone=page.locator("//strong[contains(text(),'iPhone')]");
        this.product3MacBookAir=page.locator("//strong[contains(text(),'MacBook Air')]");
        this.product4MacBook=page.locator("//strong[contains(text(),'MacBook')]");


    }
    async searchProductByText(productName : string){
        await this.searchInput.waitFor({ state: 'visible' });
        await this.searchInput.clear();
        await this.searchInput.click();
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }
    async verifyclickOnProductCase1()
    {
        await this.clickOnProduct.waitFor({state:'visible'});
        await this.clickOnProduct.click();
        await this.clickOncompare.click();
        await this.productCompareFromLink.click();
        await this.productDetails.isVisible();
    }
    async clickOnProductByTitle(productName : string){
        const productNameTitle = await this.page.locator(`//a[contains(text(),'${productName}')]`)
        productNameTitle.waitFor({state:'visible'})
        productNameTitle.click()
}
    async addProductsToCompareList()
    {
        const compareButton=await this.page.locator("//body/div[@id='product-product']/div[1]/div[1]/div[1]/div[2]/div[1]/button[2]");
        compareButton.waitFor({state:'visible'});
        compareButton.click();
    }
    async verifyclickOnProductCommon()
    {
        
        await this.compareProductButton.click();
        await this.productCompareFromLink.click();
        await this.productDetails.isVisible();
    }

    async verifyListViewCompare2()
    {
        await this.searchItems.inputSearchProduct("iMac");
        await this.searchItems.clickOnSearchButton();
        await this.listViewButton.waitFor({state:'visible'});
        await this.listViewButton.click();
        await this.verifyclickOnProductCommon();

    }
    
    async verifyGridViewCompareCase3()
    {
        await this.searchItems.inputSearchProduct("iMac");
        await this.searchItems.clickOnSearchButton();
        await this.gridViewButton.waitFor({state:'visible'});
        await this.gridViewButton.click();
        await this.verifyclickOnProductCommon();
    }
    async verifyComparingFromCategory4()
    {
        await this.categorySelect.waitFor({state:'visible'});
        await this.categorySelect.click();
        await this.subCategoryProduct.click();
        await this.subcategoryCheckbox.setChecked(true);
        await this.searchButton.click();
        await this.listViewButton.waitFor({state:"visible"});
        await this.listViewButton.click();
        await this.verifyclickOnProductCommon();
    }

    async verifyComparingFromCategory5()
    {
        await this.categorySelect.waitFor({state:'visible'});
        await this.categorySelect.click();
        await this.subCategoryProduct.click();
        await this.subcategoryCheckbox.setChecked(true);
        await this.searchButton.click();
        await this.gridViewButton.waitFor({state:"visible"});
        await this.gridViewButton.click();
        await this.verifyclickOnProductCommon();
    }
    
    async verifyComparingRelated6()
    {
        await this.searchItems.inputSearchProduct("iMac");
        await this.searchItems.clickOnSearchButton();
        await this.clickOnProduct.waitFor({state:'visible'});
        await this.clickOnProduct.click();
        await this.compareFromRelated.waitFor({state:'visible'});
        await this.compareFromRelated.click();
        await this.productCompareFromLink.click();
        await this.productDetails.isVisible();
    } 

    async verifyCompareFromHome7()      //No need to enter searching product
    {
        await this.compareFromHome.waitFor({state:'visible'});
        await this.compareFromHome.click();
        await this.productCompareFromLink.click();
        await this.productDetails.isVisible();
    }

    async goToProductComparePage8()  
    {
        await this.searchItems.inputSearchProduct("iMac");
        await this.searchItems.clickOnSearchButton();
        await this.productCompare.waitFor({state:'visible'});
        await this.productCompare.click();
        await this.productComparison.isVisible();
    }
    async commonForCompareLinkFromHome()
    {
        await this.desktopsMenu.waitFor({state:'visible'});
        await this.desktopsMenu.click();
        await this.showAllDesktops.click();
        await this.productCompare.click();
    }

    async verifyDesktopsMenu9()
    {
        await this.commonForCompareLinkFromHome();
        await this.productComparison.isVisible();
    }

    async verifyDesktopsWithNoProductAdded10()
    {
        await this.commonForCompareLinkFromHome();
        await this.noProductChoose.isVisible();
    }

    async verifyContinueOnCompare11()
    {
        await this.commonForCompareLinkFromHome();
        await this.continueOnNoProduct.click();
        await this.featuredAfterContinue.isVisible();
    }
    async verifyBreadcrumb12()
    {
        await this.commonForCompareLinkFromHome();
        await this.productComparisonBreadcrumb.click();
        await this.productComparison.isVisible();
        await this.homeBreadcrumb.click();
        await this.featuredAfterContinue.isVisible();      //for confirming homepage
    }

    async verifyProductNameInLink13()
    {
        await this.searchItems.inputSearchProduct("iMac");
        await this.searchItems.clickOnSearchButton();
        await this.clickOnProduct.waitFor({state:'visible'});
        await this.clickOnProduct.click();
        await this.clickOncompare.click();
        await this.productNameInLink.waitFor({state:'visible'});
        await this.productNameInLink.click();
        await this.page.goBack();
        await this.productCompareFromLink.click();
        await this.productDetails.isVisible();
    }

    async verifyCompareOneProduct14()
    {
        await this.verifyclickOnProductCase1();
        await this.addToCartButton.isVisible();
        await this.removeButton.isVisible();
    }

    async verifyCompareTwoProduct15()
    {
        await this.searchItems.inputSearchProduct("iMac");
        await this.searchItems.clickOnSearchButton();
        await this.comPareButtonAfterSearch.click();

        await this.searchItems.inputSearchProduct("iPhone");
        await this.searchItems.clickOnSearchButton();
        await this.comPareButtonAfterSearch.click();

        await this.productCompareFromLink.click();
        await this.product1iMac.isVisible();
        await this.product2iPhone.isVisible();
    }

    async verifySameProductTwice16()
    {
        await this.searchItems.inputSearchProduct("iMac");
        await this.searchItems.clickOnSearchButton();
        await this.comPareButtonAfterSearch.click();

        await this.searchItems.inputSearchProduct("iMac");
        await this.searchItems.clickOnSearchButton();
        await this.comPareButtonAfterSearch.click();

        await this.productCompareFromLink.click();
        await this.product1iMac.isVisible();
    }

    async verify3Product17()
    {

        await this.searchItems.inputSearchProduct("iMac");
        await this.searchItems.clickOnSearchButton();
        await this.comPareButtonAfterSearch.click();

        await this.searchItems.inputSearchProduct("iPhone");
        await this.searchItems.clickOnSearchButton();
        await this.comPareButtonAfterSearch.click();

        await this.searchItems.inputSearchProduct("MacBook Air");
        await this.searchItems.clickOnSearchButton();
        await this.comPareButtonAfterSearch.click();

        await this.product1iMac.isVisible();
        await this.product2iPhone.isVisible();
        await this.product3MacBookAir.isVisible();
    }
    async verify4Product18()
    {
        await this.searchItems.inputSearchProduct("iMac");
        await this.searchItems.clickOnSearchButton();
        await this.comPareButtonAfterSearch.click();

        await this.searchItems.inputSearchProduct("iPhone");
        await this.searchItems.clickOnSearchButton();
        await this.comPareButtonAfterSearch.click();

        await this.searchItems.inputSearchProduct("MacBook Air");
        await this.searchItems.clickOnSearchButton();
        await this.comPareButtonAfterSearch.click();

        await this.searchItems.inputSearchProduct("MacBook");
        await this.searchItems.clickOnSearchButton();
        await this.comPareButtonAfterSearch.click();

        await this.product1iMac.isVisible();
        await this.product2iPhone.isVisible();
        await this.product3MacBookAir.isVisible();
        await this.product4MacBook.isVisible();
    }
    
}