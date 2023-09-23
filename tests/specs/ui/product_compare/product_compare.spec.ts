import {test, APIRequestContext, Page} from "@playwright/test";
import { Helper } from "../../../utility/helper";
import { CommonPage } from "../../../pages/common/common.page";
import { Product_Compare_Page } from "../../../pages/product_compare/product_compare.pge";
import { product_compareData } from "../../../testdata/ui/product_compare.data";
import { SearchPage } from "../../../pages/search/search.page";

let request: APIRequestContext;
let page : Page;
let commonPage: CommonPage;
let comparePage:Product_Compare_Page;
let searchPage : SearchPage;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    request = (await browser.newContext()).request;
    comparePage=new Product_Compare_Page(page);
    searchPage = new SearchPage(page)
    await page.goto('/demo');
});

product_compareData.forEach(data=>{
    test.describe.parallel('Automate the Product Compare functionality', () => {
        test('TC_PC_001 >> Verify adding the product for comparision from Product Display Page',async()=>{
            await comparePage.searchProductByText(data.product1)
            await comparePage.clickOnProductByTitle(data.product1)
            await comparePage.addProductsToCompareList();
            await comparePage.verifyclickOnProductCase1();
        });

        test('TC_PC_002 >>  Verify adding the product for comparision from List View of Search Results page',async()=>{
            await comparePage.verifyListViewCompare2();
        });
        test('TC_PC_003 >>  Verify adding the product for comparision from Grid View of Search Results page',async()=>{
            await comparePage.verifyGridViewCompareCase3();
        });
        test('TC_PC_004 >>  Verify adding the product for comparision from List View of Product Category or Sub Category page',async()=>{
            await comparePage.verifyComparingFromCategory4();
        });
        test('TC_PC_005 >>  Verify adding the product for comparision from Grid View of Product Category or Sub Category page',async()=>{
            await comparePage.verifyComparingFromCategory5();
        });
        test('TC_PC_006 >>  Verify adding the product for comparision from Related Product section on Product Display Page',async()=>{
            await comparePage.verifyComparingRelated6();
        });
        test('TC_PC_007 >>  Verify adding the product for comparision from Featured  section on Home Page',async()=>{
            await comparePage.verifyCompareFromHome7();
        });
        test('TC_PC_008 >>  Verify navigating to "Product Compare" page from Search results page',async()=>{
            await comparePage.goToProductComparePage8();
        });
        test('TC_PC_009 >>  Verify navigating to "Product Compare" page from Product Category page',async()=>{
            await comparePage.verifyDesktopsMenu9();
        });
        test('TC_PC_010 >>  Verify "Product Compare" page when no products are added for comparison',async()=>{
            await comparePage.verifyDesktopsWithNoProductAdded10();
        });
        test('TC_PC_011 >>  Verify  the working of "Continue" button on the "Product Compare" page',async()=>{
            await comparePage.verifyContinueOnCompare11();
        });
        test('TC_PC_012 >>  Verify the Breadcrumb that is displayed on the "Product Compare" page',async()=>{
            await comparePage.verifyBreadcrumb12();
        });
        test('TC_PC_013 >>  Verify the success message which will be displayed after adding the Products for Comparison',async()=>{
            await comparePage.verifyProductNameInLink13();
        });
        test('TC_PC_014 >>  Verify the "Product Comparison" page when only one producted is added to the page for comparison',async()=>{
            await comparePage.verifyCompareOneProduct14();
        });
        test('TC_PC_015 >>  Verify the "Product Comparison" page when only two products are added to the page for comparison',async()=>{
            await comparePage.verifyCompareTwoProduct15();
        });
        test('TC_PC_016 >>  Verify the "Product Comparison" page when the same product is added twice to the page for comparison',async()=>{
            await comparePage.verifySameProductTwice16();
        });
        test('TC_PC_017 >>  Verify the "Product Comparison" page when three products are added to the page for comparison',async()=>{
            await comparePage.verify3Product17();
        });
        test('TC_PC_018 >>  Verify the "Product Comparison" page when four products are added to the page for comparison',async()=>{
            await comparePage.verify4Product18();
        });


    });

});