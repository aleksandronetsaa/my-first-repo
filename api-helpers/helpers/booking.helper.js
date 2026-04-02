import { APIConfig } from '../config/api-config.js';

export class BookingHelper {
    constructor(request, authHelper = null) {
        this.request = request;
        this.authHelper = authHelper;
        this.bookingId = null;
    }

    async createBooking(bookingData) {
        const response = await this.request.post(`${APIConfig.baseURL}${APIConfig.endpoints.booking}`, {
            data: bookingData,
            headers: APIConfig.headers
        });

        const responseBody = await response.json();

        if (response.status() === 200 && responseBody.bookingid) {
            this.bookingId = responseBody.bookingid;
        }

        return {
            status: response.status(),
            data: responseBody,
            bookingId: responseBody.bookingid
        };
    }

    async getBooking(bookingId = this.bookingId) {
        if (!bookingId) {
            throw new Error('Booking ID is required');
        }

        const response = await this.request.get(`${APIConfig.baseURL}${APIConfig.endpoints.booking}/${bookingId}`);

        // Проверяем статус перед парсингом JSON
        let responseBody;
        if (response.status() === 200) {
            responseBody = await response.json();
        } else {
            responseBody = await response.text();
        }

        return {
            status: response.status(),
            data: responseBody
        };
    }

    async updateBooking(bookingData, bookingId = this.bookingId) {
        if (!bookingId) {
            throw new Error('Booking ID is required');
        }

        const headers = this.authHelper
            ? await this.authHelper.getAuthHeaders()
            : APIConfig.headers;

        const response = await this.request.put(`${APIConfig.baseURL}${APIConfig.endpoints.booking}/${bookingId}`, {
            data: bookingData,
            headers: headers
        });

        const responseBody = await response.json();

        return {
            status: response.status(),
            data: responseBody
        };
    }

    async deleteBooking(bookingId = this.bookingId) {
        if (!bookingId) {
            throw new Error('Booking ID is required');
        }

        if (!this.authHelper) {
            throw new Error('AuthHelper is required for delete operation');
        }

        const headers = await this.authHelper.getAuthHeaders();

        const response = await this.request.delete(`${APIConfig.baseURL}${APIConfig.endpoints.booking}/${bookingId}`, {
            headers: headers
        });

        return {
            status: response.status()
        };
    }

    setBookingId(bookingId) {
        this.bookingId = bookingId;
    }
}