import { test,  APIRequestContext, Page } from '@playwright/test';
import { Helper } from "../../../utility/helper";
import { Youtube } from "../../../pages/ui/youtube/youtube.page";

let request : APIRequestContext
let page: Page
let youtube: Youtube


test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    youtube = new Youtube(page)
    request = (await browser.newContext()).request;
    await page.goto('/');
    
});

test.describe.parallel('Automate the functionality of youtube', async() => {
    test('TC_YT_001 >>> verify the logo of youtube homepage.', async() => {
        await youtube.verifyingtheLogoOfYoutube()
        await Helper.delay(3000)

    })








})
