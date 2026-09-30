const base = require('@playwright/test');
const { request } = require('@playwright/test');
const { APIUtils } = require('./APIUtils');
const LoginPayload = { userEmail: "brijensuthar@gmail.com", userPassword: "Brijen@123" }
const OrderPayload = { orders: [{ country: "Argentina", productOrderedId: "6960eac0c941646b7a8b3e68" }] }

exports.customtest = base.test.extend({

    authenticatedPage: async ({ browser }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const email = "brijensuthar@gmail.com";
        await page.goto("https://rahulshettyacademy.com/client");
        await page.locator("#userEmail").fill(email);
        await page.locator("#userPassword").fill("Brijen@123");
        await page.locator("[value='Login']").click();
        await page.waitForLoadState('networkidle');
        await use(page);
    },

    createOrder: async ({ }, use) => {

        const apiContext = await request.newContext();
        const apiUtils = new APIUtils(apiContext, LoginPayload);
        const response = await apiUtils.createOrder(OrderPayload);
        await use(response);

    }
}
)