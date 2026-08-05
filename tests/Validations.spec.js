const { test } = require('@playwright/test')

test("Common validations", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://www.google.com/");
    await page.goBack();
    await page.locator("#confirmbtn").click();
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    page.on('dialog', dialog => dialog.dismiss());
    await page.locator("#mousehover").hover();
    //await page.pause();

    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href*='lifetime-access']:visible").click();

    const text = await framePage.locator(".text h2").textContent();
    const splitText = await text.split(" ").at(1);
    console.log(splitText);

});

