const { test, request } = require('@playwright/test');
const LoginPayload = { email: "brijensuthar@gmail.com", password: "Brijen@123" };
const { MokeAPIUtils } = require('./Utils/MokeAPIUtils');
const { json } = require('node:stream/consumers');
const FOUR_EVENTS_RESPONSE = {
    data: [
        { id: 1, title: 'TESTTTTTT', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
        { id: 2, title: 'Rock Night Live', category: 'Concert', eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
        { id: 3, title: 'IPL Finals', category: 'Sports', eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
        { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
    ],
    pagination: { page: 1, totalPages: 1, total: 4, limit: 12 },
};
let apiContext;
let token;


test.beforeAll(async () => {
    apiContext = await request.newContext();
    const mokeapiUtils = new MokeAPIUtils(apiContext, LoginPayload);
    token = await mokeapiUtils.getToken();
});

test("MokeAPICall 2", async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('eventhub_token', value)
    }, token);

    await page.route("https://api.eventhub.rahulshettyacademy.com/api/events**",
        async route => {

            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(FOUR_EVENTS_RESPONSE);

            route.fulfill({
                response,
                body
            })
        }
    )
    await page.goto("https://eventhub.rahulshettyacademy.com/events");
    //await page.waitForResponse("**/api/events**");
    await page.pause();
});


