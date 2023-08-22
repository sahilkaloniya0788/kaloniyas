import { Helper } from '../utility/helper';
import { url } from '../config/api';
import { APIRequestContext, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { defaultResponse } from '../models/response/defaultResponse';
import { AccountRequest } from '../models/request/account';
import { AccountResponse } from '../models/response/account';
import { ApplicationRequest } from '../models/request/application';
import { CaseRequest } from '../models/request/case';
import { CaseResponse } from '../models/response/case';
import { TokenResponse } from '../models/response/tokenResponse';
import { Passcode } from '../models/response/passcode';
import { ApplicationResponse } from '../models/response/application';
import { QueryResponse, Record } from '../models/response/query';
let accountRequest: AccountRequest;
let accountResponse: AccountResponse;
let applicationRequest: ApplicationRequest;
let applicationResponse: ApplicationResponse;
let caseRequest: CaseRequest;
let caseResponse: CaseResponse;
let queryResponse: QueryResponse;

export class ApiActions {
    readonly request: APIRequestContext;
    constructor(request: APIRequestContext) {
        this.request = request;
    }
    async accountCreation(accessToken: string) {
        const accountString = fs.readFileSync(path.resolve(__dirname, '../testdata/api/personAccount.json'), 'utf8');
        accountRequest = JSON.parse(accountString);
        accountRequest.LastName = "Last" + Helper.uniqueNumbers();
        accountRequest.FirstName = "First" + Helper.uniqueNumbers();
        accountRequest.Login_User_ID_pc = "NameAuto" + Helper.uniqueNumbers();
        const response = await this.requestPost(url.account, accessToken, JSON.stringify(accountRequest));
        expect(response.status()).toEqual(201);
        const defaultResponse: defaultResponse = await response.json();
        return defaultResponse.id;
    }
    async accountValidation(accessToken: string, accountID: string) {
        const response = await this.requestGet(`${url.account}/${accountID}`, accessToken);
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
        const response = await this.requestPost(url.application, accessToken, JSON.stringify(applicationRequest));
        expect(response.status()).toEqual(281);
        const defaultResponse: defaultResponse = await response.json();
        return defaultResponse.id;
    }
    async applicationValidation(accessToken: string, applicationID: string) {
        const response = await this.requestGet(`${url.application}/${applicationID}`, accessToken);
        expect(response.status()).toEqual(200);
        applicationResponse = await response.json();
        Helper.compareResponseValues(applicationRequest, applicationResponse);
    }
    async caseCreation(accessToken: string, accountID: string, contactID: string) {
        const caseString = fs.readFileSync(path.resolve(__dirname, '../testdata/api/registrationCase.json'), 'utf8');
        caseRequest = JSON.parse(caseString);
        caseRequest.AccountId = accountID;
        caseRequest.ContactId = contactID;
        const response = await this.requestPost(url.case, accessToken, JSON.stringify(caseRequest));
        expect(response.status()).toEqual(201);
        const defaultResponse: defaultResponse = await response.json();
        return defaultResponse.id;
    }
    async caseValidation(accessToken: string, caseID: string) {
        const response = await this.requestGet(`${url.case}/${caseID}`, accessToken);
        expect(response.status()).toEqual(200);
        caseResponse = await response.json();
        Helper.compareResponseValues(caseRequest, caseResponse);
    }
    async caseStatusUpdate(accessToken: string, caseID: string, status: string) {
        const caseRequest = {
            "Status": status
        };
        const response = await this.requestPatch(`${url.case}/${caseID}`, accessToken, JSON.stringify(caseRequest));
        expect(response.status()).toEqual(284);
    }
    async deleteAllObjects(accessToken: string, caseID: string, objectsTobeDeleted: string, searchField: string, objectUrl: string) {
        let response = await this.requestGet(`${url.query}?q=SELECT+id+FROM+${objectsTobeDeleted}+where+${searchField}='${caseID}'`, accessToken);
        expect(response.status()).toEqual(200);
        queryResponse = await response.json();
        let record: Record;
        for (record of queryResponse.records)
            response = await this.requestDelete(`${objectUrl}/${record.Id}`, accessToken);
        expect(response.status()).toEqual(204);
    }
    async objectsNotExistValidation(accessToken: string, caseID: string, objectsDeleted: string, searchField: string) {
        const response = await this.requestGet(`${url.query}?q=SELECT+id+FROM${objectsDeleted}+where+${searchField}='${caseID}'`, accessToken);
        expect(response.status()).toEqual(200);
        queryResponse = await response.json();
        expect(queryResponse.totalSize).toEqual(0);
    }
    async updatePARLastAccessDate(accessToken: string, parID: string) {
        const parBody = {
            "Last_Access_Date_c": await Helper.currentDateYYYYMMDDHHmmss() + '.000+0000'
        };
        const response = await this.requestPatch(`${url.preliminaryApplication}/${parID}`, accessToken, JSON.stringify(parBody));
        expect(response.status()).toEqual(204);
    }
    async getAccessToken() {
        const response = await this.request.post(url.token, {
            params: {
                grant_type: "password",
                client_id: process.env.client_id == undefined ? "" : process.env.client_id,
                client_secret: process.env.client_secret == undefined ? "" : process.env.client_secret,
                username: process.env.user == undefined ? "" : process.env.user,
                password: process.env.password == undefined ? "" : process.env.password
            }
        });
        expect(response.ok()).toBeTruthy();
        const tokenResponse: TokenResponse = await response.json();
        return tokenResponse.access_token;
    }
    async requestPatch(url: string, access_token: string, body: string) {
        const response = await this.request.patch(url, {
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": 'application/json'
            },
            data: body
        });
        return response;
    }
    async requestPost(url: string, access_token: string, body: string) {
        const response = await this.request.post(url, {
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": 'application/json'
            },
            data: body
        });
        return response;
    }
    async requestGet(url: string, access_token: string) {
        const response = await this.request.get(url, {
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        });
        return response;
    }

    async requestDelete(url: string, access_token: string) {
        const response = await this.request.delete(url, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        return response;
    }
    async getPasscode() {
        const response = await this.request.get(url.passcode + (process.env.mailinatorAPIAccess == undefined ? "" : process.env.mailinatorAPIAccess));
        expect(response.status()).toEqual(200);
        const passcodeResponse = await response.json()
        return passcodeResponse.passcode;
    }
}


