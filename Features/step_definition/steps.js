const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
//const { POManager } = require('../../Pages/POManager');
const { expect } = require('@playwright/test');
setDefaultTimeout(60 * 1000);


Given('Login with usernmae {string} and password {string}', async function (username, password) {
    // Login Page
    this.username = username;
    const loginPage = this.poManager.getLogin();
    await loginPage.goTo();
    await loginPage.enterLoginCredential(username, password);
});

When('Add {string} product into cart', async function (productName) {
    this.dashboard = await this.poManager.getDashboard();
    await this.dashboard.searchProductandAddtoCard(productName);
});

Then('verify product successsfully added into cart', async function () {
    const checkout = await this.poManager.getCheckoutItem();
    await checkout.checkoutItem();
});

When('Add details of card', async function () {
    this.orderDetail = await this.poManager.getOrder();
    await this.orderDetail.placeOrder("Ind", "4542 9931 9292 2294", "123", "Test User");
    this.users = await this.orderDetail.getUsername();
});

Then('Verify order successsfully placed', async function () {
    await expect(this.users.first()).toHaveText(this.username);
    const orderMsg = await this.orderDetail.getOrderSuccessMessage();
    console.log(orderMsg);
    expect(orderMsg).toBe(" Thankyou for the order. ");
});

Given('Login with invalid username {string} and password {string}', async function (username2, password2) {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    this.usernameLocator = this.page.locator('#username');
    this.signInLocator = this.page.locator('#signInBtn');

    //await usernameLocator.waitFor({ state: 'visible' });
    await this.usernameLocator.fill(username2);
    await this.page.locator('#password').fill(password2);
    await this.signInLocator.click();

});

Then('verify error message is displayed', async function () {
    console.log("Error message successfully displayed");
});