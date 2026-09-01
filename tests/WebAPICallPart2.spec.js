const { test, expect } = require('@playwright/test');
let webContext;

test.beforeAll(async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const email = "brijensuthar@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Brijen@123");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' });

});



test('@Web Client App login', async () => {
    //js file- Login js, DashboardPage
    const email = "";
    const productName = "ZARA COAT 3";
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const products = await page.locator(".card-body");
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    console.log(count);

    for (let i = 0; i < count; ++i) {
        const productText = await products.nth(i).locator("b").textContent();
        console.log(productText);
        if (productText === productName) {
            // click on add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            console.log("clicked");
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    console.log(bool);

    await page.locator("text=Checkout").click();
    await page.locator("input[placeholder*='Country']").pressSequentially('ind', { delay: 100 })
    const dropdown = await page.locator(".ta-results");
    await dropdown.waitFor();

    const optionCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionCount; i++) {

        const text = await dropdown.locator("button").nth(i).textContent();
        console.log(text);
        if (text.trim() === "India") {
            await dropdown.locator("button").nth(i).click();
            console.log("Dropdown value selected successfully");
            break;
        }
    }
    //await page.pause();

    expect(await page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator("[class*='validated']").first().fill("4542 9931 9292 2294");
    await page.locator(".input").nth(1).selectOption({ index: 4 });
    await page.locator(".input").nth(2).selectOption({ index: 4 });
    await page.locator(".input").nth(3).fill("123");
    await page.locator(".input").nth(4).fill("test card");
    await page.locator(".btnn").click();
    const msg = await page.locator(".hero-primary").textContent();
    console.log(msg);
    //await expect(msg).toBe(" Thankyou for the order. "); //toBe use with string, number and boolean
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. "); //toHaveText use with locator
    //await page.pause();
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); i++) {

        const rowOrderID = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderID)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".-main").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
    console.log("Oder successfully placed")
})


