import { Helper } from '../../utility/helper';
import { url } from '../../config/api';
import { APIRequestContext, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { defaultResponse } from '../../models/response/defaultResponse';
import { AccountRequest } from '../../models/request/account';
import { AccountResponse } from '../../models/response/account';
import { ApplicationRequest } from '../../models/request/application';
import { CaseRequest } from '../../models/request/case';
import { CaseResponse } from '../../models/response/case';
import { ApplicationResponse } from '../../models/response/application';
import { QueryResponse, Record } from '../../models/response/query';
import { ApiActions } from '../../actions/apiActions';

let accountRequest: AccountRequest;
let accountResponse: AccountResponse;
let applicationRequest: ApplicationRequest;
let applicationResponse: ApplicationResponse;
let caseRequest: CaseRequest;
let caseResponse: CaseResponse;
let queryResponse: QueryResponse;
let apiActions: ApiActions



export class AccountAPIObject {

    readonly request: APIRequestContext;
    constructor(request: APIRequestContext) {
        this.request = request;
        apiActions = new ApiActions(request)
    }
    async getAccountIdByName(accessToken: string, searchName: string, objectName: string): Promise<string> {
        const response = await apiActions.requestGet(`${url.query}?q=SELECT+id+FROM+${objectName}+where+Name='${searchName}'`, accessToken);
        expect(response.status()).toEqual(200);
        queryResponse = await response.json();
        expect(queryResponse.totalSize).toBeGreaterThan(0);
        const firstRecord = queryResponse.records[0];
        if (firstRecord && firstRecord.Id) {
            return firstRecord.Id;
        } else {
            console.warn('Account ID is missing or undefined in the response.');
            throw new Error('Account ID not found in the response.');
        }

    }

    async accountCreation(accessToken: string) {
        const accountString = fs.readFileSync(path.resolve(__dirname, '/Users/mohitjangra/Documents/VS Code/Aethereus/learnPlaywright2023Aethereus/tests/models/request/contact.json'), 'utf8');
        accountRequest = JSON.parse(accountString);
        accountRequest.Email_c = "Automation" + Helper.uniqueNumbers();
        accountRequest.FirstName = "Automation" + Helper.uniqueNumbers();
        accountRequest.Login_User_ID_pc = "NameAuto" + Helper.uniqueNumbers();
        const response = await apiActions.requestPut(url.account, accessToken, JSON.stringify(accountRequest));
        expect(response.status()).toEqual(200);
        const defaultResponse: defaultResponse = await response.json();
        return defaultResponse.id;
    }
    async accountValidation(accessToken: string, accountID: string) {
        const response = await apiActions.requestGet(`${url.account}/${accountID}`, accessToken);
        expect(response.status()).toEqual(200);
        accountResponse = await response.json();
        Helper.compareResponseValues(accountRequest, accountResponse);
        return accountResponse.PersonContactId;
    }
    async applicationCreation(accessToken: string, accountID: string) {
        const applicationString = fs.readFileSync(path.resolve(__dirname, '../testdata/api/individualApplication.json'), 'utf8');
        applicationRequest = JSON.parse(applicationString);
        applicationRequest.AccountId = accountID;
        applicationRequest.AppliedDate = await Helper.currentDateYYYYMMDDHHmmss() + '.000 + 0000';
        const response = await apiActions.requestPut(url.application, accessToken, JSON.stringify(applicationRequest));
        expect(response.status()).toEqual(281);
        const defaultResponse: defaultResponse = await response.json();
        return defaultResponse.id;
    }
    async applicationValidation(accessToken: string, applicationID: string) {
        const response = await apiActions.requestGet(`${url.application}/${applicationID}`, accessToken);
        expect(response.status()).toEqual(200);
        applicationResponse = await response.json();
        Helper.compareResponseValues(applicationRequest, applicationResponse);
    }
    async caseCreation(accessToken: string, accountID: string, contactID: string) {
        const caseString = fs.readFileSync(path.resolve(__dirname, '../testdata/api/registrationCase.json'), 'utf8');
        caseRequest = JSON.parse(caseString);
        caseRequest.AccountId = accountID;
        caseRequest.ContactId = contactID;
        const response = await apiActions.requestPut(url.case, accessToken, JSON.stringify(caseRequest));
        expect(response.status()).toEqual(201);
        const defaultResponse: defaultResponse = await response.json();
        return defaultResponse.id;
    }
    async caseValidation(accessToken: string, caseID: string) {
        const response = await apiActions.requestGet(`${url.case}/${caseID}`, accessToken);
        expect(response.status()).toEqual(200);
        caseResponse = await response.json();
        Helper.compareResponseValues(caseRequest, caseResponse);
    }
    async caseStatusUpdate(accessToken: string, caseID: string, status: string) {
        const caseRequest = {
            "Status": status
        };
        const response = await apiActions.requestPatch(`${url.case}/${caseID}`, accessToken, JSON.stringify(caseRequest));
        expect(response.status()).toEqual(284);
    }
    async deleteAllObjects(accessToken: string, caseID: string, objectsTobeDeleted: string, searchField: string, objectUrl: string) {
        let response = await apiActions.requestGet(`${url.query}?q=SELECT+id+FROM+${objectsTobeDeleted}+where+${searchField}='${caseID}'`, accessToken);
        expect(response.status()).toEqual(200);
        queryResponse = await response.json();
        let record: Record;
        for (record of queryResponse.records)
            response = await apiActions.requestDelete(`${objectUrl}/${record.Id}`, accessToken);
        expect(response.status()).toEqual(204);
    }
    async objectsNotExistValidation(accessToken: string, caseID: string, objectsDeleted: string, searchField: string) {
        const response = await apiActions.requestGet(`${url.query}?q=SELECT+id+FROM${objectsDeleted}+where+${searchField}='${caseID}'`, accessToken);
        expect(response.status()).toEqual(200);
        queryResponse = await response.json();
        expect(queryResponse.totalSize).toEqual(0);
    }
    async updatePARLastAccessDate(accessToken: string, parID: string) {
        const parBody = {
            "Last_Access_Date_c": await Helper.currentDateYYYYMMDDHHmmss() + '.000+0000'
        };
        const response = await apiActions.requestPatch(`${url.preliminaryApplication}/${parID}`, accessToken, JSON.stringify(parBody));
        expect(response.status()).toEqual(204);
    }
    async contactCreation(accessToken: string) {
        try {
            const contactString = fs.readFileSync(path.resolve(__dirname, '../testdata/api/contact.json'), 'utf8');
            const contactRequest = JSON.parse(contactString);

            contactRequest.email = "Automation" + Helper.uniqueNumbers() + "@gmail.com";
            contactRequest.fullName = "Mohit Jangra" + Helper.uniqueNumbers();
            contactRequest.prospectActivityId = "ATM" + Helper.uniqueNumbers();

            const response = await apiActions.requestPut(url.contact, accessToken, JSON.stringify(contactRequest));

            console.log('Response Status:', response.status());
            const defaultResponse: defaultResponse = await response.json();
            return defaultResponse.id;
        }
        catch (error: any) {
            console.error('Error in contactCreation:', error);
            // Handle or throw the error as needed
            throw error;
        }
    }

}
