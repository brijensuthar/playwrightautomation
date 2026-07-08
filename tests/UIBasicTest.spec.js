const { test, expect } = require('@playwright/test');
const { promises } = require('node:dns');
const { only } = require('node:test');


test('First Playwrite Test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  //await expect(page).toHaveTitle("Google");

  const username = page.locator('#username');
  const signIn = page.locator('#signInBtn');
  const cardTitles = page.locator('.card-body a');

  await username.waitFor({ state: 'visible' });
  await username.fill("rahulshettyacademy");
  await page.locator('#password').fill("Learning@830$3mK2");
  await signIn.click();

  console.log(await cardTitles.first().textContent());
  //textContext() method is use for get text on page
  console.log(await cardTitles.nth(1).textContent());
  // first() and nth() method is use for pass index when elements preperty are same and we have to get specific element text
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
}
);


test('Dropdwon Test', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());

  const username = page.locator('#username');
  const signIn = page.locator('#signInBtn');
  const dropdown = page.locator('select.form-control');

  await username.fill("rahulshettyacademy");
  await page.locator('#password').fill("Learning@830$3mK2");
  await dropdown.selectOption("Teacher"); // Dropdown selection
  await page.locator(".radiotextsty").last().click(); // Select radio button value, This will select last option of radio button 
  await page.pause();
}
);

test.only("Chld Window Navigation", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentsLink = page.locator("a[href*='documents-request']");

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    documentsLink.click()
  ]
  )
  const text = await newPage.locator(".red").textContent();
  console.log(text);
});
