import { test,  APIRequestContext, Page } from '@playwright/test';
import { Demowebshop } from '../../../pages/ui/demowebshop/demowebshop.page';
import { Helper } from '../../../utility/helper';

let request: APIRequestContext;
let page : Page;
let demowebshop : Demowebshop
 

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    demowebshop = new Demowebshop(page)
    request = (await browser.newContext()).request;
    await page.goto('/');
    
});

test.describe.parallel('Automate the demo web shop site', async() => {

    test('TC_DWS_001 >>> verify the home page heading', async() => {
        await demowebshop.verifyinghomepageheading()
        await Helper.delay(5000)
    })












})





