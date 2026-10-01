const {test, expect} = require('@playwright/test');

test("Calendar Demo", async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    const year = "2027";
    const month = "6";
    const day = "15";

    const expectedList = [month, day, year];

    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label__labelText--from").click();
    await page.locator(".react-calendar__navigation__label__labelText--from").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(month)-1).click();
    await page.locator("//abbr[text()='15']").click();

    const input = await page.locator(".react-date-picker__inputGroup__input")

    for(let i=0; i< expectedList.length; i++){
        const value = await input.nth(i).inputValue();
        console.log(value);
        expect(value).toEqual(expectedList[i]);    
    }
});