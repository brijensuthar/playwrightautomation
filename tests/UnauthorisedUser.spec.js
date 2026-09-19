const { test, expect } = require('@playwright/test')

test("Unauthorised Order Access", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("brijensuthar@gmail.com");
    await page.locator("#userPassword").fill("Brijen@123");
    await page.locator("[value='Login']").click();
    await page.locator("[routerlink*='myorders']").click();

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
        async route =>
            route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a902e0221054ba465f749a5' })
    );
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator(".blink_me")).toHaveText("You are not authorize to view this order");
    await page.pause();
})


