const { Before, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { POManager } = require('../../Pages/POManager');
const playwright = require('@playwright/test');
setDefaultTimeout(60 * 1000);

Before(async function () {

    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);

});

After(async function () {

    console.log("Completed Tear Down Process");

});