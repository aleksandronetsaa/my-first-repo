import { test, expect } from '@playwright/test';
import { BookingHelper } from '../api-helpers/helpers/booking.helper.js';
import { AuthHelper } from '../api-helpers/helpers/auth.helper.js';
import { TestData } from '../api-helpers/fixtures/test-data.js';

test.describe.serial('API-тесты для Restful-booker', () => {
    let bookingId = null;
    let authToken = null;
    let bookingHelper;
    let authHelper;

    test('1. Создание бронирования (Create - POST)', async ({ request }) => {
        bookingHelper = new BookingHelper(request);

        const result = await bookingHelper.createBooking(TestData.validBooking);

        expect(result.status).toBe(200);
        expect(result.data).toHaveProperty('bookingid');
        expect(result.bookingId).toBeGreaterThan(0);
        expect(result.data.booking).toMatchObject(TestData.validBooking);

        bookingId = result.bookingId;
        console.log(`✅ Создано бронирование с ID: ${bookingId}`);
    });

    test('2. Получение информации о бронировании (Read - GET)', async ({ request }) => {
        expect(bookingId).not.toBeNull();

        bookingHelper = new BookingHelper(request);
        bookingHelper.setBookingId(bookingId);

        const result = await bookingHelper.getBooking();

        expect(result.status).toBe(200);
        expect(result.data.firstname).toBe(TestData.validBooking.firstname);
        expect(result.data.lastname).toBe(TestData.validBooking.lastname);
        expect(result.data.totalprice).toBe(TestData.validBooking.totalprice);
        expect(result.data.bookingdates).toEqual(TestData.validBooking.bookingdates);

        console.log(`✅ Получено бронирование ID ${bookingId}`);
    });

    test('3. Обновление бронирования (Update - PUT)', async ({ request }) => {
        expect(bookingId).not.toBeNull();

        authHelper = new AuthHelper(request);
        authToken = await authHelper.getAuthToken();
        expect(authToken).toBeDefined();

        bookingHelper = new BookingHelper(request, authHelper);
        bookingHelper.setBookingId(bookingId);

        const result = await bookingHelper.updateBooking(TestData.updatedBooking);

        expect(result.status).toBe(200);
        expect(result.data.firstname).toBe(TestData.updatedBooking.firstname);
        expect(result.data.lastname).toBe(TestData.updatedBooking.lastname);
        expect(result.data.totalprice).toBe(TestData.updatedBooking.totalprice);
        expect(result.data.bookingdates).toEqual(TestData.updatedBooking.bookingdates);

        console.log(`✅ Обновлено бронирование ID ${bookingId}`);
    });

    test('4. Удаление бронирования (Delete - DELETE)', async ({ request }) => {
        expect(bookingId).not.toBeNull();

        if (!authHelper) {
            authHelper = new AuthHelper(request);
            await authHelper.getAuthToken();
        }

        bookingHelper = new BookingHelper(request, authHelper);
        bookingHelper.setBookingId(bookingId);

        const deleteResult = await bookingHelper.deleteBooking();
        expect(deleteResult.status).toBe(201);

        const getResult = await bookingHelper.getBooking();
        expect(getResult.status).toBe(404);

        console.log(`✅ Удалено бронирование ID ${bookingId}`);
    });
});