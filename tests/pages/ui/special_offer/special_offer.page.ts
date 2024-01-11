import { Locator, Page, test } from "@playwright/test";
import { textChangeRangeIsUnchanged } from "typescript";

export class Special_Offer{
    readonly page: Page;
    readonly specialFooterBtn: Locator
    readonly siteMapFooterBtn: Locator
    readonly specialOfferBtnInSiteMap: Locator
    readonly appleCinemaProduct: Locator
    readonly canonCameraProduct: Locator
    readonly listViewBtn: Locator
    readonly gridViewBtn: Locator
    readonly productCompareLink: Locator
    readonly sortByDropdown: Locator
    readonly showNumberDropdown: Locator
    readonly canonCameraAddtoCartBtn: Locator
    readonly applecinemawishlistBtn: Locator
    readonly wishlistSuccessMsg: Locator
    readonly applecinemacomparetheproductBtn: Locator
    readonly productcomparisonSuccessMsg: Locator
    readonly specialofferbreadcrumb: Locator
    readonly specialofferPageHeading: Locator

    constructor(page: Page) { 
        this.specialFooterBtn =  page.locator(`//a[text()='Specials']`)
        this.siteMapFooterBtn = page.locator(`//a[text()='Site Map']`)
        this.specialOfferBtnInSiteMap = page.locator(`//a[text()='Special Offers']`)
        this.appleCinemaProduct = page.locator(`//a[text()='Apple Cinema 30"']`)
        this.canonCameraProduct = page.locator(`//a[text()='Canon EOS 5D']`)
        this.listViewBtn = page.locator(`//button[contains(@id,"list-view")]`)
        this.gridViewBtn = page.locator(`//button[contains(@id,"grid-view")]`)
        this.productCompareLink = page.locator(`//a[text()='Product Compare (0)']`)
        this.sortByDropdown = page.locator(`(//select[contains(@onchange,"location = this.value;")])[1]`)
        this.showNumberDropdown = page.locator(`(//select[contains(@onchange,"location = this.value;")])[2]`)
        this.canonCameraAddtoCartBtn = page.locator(`(//span[text()='Add to Cart'])[2]`)
        this.applecinemawishlistBtn = page.locator(`(//button[contains(@data-original-title,"Add to Wish List")])[1]`)
        this.wishlistSuccessMsg = page.locator(`//div[@class="alert alert-success alert-dismissible"]`)
        this.applecinemacomparetheproductBtn = page.locator(`(//button[contains(@data-original-title,"Compare this Product")])[1]`)
        this.productcomparisonSuccessMsg = page.locator(`//div[contains(@class,"alert alert-success alert-dismissible")]`)
        this.specialofferbreadcrumb = page.locator(`//a[text()='Special Offers']`)
        this.specialofferPageHeading = page.locator(`//h2[text()='Special Offers']`)
    }
    async verifyingSpecialOfferFooterLinkBtn(){
        await this.specialFooterBtn.waitFor({state: 'visible'})
        await this.specialFooterBtn.click()
    }
    async navigatingToSpecialOfferThroughSiteMap(){
        await this.siteMapFooterBtn.waitFor({state: 'visible'})
        await this.siteMapFooterBtn.click()
        await this.specialOfferBtnInSiteMap.waitFor({state: 'visible'})
        await this.specialOfferBtnInSiteMap.click()
    }
    async verifyingProductsOnSpecialOfferPag(){
        await this.specialFooterBtn.waitFor({state: 'visible'})
        await this.specialFooterBtn.click()
        await this.appleCinemaProduct.waitFor({state: 'visible'})
        await this.appleCinemaProduct.isVisible()
        await this.canonCameraProduct.waitFor({state: 'visible'})
        await this.canonCameraProduct.click()
    }
    async verifyingSpecialOfferProductsInListVeiw(){
        await this.specialFooterBtn.waitFor({state: 'visible'})
        await this.specialFooterBtn.click()
        await this.listViewBtn.waitFor({state: 'visible'})
        await this.listViewBtn.click()
    }
    async verifyingSpecialOfferProductsInGridVeiw(){
        await this.specialFooterBtn.waitFor({state: 'visible'})
        await this.specialFooterBtn.click()
        await this.gridViewBtn.waitFor({state: 'visible'})
        await this.gridViewBtn.click()
    }
    async navigatingToProductComparisonPageFromSpecialPage(){
        await this.specialFooterBtn.waitFor({state: 'visible'})
        await this.specialFooterBtn.click()
        await this.productCompareLink.waitFor({state: 'visible'})
        await this.productCompareLink.click()
    }
    async sortingOutTheProductInSpecialPage(){
        await this.specialFooterBtn.waitFor({state: 'visible'})
        await this.specialFooterBtn.click()
        await this.sortByDropdown.waitFor({state: 'visible'})
        await this.sortByDropdown.selectOption("Rating (Lowest)")
    }
    async verifyingNumberOfProductUsingShowField(){
        await this.specialFooterBtn.waitFor({state: 'visible'})
        await this.specialFooterBtn.click()
        await this.showNumberDropdown.waitFor({state: 'visible'})
        await this.showNumberDropdown.selectOption("50")
    }
    async verifyingAddingToCartFromSpecialOfferPage(){
        await this.specialFooterBtn.waitFor({state: 'visible'})
        await this.specialFooterBtn.click()
        await this.canonCameraAddtoCartBtn.waitFor({state: 'visible'})
        await this.canonCameraAddtoCartBtn.click()
    }
    async verifyingAddingToWishlistFromSpecialPage(){
        await this.specialFooterBtn.waitFor({state: 'visible'})
        await this.specialFooterBtn.click()
        await this.applecinemawishlistBtn.waitFor({state: 'visible'})
        await this.applecinemawishlistBtn.click()
        await this.wishlistSuccessMsg.waitFor({state: 'visible'})
        await this.wishlistSuccessMsg.isVisible()
    }
    async verifyAddingTheProductForComparison(){
        await this.specialFooterBtn.waitFor({state: 'visible'})
        await this.specialFooterBtn.click()
        await this.applecinemacomparetheproductBtn.waitFor({state: 'visible'})
        await this.applecinemacomparetheproductBtn.click()
        await this.productcomparisonSuccessMsg.waitFor({state: 'visible'})
        await this.productcomparisonSuccessMsg.isVisible()
    }
    async navigatingToProductDisplayPageFromSpecialPage(){
        await this.specialFooterBtn.waitFor({state: 'visible'})
        await this.specialFooterBtn.click()
        await this.appleCinemaProduct.waitFor({state: 'visible'})
        await this.appleCinemaProduct.click()
    }
    async verifyingBreadCrumbOfSpecialOffer(){
        await this.specialFooterBtn.waitFor({state: 'visible'})
        await this.specialFooterBtn.click()
        await this.specialofferbreadcrumb.waitFor({state: 'visible'})
        await this.specialofferbreadcrumb.isVisible()
    }
    async verifyingPageHeading(){
        await this.specialFooterBtn.waitFor({state: 'visible'})
        await this.specialFooterBtn.click()
        await this.specialofferPageHeading.waitFor({state: 'visible'})
        await this.specialofferPageHeading.isVisible()
    }
}