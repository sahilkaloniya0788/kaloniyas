
import { account } from '../../testdata/api/account';
import { test, expect, APIRequestContext } from '@playwright/test';
import { ApiActions } from '../../actions/apiActions';
let token: string;
let request: APIRequestContext;
let apiActions: ApiActions;
let accountID: string;
let contactID: string;
let applicationID: string;
let caseID: string;

test.beforeAll(async ({ browser }) => {
    request = (await browser.newContext()).request;
    apiActions = new ApiActions(request);
    token = await apiActions.getAccessToken();
});
account.forEach(data => {
    test.describe.serial('TestData Create Registration Case', () => {
        test('I create a account', async () => {
            accountID = await apiActions.accountCreation(token);
            expect(accountID).not.toBeUndefined();
            console.log('AccountID' + accountID);
        });
        test('I validate a account', async () => {
            contactID = await apiActions.accountValidation(token, accountID);
            console.log("ContactID " + contactID);
        });
        test('I create a application', async () => {
            applicationID = await apiActions.applicationCreation(token, accountID);
            expect(applicationID).not.toBeUndefined();
            console.log('ApplicationID' + applicationID);
        });
        test('I validate a application', async () => {
            await apiActions.applicationValidation(token, applicationID);
        });
        test('I create a case', async () => {
            caseID = await apiActions.caseCreation(token, accountID, contactID);
            expect(caseID).not.toBeUndefined();
            console.log("CaseID " + caseID);
        });
        test('I validate a case', async () => {
            await apiActions.caseValidation(token, caseID);
        });
    });
});



