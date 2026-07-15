
const {test, expect} = require('@playwright/test');

test("Assignment", async ({page}) => {

    await page.goto("https://eventhub.rahulshettyacademy.com");
    await page.getByPlaceholder("you@email.com").fill('brijensuthar@gmail.com');  
    await page.getByLabel("Password").fill('Brijen@123');
    await page.locator("[id='login-btn']").click();
    const expectedText = "Browse Events →";

    const browseText = await page.locator(".flex a .inline-flex").first().textContent();
    await expect(browseText.trim()).toBe(expectedText);
    await page.locator(".relative .flex").first().click();
    await page.locator("[href='/admin/events']").first().click();
    
    await page.locator("[id='event-title-input']").fill("This is test event");
    await page.locator("textarea").fill("Test description");
    await page.getByLabel("City").fill("Bangalore");
    await page.getByLabel("Venue").fill("Shree Siddhivinayak Tower");
    await page.getByLabel("Event Date & Time").fill("2026-07-20T17:30");
    await page.getByLabel("Price ($)").fill("500");
    await page.getByLabel("Total Seats").fill("500")
    await page.locator("#add-event-btn").click();
    await expect(page.getByText("Event created!")).toBeVisible();

    await page.locator("#nav-events").click();
    await expect(page.locator("[data-testid='event-card']").first()).toBeVisible();
    await page.locator("[data-testid='event-card']").filter({hasText: 'World Tech Summit'}).waitFor({
        state: "visible",
        timeout: 5000
    });

    const seatsBeforeBooking = await page.locator("span[class*='text-amber-600']").last().textContent();
    console.log(seatsBeforeBooking)
    const result = seatsBeforeBooking.split(" ");
    console.log("Available Seat is "+ result[0]);

    await page.locator("#book-now-btn").nth(2).click();
    const count = await page.locator("#ticket-count").textContent();
    await expect(count).toBe("1");
    await page.getByLabel("Full Name").fill("Brijen Suthar");
    await page.locator("#customer-email").fill("brijensuthar@gmail.com");
    await page.getByPlaceholder("+91 98765 43210").fill("98775 43210");
    await page.locator(".confirm-booking-btn").click();
    await expect(page.locator(".booking-ref")).toBeVisible();
    const bookingRef = await page.locator(".booking-ref").textContent();
    console.log(bookingRef);
    await page.locator("a button").first().click();
    const currentURL = await page.url();
    console.log(currentURL);
    await expect(currentURL).toBe("https://eventhub.rahulshettyacademy.com/bookings");
    await expect(page.locator("#booking-card").first()).toBeVisible();
    await expect(page.locator("#booking-card").filter({hasText: bookingRef})).toBeVisible();
    await expect(await page.locator(".text-base").first().textContent()).toBe("World Tech Summit");


});


