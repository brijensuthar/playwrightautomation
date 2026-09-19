const { test, expect, request } = require('@playwright/test');
const BASE_URL = "https://eventhub.rahulshettyacademy.com";
const API_URL = "https://eventhub.rahulshettyacademy.com/api";
const gmailUser = { email: "brijensuthar@gmail.com", password: "Brijen@123" }
const yahooUser = { email: "brijensuthar@yahoo.com", password: "Brijen@123" }
const bookingPayload = {
    customerName: "brijen suthar",
    customerEmail: "brijensuthar@yahoo.com",
    customerPhone: "9845349899",
    quantity: 1,
    eventId: 1
}
let apiContext;
let token;

test.beforeAll(async () => {
    apiContext = await request.newContext();
    const response = await apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login",
        {
            data: yahooUser
        }
    )
    expect(response.ok()).toBeTruthy();
    const responseJSON = await response.json();
    console.log(responseJSON);
    token = responseJSON.token;
    console.log(token);
    return token;
});

test("Assignment for Login by API context", async ({ page, browser }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('eventhub_token', value)
    }, token);

    const eventResponse = await apiContext.get("https://api.eventhub.rahulshettyacademy.com/api/events?page=1&limit=12",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    expect(eventResponse.ok()).toBeTruthy();
    const eventResponseJSON = await eventResponse.json();
    const eventId = eventResponseJSON.data[0].id;
    console.log(eventId);

    //Step 3 — Create a booking via API as Yahoo user
    const bookingResponse = await apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/bookings",
        {
            data: bookingPayload,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": 'application/json'
            }
        }
    );

    expect(bookingResponse.ok()).toBeTruthy();
    const bookingResponseJSON = await bookingResponse.json();
    console.log(bookingResponseJSON);
    const yahooBookingId = await bookingResponseJSON.data.id;
    console.log(yahooBookingId);

    //Step 4 — Login as Gmail user via browser UI

    const context = await browser.newContext();
    const pageNew = await context.newPage();

    await pageNew.goto(BASE_URL);
    await pageNew.locator("#email").fill(gmailUser.email);
    await pageNew.locator("#password").fill(gmailUser.password);
    await pageNew.locator("#login-btn").click();
    await pageNew.waitForLoadState("networkidle");

    console.log("After Gmail login:");
    console.log("URL:", pageNew.url());
    await pageNew.goto(`${BASE_URL}/bookings/${yahooBookingId}`);
    await pageNew.waitForLoadState("networkidle");
    console.log("After opening Yahoo booking:");
    console.log("URL:", pageNew.url());

    await expect(pageNew.getByText("Access Denied")).toBeVisible();
    await expect(pageNew.getByText("You are not authorized to view this booking.")).toBeVisible();
    await pageNew.pause();
});

