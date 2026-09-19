const { test, expect } = require('@playwright/test');
const { POManager } = require('./Pages/POManager');
// const { LoginPage } = require('./Pages/LoginPage');
// const { Dashboard } = require('./Pages/Dashboard');

test('@Web Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const poManager = new POManager(page);
   const username = "brijensuthar@gmail.com";
   const password = "Brijen@123";
   const productName = "iphone 13 pro";
   const products = page.locator(".card-body");

   // Login Page
   const loginPage = poManager.getLogin();
   await loginPage.goTo();
   await loginPage.enterLoginCredential(username, password);

   // Dashboard Page
   const dashboard = poManager.getDashboard();
   await dashboard.searchProductandAddtoCard(productName);
   await page.pause();








   /*
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




   /* 
   // Place Order
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

   expect(await page.locator(".user__name [type='text']").first()).toHaveText(username);
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
   */



   /*
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
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
   console.log("Oder successfully placed") */
})


