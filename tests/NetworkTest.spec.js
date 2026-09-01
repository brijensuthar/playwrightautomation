
const { test, request } = require('@playwright/test');
const { APIUtils } = require('./Utils/APIUtils');
const LoginPayload = { userEmail: "brijensuthar@gmail.com", userPassword: "Brijen@123" }
let apiContext;
let token;
const orderFakeResponse = { data: [], message: "No Orders" }
let response;

test.beforeAll(async () => {

    apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, LoginPayload);
    //response = await apiUtils.createOrder(OrderPayload);
    token = await apiUtils.getToken();

});

test('No order on history page', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",

        async route =>{

            const response = await page.request.fetch(route.request());
            let body = await JSON.stringify(orderFakeResponse);

            route.fulfill(
                {
                    response,
                    body
                }
            );
        }
    );
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    const msg = await page.locator(".mt-4").textContent();
    console.log(msg);
});


