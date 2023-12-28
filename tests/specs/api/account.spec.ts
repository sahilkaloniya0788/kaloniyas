
import { account } from '../../testdata/api/account';
import { test, expect, APIRequestContext } from '@playwright/test';
import { ApiActions } from '../../actions/apiActions';
import { AccountAPIObject } from '../../pages/api/account';
let token: string;
let request: APIRequestContext;

let accountID: string;
let contactID: any;
let applicationID: string;
let caseID: string;
let apiActions: ApiActions
let accountActions: AccountAPIObject

test.beforeAll(async ({ browser }) => {
    request = (await browser.newContext()).request;
    apiActions = new ApiActions(request);
    accountActions = new AccountAPIObject(request)
    token = await apiActions.getAccessToken();
    console.log(token)
    console.log(accountActions)

});
account.forEach(data => {
    test.describe.serial('TestData Create Registration Case', () => {
        test('Get Account ID using Name', async () => {
            accountID = await accountActions.getAccountIdByName(token, 'Mohit', 'Account')
            //expect(accountID).toBeDefined();
            console.log('Your AccountID is ' + accountID)
        });
        test('I create a account', async () => {
            accountID = await accountActions.accountCreation(token);
            expect(accountID).not.toBeUndefined();
            console.log('AccountID' + accountID);
        });
        test('I validate a account', async () => {
            contactID = await accountActions.accountValidation(token, accountID);
            console.log("ContactID " + contactID);
        });
        test('I create a application', async () => {
            applicationID = await accountActions.applicationCreation(token, accountID);
            expect(applicationID).not.toBeUndefined();
            console.log('ApplicationID' + applicationID);
        });
        test('I validate a application', async () => {
            await accountActions.applicationValidation(token, applicationID);
        });
        test('I create a case', async () => {
            caseID = await accountActions.caseCreation(token, accountID, contactID);
            expect(caseID).not.toBeUndefined();
            console.log("CaseID " + caseID);
        });
        test('I validate a case', async () => {
            await accountActions.caseValidation(token, caseID);
        });
    });
});



