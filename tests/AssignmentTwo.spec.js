const { test, expect } = require("@playwright/test");
const { name } = require("../playwright.config");
const BaseURL = "https://eventhub.rahulshettyacademy.com";
const username = "brijensuthar@gmail.com";
const password = "Brijen@123";

/** 
*@param {import('@playwright/test').Page} page
 */

async function login(page, username, password) {
    await page.goto(`${BaseURL}/login`);
    await page.getByPlaceholder('you@email.com').fill(username);
    await page.getByLabel('Password').fill(password);
    await page.locator('#login-btn').click();
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}

test("Single ticket booking is eligible for refund", async ({ page }) => {
    // Step-1 Login
    await login(page, username, password);

    // Step-2 Book first event with 1 ticket (default)
    await page.locator("#nav-events").click();
    await page.locator("[data-testid='event-card']").first().
        locator("[data-testid='book-now-btn']").first().click();
    await page.locator("#customerName").fill("Brijen Suthar");
    await page.locator("#customer-email").fill("brijensuthar@gmail.com");
    await page.locator("#phone").fill("8783827882");
    await page.locator(".confirm-booking-btn").click();

    // Step-3 Navigate to booking detail
    await page.locator("#nav-bookings").click();
    await expect(page.url()).toEqual("https://eventhub.rahulshettyacademy.com/bookings");
    await page.locator("a button").first().click();
    await expect(page.locator(".flex-wrap .items-center .text-indigo-600")).toBeVisible();

    // Step-4 Validate booking reference
    const bookingRef1 = (await page.locator(".flex-wrap .items-center .text-indigo-600").
    innerText()).charAt(0);
    console.log(bookingRef1);
    const eventTitle = (await page.locator(".text-2xl").innerText()).charAt(0);
    await console.log(eventTitle);
    await expect(bookingRef1).toEqual(eventTitle);

    // Step-5 Check refund eligibility
    await page.locator("#check-refund-btn").click();
    await expect(page.locator("#refund-spinner")).toBeVisible();
    await page.locator("#refund-spinner").waitFor({
        state: "hidden",
        timeout: 6000
    });

    // Step-6 Validate result
    await expect(page.locator("#refund-result")).toBeVisible();
    const currentRefundText = await page.locator("#refund-result").textContent();
    await expect(currentRefundText).toContain('Eligible for refund.');
    await expect(currentRefundText).toContain(' Single-ticket bookings qualify for a full refund.');
});

test.only("Single-ticket bookings qualify for a full refund.", async ({page}) => {
    // Step-1 Login
    await login(page, username, password);

    // Step-2 Book first event with 1 ticket (default)
    await page.locator("#nav-events").click();
    await page.locator("[data-testid='event-card']").first().
        locator("[data-testid='book-now-btn']").first().click();

    await page.locator("[type='button']").last().dblclick();
    await page.pause();

    // await page.locator("#customerName").fill("Brijen Suthar");
    // await page.locator("#customer-email").fill("brijensuthar@gmail.com");
    // await page.locator("#phone").fill("8783827882");
    // await page.locator(".confirm-booking-btn").click();
});