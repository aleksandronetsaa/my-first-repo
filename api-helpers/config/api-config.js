// API Конфигурация
export const APIConfig = {
    baseURL: 'https://restful-booker.herokuapp.com',
    endpoints: {
        booking: '/booking',
        auth: '/auth'
    },
    credentials: {
        username: 'admin',
        password: 'password123'
    },
    headers: {
        'Content-Type': 'application/json'
    }
};