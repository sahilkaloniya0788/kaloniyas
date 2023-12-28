import { url } from '../config/api';
import { APIRequestContext, expect } from '@playwright/test';
import { TokenResponse } from '../models/response/tokenResponse';


export class ApiActions {
    readonly request: APIRequestContext;
    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async getAccessToken() {
        const response = await this.request.post(url.token, {
            params: {
                grant_type: "password",
                client_id: process.env.client_id == undefined ? "" : process.env.client_id,
                client_secret: process.env.client_secret == undefined ? "" : process.env.client_secret,
                username: process.env.apiuser == undefined ? "" : process.env.apiuser,
                password: process.env.apipwd == undefined ? "" : process.env.apipwd
            }
        });
        expect(response.ok()).toBeTruthy();
        const tokenResponse: TokenResponse = await response.json();
        return tokenResponse.access_token;
    }

    async requestGet(url: string, access_token: string) {
        const response = await this.request.get(url, {
            headers: {
                "Authorization": `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            }
        });
        return response;
    }

    async requestPut(url: string, access_token: string, body: string) {
        const response = await this.request.put(url, {
            headers: {
                "Authorization": `Bearer ${access_token}`
            },
            data: body
        });
        return response;
    }
    async requestPost(url: string, access_token: string, body: string) {
        const response = await this.request.post(url, {
            headers: {
                "Authorization": `Bearer ${access_token}`
            },
            data: body
        });
        return response;
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

