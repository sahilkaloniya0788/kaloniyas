import { Locator, Page, expect, test } from "@playwright/test";
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
    readonly cartPage:Locator;
    readonly macbookCompareButton:Locator;

    constructor(page: Page) { 
        this.page=page;
        this.clickOncompare=page.locator("//body/div[@id='product-product']/div[1]/div[1]/div[1]/div[2]/div[1]/button[2]");
        this.productCompareFromLink=page.locator("//a[contains(text(),'product comparison')]");
        this.productDetails=page.locator("//strong[contains(text(),'Product Details')]");

        this.gridViewButton=page.locator("//button[@id='grid-view']");
        this.listViewButton=page.locator("//button[@id='list-view']");
        this.searchInput = page.getByPlaceholder('Search');
        this.searchButton = page.locator(`//div[@id='search']//button`);
        this.categorySelect=page.locator("//body/div[@id='product-search']/div[1]/div[1]/div[1]/div[2]/select[1]");
        this.subCategoryProduct=page.locator("//option[contains(text(),'Desktops')]");
        this.compareProductButton=page.locator("//button[@data-original-title='Compare this Product']");
        this.subcategoryCheckbox=page.locator("//body/div[@id='product-search']/div[1]/div[1]/div[1]/div[3]/label[1]");
       // this.searchButton=page.getByRole('button',{name:'Search'});
        this.compareFromRelated=page.locator("//*[@class='col-xs-6 col-sm-3']//button[@data-original-title='Compare this Product']");
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
        this.removeButton=page.locator("//a[contains(text(),'Remove')]");
        this.comPareButtonAfterSearch=page.locator("//body/div[@id='product-search']/div[1]/div[1]/div[3]/div[1]/div[1]/div[2]/div[2]/button[3]");
        this.product1iMac=page.locator("//strong[contains(text(),'iMac')]");
        this.product2iPhone=page.locator("//strong[contains(text(),'iPhone')]");
        this.product3MacBookAir=page.locator("//strong[contains(text(),'MacBook Air')]");
        this.product4MacBook=page.locator("//strong[contains(text(),'MacBook')]");
        this.cartPage=page.locator("//h2[contains(text(),'What would you like to do next?')]");
        this.macbookCompareButton=page.locator("//body/div[@id='product-search']/div[1]/div[1]/div[3]/div[1]/div[1]/div[2]/div[2]/button[3]");



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
        
        await this.clickOncompare.click();
        await this.productCompareFromLink.click();
        await this.productDetails.isVisible();
    }
    async clickOnProductByTitle(productName : string){
        const productNameTitle = await this.page.locator(`//a[contains(text(),'${productName}')]`)
        productNameTitle.waitFor({state:'visible'})
        productNameTitle.click()
}
    async addProductsToCompareListAfterClickOnProduct()
    {
        const compareButton=await this.page.locator("//div[@class='col-sm-4']//button[@data-original-title='Compare this Product']");
        await compareButton.waitFor({state:'visible'});
        await compareButton.click();
    }
    async addProductsToCompareListBeforeClickOnProduct()
    {
        const compareButton=await this.page.locator("//button[@data-original-title='Compare this Product']");
        await compareButton.waitFor({state:'visible'});
        await compareButton.click();
    }
    async clickOnComparisonFromMessage()
    {
        await this.productCompareFromLink.waitFor({state:'visible'});
        await this.productCompareFromLink.click();
    }
    async clickOnAddToCartAndShoppingCart()
    {
        const addCart=await this.page.locator("//input[@type='button' and @value='Add to Cart']");
        await addCart.waitFor({state:'visible'});
        await addCart.click();

        const shoppingCart=await this.page.locator("//a[contains(text(),'shopping cart')]");
        await shoppingCart.waitFor({state:'visible'});
        await shoppingCart.click();

        await this.cartPage.isVisible();
    }
    async verifyRemovingProduct()
    {
        await this.removeButton.waitFor({state:'visible'});
        await this.removeButton.click();
        await this.noProductChoose.isVisible();
    }
    async verifyPageTitle()
    {
        const pageTitle = await this.page.title();
        expect(pageTitle).toBe('Product Comparison');
    }
    async verifyPageHeading()
    {
        const pageHeading = await this.page.$eval('h1', (heading) => heading.textContent);
       await expect(pageHeading).toBe("Qafox.com");
       
    }
    async verifyPageURL()
    {
        const pageURL = this.page.url();
    await expect(pageURL).toBe('https://tutorialsninja.com/demo/index.php?route=product/compare');
    }

    async verifyUI()
    {
        await this.productDetails.isVisible();
    }
    async verifyclickOnProductCommon()
    {
        
        await this.compareProductButton.click();
        await this.productCompareFromLink.click();
        await this.productDetails.isVisible();
    }

    async verifyListViewCompare2()
    {
        
        await this.listViewButton.waitFor({state:'visible'});
        await this.listViewButton.click();
        await this.verifyclickOnProductCommon();

    }
    
    async verifyGridViewCompareCase3()
    {
        await this.gridViewButton.waitFor({state:'visible'});
        await this.gridViewButton.click();
        await this.verifyclickOnProductCommon();
    }
    async verifyComparingFromCategory4()
    {
        await this.categorySelect.waitFor({state:'visible'});
        await this.categorySelect.click();
        await this.subCategoryProduct.waitFor({state:'visible'})
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
        
        await this.clickOncompare.click();
        // await this.productNameInLink.waitFor({state:'visible'});
        // await this.productNameInLink.click();
        // await this.page.goBack();
        await this.productCompareFromLink.waitFor({state:'visible'});

        await this.productCompareFromLink.click();
        await this.productDetails.isVisible();
    }

    async verifyCompareOneProduct14()
    {
        await this.verifyclickOnProductCase1();
        await this.addToCartButton.isVisible();
        await this.removeButton.isVisible();
    }

    async clickOnCompareAfterSearch()
    {
        
        await this.compareProductButton.click();
    }
        
       async checkForTwoProducts()
       {
        await this.productCompareFromLink.click();
        await this.product1iMac.isVisible();
        await this.product2iPhone.isVisible();
       }
    

    async verifySameProductTwice16()
    {
        await this.productCompareFromLink.click();
        await this.product1iMac.isVisible();
    }

    async verify3Product17()
    {
        await this.product1iMac.isVisible();
        await this.product2iPhone.isVisible();
        await this.product3MacBookAir.isVisible();
    }
    async verify4Product18()
    {
        await this.product1iMac.isVisible();
        await this.product2iPhone.isVisible();
        await this.product3MacBookAir.isVisible();
        await this.product4MacBook.isVisible();
    }

    // case 19 starts

    async checkForMacbook()
    {
        await this.macbookCompareButton.waitFor({state:'visible'});
        await this.macbookCompareButton.click();
    }
    async checkFor5Products(prod:string)
    {
        await this.page.locator(`//strong[text()='${prod}']`).isVisible();
        
    }
    async clickOnCompareFromMessage()
    {
        await this.productCompareFromLink.waitFor({state:'visible'});
        await this.productCompareFromLink.click();
    }
    
}