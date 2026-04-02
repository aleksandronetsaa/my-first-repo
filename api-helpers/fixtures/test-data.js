// Тестовые данные для API тестов
export const TestData = {
    validBooking: {
        firstname: "John",
        lastname: "Doe",
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
            checkin: "2024-12-01",
            checkout: "2024-12-10"
        },
        additionalneeds: "Breakfast"
    },

    updatedBooking: {
        firstname: "Jane",
        lastname: "Smith",
        totalprice: 250,
        depositpaid: false,
        bookingdates: {
            checkin: "2024-12-15",
            checkout: "2024-12-20"
        },
        additionalneeds: "Lunch and Dinner"
    }
};