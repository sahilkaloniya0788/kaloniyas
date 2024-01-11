import { Locator, Page, test } from "@playwright/test";
import { Helper } from "../../../utility/helper";
import { CommonPage } from "../Common/common.page";

export class Add_To_Cart_Page{
    readonly page: Page;
    readonly addtoCartbtn : Locator
    readonly successMsgForAddedToCart: Locator
    readonly iMacWishlistBtn: Locator
    readonly wishlistLink: Locator
    readonly wishlistAddToCartBtn: Locator
    readonly iphoneAddToCartBtn: Locator
    readonly canonCameraAddToCartBtn: Locator
    readonly MacbookCompareBtn: Locator
    readonly productComparisonPageLink: Locator
    readonly AddToCartBtnInProductComparisonPage: Locator
    
    constructor(page: Page) { 
        this.addtoCartbtn = page.locator(`//span[contains(text(),'Add to Cart')]`)
        this.successMsgForAddedToCart = page.locator(`//div[contains(@class,"alert alert-success alert-dismissible")]`)
        this.iMacWishlistBtn = page.locator(`//button[contains(@onclick,"wishlist.add('41');")]`)
        this.wishlistLink = page.locator(`//a[text()='wish list']`)
        this.wishlistAddToCartBtn = page.locator(`//button[contains(@onclick,"cart.add('41');")]`)
        this.iphoneAddToCartBtn = page.locator(`//button[contains(@onclick,"cart.add('40');")]`)
        this.canonCameraAddToCartBtn = page.locator(`//button[contains(@onclick,"cart.add('30');")]`)
        this.MacbookCompareBtn = page.locator(`//button[contains(@onclick,"compare.add('43');")]`)
        this.productComparisonPageLink = page.locator(`//a[contains(text(),'product comparison')]`)
        this.AddToCartBtnInProductComparisonPage = page.locator(`//input[contains(@onclick,"cart.add('43', '1');")]`)

    }

    async clickOnAddToCartButton() {
        await this.addtoCartbtn.waitFor({ state: 'visible' })
        await this.addtoCartbtn.click()
        
    }
    async verifyAddToCartProductSuccessMsgIsVisible() {
        await this.successMsgForAddedToCart.isVisible()
        
    }

    async addingProductToWishlist(){
        await this.iMacWishlistBtn.waitFor({state: 'visible'})
        await this.iMacWishlistBtn.click()
        
        

    }
    async navigatingToWishlistPage(){
        await this.wishlistLink.click()
       
    }

    async addingProductToCartFromWishlistPage(){
        await this.wishlistAddToCartBtn.waitFor({state: 'visible'})
        await this.wishlistAddToCartBtn.click()
    }
    async clickOnShppingCartLinkUnderMsg() {
        
    }


    async verifyingAddingToCartFromProductDisplayPage(){
        await this.iphoneAddToCartBtn.waitFor({state: 'visible'})
        await this.iphoneAddToCartBtn.click()
        await this.successMsgForAddedToCart.isVisible()
        
    }

    async verifyingAddingToCartFromProductFeaturedPage(){
        const elementIsVisibleOnUI = async () => {
            await this.canonCameraAddToCartBtn.waitFor({state: 'visible'});
        };
        await Helper.retry(elementIsVisibleOnUI)
        await this.canonCameraAddToCartBtn.click()
        await this.successMsgForAddedToCart.isVisible()
    }

    async AddingProductFromComparisonPage(){
        await this.MacbookCompareBtn.waitFor({state: 'visible'})
        await this.MacbookCompareBtn.click()
        await this.productComparisonPageLink.waitFor({state: 'visible'})
        await this.productComparisonPageLink.click()
        await this.AddToCartBtnInProductComparisonPage.waitFor({state: 'visible'})
        await this.AddToCartBtnInProductComparisonPage.click()
        await this.successMsgForAddedToCart.isVisible()

    }





















    
}