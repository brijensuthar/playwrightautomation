import { Locator, Page } from '@playwright/test';

export class CheckoutPage {

    page: Page;
    itemList: Locator;
    item:Locator;
    checkOutButton: Locator;

    constructor(page:Page) {
        this.page = page;
        this.itemList = page.locator("div li");
        this.item = page.locator("h3:has-text('iphone 13 pro')");
        this.checkOutButton = page.locator("text=Checkout");
        // this.inputCountry = page.locator("input[placeholder*='Country']");
        // this.countryDropdown = page.locator(".ta-results");
    }

    async checkoutItem() {
        await this.itemList.first().waitFor();
        const bool = await this.item.isVisible();
        //await expect(bool).toBeTruthy();
        console.log(bool);
        await this.checkOutButton.click();
    }
}
