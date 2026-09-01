
const { test, request } = require('@playwright/test');
const { APIUtils } = require('./Utils/APIUtils');
const LoginPayload = { userEmail: "brijensuthar@gmail.com", userPassword: "Brijen@123" }
const OrderPayload = { orders: [{ country: "Argentina", productOrderedId: "6960eac0c941646b7a8b3e68" }] }
let apiContext;
let token;

test.beforeAll(async () => {

    apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, LoginPayload);
    //response = await apiUtils.createOrder(OrderPayload);
    token = apiUtils.getToken();

});

test('@Web Client App login and create order by API', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");
    await page.pause();
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); i++) {

        const rowOrderID = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderID)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
    console.log("Oder successfully placed")
});


