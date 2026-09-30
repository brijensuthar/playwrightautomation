import { test, expect } from '@playwright/test';
import { POManager } from '../Pages_TS/POManager';
const dataSet = JSON.parse(JSON.stringify(require('../Utils/placeOrderTestData.json')));

for (const data of dataSet) {
   test(`Client App login ${data.username}`, async ({ page }) => {
      //js file- Login js, DashboardPage
      const poManager = new POManager(page);

      // Login Page
      const loginPage = poManager.getLogin();
      await loginPage.goTo();
      await loginPage.enterLoginCredential(data.username, data.password);

      // Dashboard Page and Add item into cart
      const dashboard = poManager.getDashboard();
      await dashboard.searchProductandAddtoCard(data.productName);

      // Checkout Items
      const checkout = poManager.getCheckoutItem();
      await checkout.checkoutItem();

      // Place Order
      const orderDetail = poManager.getOrder();
      await orderDetail.placeOrder("Ind", "4542 9931 9292 2294", "123", "Test User");
      const users = await orderDetail.getUsername();
      expect(await users.first()).toHaveText(data.username);
      const orderMsg = await orderDetail.getOrderSuccessMessage();
      console.log(orderMsg);
      expect(orderMsg).toBe(" Thankyou for the order. ");

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
}

