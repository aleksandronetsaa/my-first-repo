import { APIConfig } from '../config/api-config.js';

export class AuthHelper {
    constructor(request) {
        this.request = request;
        this.token = null;
    }

    async getAuthToken() {
        const response = await this.request.post(`${APIConfig.baseURL}${APIConfig.endpoints.auth}`, {
            data: APIConfig.credentials,
            headers: APIConfig.headers
        });

        if (response.status() !== 200) {
            throw new Error(`Failed to get auth token. Status: ${response.status()}`);
        }

        const responseBody = await response.json();
        this.token = responseBody.token;
        return this.token;
    }

    async getAuthHeaders() {
        if (!this.token) {
            await this.getAuthToken();
        }
        return {
            'Content-Type': 'application/json',
            'Cookie': `token=${this.token}`
        };
    }
}