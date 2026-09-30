const base = require('@playwright/test');
const { request } = require('@playwright/test');
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUxMTg2LCJlbWFpbCI6ImJyaWplbnN1dGhhckB5YWhvby5jb20iLCJpYXQiOjE3ODkwMTkwMzIsImV4cCI6MTc4OTYyMzgzMn0.50nbr3yCEpUdGVT5GH6hL4pqpqt7bqWrUIwWwYQN9qY"
const eventCreatePayload =
{
    title: "TEST EVENT 5",
    description: "TEST Desscription 5",
    category: "Concert",
    venue: "Test Venue 5",
    city: "Ahmedabad",
    eventDate: "2026-09-15T11:53:00.000Z",
    price: 50,
    totalSeats: 500
}
let apiContext;

exports.customtestAssignment = base.test.extend({
    // Task 1 — authenticatedPage fixture
    authenticatedPage: async ({ browser }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://eventhub.rahulshettyacademy.com/login");
        await page.locator("#email").fill("brijensuthar@yahoo.com");
        await page.locator("#password").fill("Brijen@123");
        await page.locator("#login-btn").click();
        await page.waitForLoadState("networkidle");
        await use(page);
        await context.close();
    },

    createEvent: async ({ }, use) => {
        // Task 2 — createEvent fixture
        apiContext = await request.newContext();
        const eventRespone = await apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/events",
            {
                data: eventCreatePayload,
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
        )
        const eventResponeJson = await eventRespone.json();
        await use(eventResponeJson);
    }
})