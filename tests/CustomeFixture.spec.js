const { test, expect } = require('@playwright/test')
const { customtest } = require('./Utils/FixtureUtils.js')


customtest("Custom Fixture", async ({authenticatedPage, createOrder}) => {

    authenticatedPage.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");
    await authenticatedPage.locator("button[routerlink*='myorders']").click();
    await authenticatedPage.locator("tbody").waitFor();
    await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();
})