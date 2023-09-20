import { test,  APIRequestContext, Page } from '@playwright/test';
import { Helper } from '../../../utility/helper';
import { LoginPage } from '../../../pages/login/login.page';
import { CommonPage } from '../../../pages/common/common.page'
import { SearchPage } from '../../../pages/search/search.page';
import { searchData } from '../../../testdata/ui/search.data';

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
    test.describe.parallel('Automate the search functionality', () => {
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
            await loginPage.inputLoginUsername(process.env.user == undefined ? "" : process.env.user);
            await loginPage.inputLoginPassword(process.env.uipassword == undefined ? "" : process.env.uipassword);
            await loginPage.clickOnLoginBtn();
            await searchPage.inputSearchProduct(data.productName2);
            await searchPage.clickOnSearchButton();
            await searchPage.verifyExistingSearchProduct();
        
        });
        test('TC_SF_005 >> Verify searching by providing a search criteria which results in mulitple products', async () => {
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
                
          });
});
});