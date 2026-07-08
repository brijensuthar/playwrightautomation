const {test, expect} = require('@playwright/test');

test("Calendar Demo", async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    const year = "2027";
    const month = "6";
    const day = "15";

    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label__labelText--from").click();
    await page.locator(".react-calendar__navigation__label__labelText--from").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(month-1).click();
    await page.locator("//abbr[text()='15']").click();

});