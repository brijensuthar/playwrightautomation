const { test, expect } = require('@playwright/test');
const { POManager } = require('../Pages/POManager');
const { customTest } = require('../Utils/testBase');

customTest('Client App login', async ({ page, testdataforOrder }) => {
    //js file- Login js, DashboardPage
    const poManager = new POManager(page);

    // Login Page
    const loginPage = poManager.getLogin();
    await loginPage.goTo();
    await loginPage.enterLoginCredential(testdataforOrder.username, testdataforOrder.password);

    // Dashboard Page and Add item into cart
    const dashboard = poManager.getDashboard();
    await dashboard.searchProductandAddtoCard(testdataforOrder.productName);

    // Checkout Items
    const checkout = poManager.getCheckoutItem();
    await checkout.checkoutItem();

    // Place Order
    const orderDetail = poManager.getOrder();
    await orderDetail.placeOrder("Ind", "4542 9931 9292 2294", "123", "Test User");
    const users = await orderDetail.getUsername();
    expect(await users.first()).toHaveText(testdataforOrder.username);
    const orderMsg = await orderDetail.getOrderSuccessMessage();
    console.log(orderMsg);
    expect(orderMsg).toBe(" Thankyou for the order. ");
});


