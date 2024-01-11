import { test,  APIRequestContext, Page } from '@playwright/test';
import { Helper } from '../../../utility/helper';
import { searchData } from '../../../testdata/ui/search.data'
import { LoginPage } from '../../../pages/ui/login/login.page'
import { CommonPage } from '../../../pages/ui/Common/common.page'
import { SearchPage } from '../../../pages/ui/search/search.page';

let request: APIRequestContext;
let page : Page;
let loginPage: LoginPage;
let commonPage: CommonPage;
let searchPage: SearchPage;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    request = (await browser.newContext()).request;
    loginPage = new LoginPage(page);
    commonPage = new CommonPage(page);
    searchPage=new SearchPage(page);
    await page.goto('/demo');
    await commonPage.pageLoadCheck();
    
});
searchData.forEach(data => {
    test.describe.parallel('Automate the search functionality', async() => {
        test('TC_SF_001 >> Verify searching with an existing Product Name', async () => {
            await searchPage.inputSearchProduct(data.productName);
            await searchPage.clickOnSearchButton();
            await searchPage.verifyExistingSearchProduct();
           
        });
        test('TC_SF_002 >> Verify searching with a non existing Product Name', async () => {
            await searchPage.inputSearchProduct(Helper.uniqueNumbers());
            await searchPage.clickOnSearchButton();
            await searchPage.verifyNonExistingSearchProduct();
        });
        test('TC_SF_003 >>Verify searching without providing any Product Name', async () => {
            await searchPage.inputSearchProduct('');
            await searchPage.clickOnSearchButton();
        });
        
        test('TC_SF_004 >> Verifty searching for a product after login to the Application', async () => {
            await loginPage.GotoLoginPage()
            await loginPage.inputLoginUsername(process.env.user == undefined ? "" : process.env.user);
            await loginPage.inputLoginPassword(process.env.uipassword == undefined ? "" : process.env.uipassword);
            await loginPage.clickOnLoginBtn();
            await searchPage.inputSearchProduct(data.productName2);
            await searchPage.clickOnSearchButton();
            await searchPage.verifyExistingSearchProduct();
        
        });
        test('TC_SF_005 >> Verify searching by providing a search criteria which results in mulitple products', async () => {
            await loginPage.GotoLoginPage()
            await loginPage.inputLoginUsername(process.env.user == undefined ? "" : process.env.user);
            await loginPage.inputLoginPassword(process.env.uipassword == undefined ? "" : process.env.uipassword);
            await loginPage.clickOnLoginBtn();
            await searchPage.inputSearchProduct(data.productName2);
            await searchPage.clickOnSearchButton();
        
        });
        test('TC_SF_006 >> Verify all the fields in the Search functionality and Search page have placeholders', async () => {
            await searchPage.verifySearchPlaceholder();
            });

        test('TC_SF_007 >>Verify searching using Search Criteria field', async () => {
            await searchPage.searchByCriteria()
                
          });
        
        test('TC_SF_008 >>> Verify Search using the text from the product description', async() => {
            await searchPage.searchUsingTextFromProductDiscription()
        })  


        test('TC_SF_009 >>> Verify Search by selecting the category of product', async() => {
            await searchPage.searchByProductCategory('Mac')

        })

        test('TC_SF_0012 >>> Verify List and Grid views when only one Product is displayed in the search results', async() => {
            await searchPage.verifyingListVeiwOfProducts()
            await searchPage.verifyingGridVeiwOfProducts()
        })

        test('TC_SF_0013 >>> Verify navigating to Product Compare Page from Search Results page', async() => {
            await searchPage.NavigatingToProductComparePage()
        })

        test("TC_SF_0016 >>> Verify 'Search' textbox field and the button having search icon are displayed on al(l the page of the Application", async() => {
            await searchPage.verifyingSearchBtnAndFieldDisplayedInEachPage()

        })

        test('TC_SF_0017 >>> Verify navigating to Search page from the Site Map page', async() => {
            await searchPage.navigatingToSearchPageFromSiteMap()

        })

        test("TC_SF_0018 >>> Verify Breadcrumb of the 'Search' page", async() => {
            await searchPage.verifyingBreadcrumbOption()
        })

        test("TC_SF_0020 >>> Verify Page Heading, Page URL and Page Title of the 'Search' page", async() => {
            await searchPage.verifyingPageHeadingAndPageURL()

        })



        

























});
});