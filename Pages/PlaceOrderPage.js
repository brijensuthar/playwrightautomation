class PlaceOrderPage {

    constructor(page) {
        this.page = page;
        this.countryDropdown = page.locator("input[placeholder*='Country']");
        this.countryDropdownResult = page.locator(".ta-results");
        this.username = page.locator(".user__name [type='text']");
        this.cardNumber = page.locator("[class*='validated']");
        this.month = page.locator(".input");
        this.date = page.locator(".input");
        this.CVVCode = page.locator(".input");
        this.CardName = page.locator(".input");
        this.PlaceOrderButton = page.locator(".btnn");
        this.orderMessage = page.locator(".hero-primary");
    }

    async placeOrder(country, cardnum, cvv, cardholder) {

        await this.countryDropdown.pressSequentially(country, { delay: 100 })
        const dropdown = await this.countryDropdownResult;
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

        await this.cardNumber.first().fill(cardnum);
        await this.month.nth(1).selectOption({ index: 4 });
        await this.date.nth(2).selectOption({ index: 4 });
        await this.CVVCode.nth(3).fill(cvv);
        await this.CardName.nth(4).fill(cardholder);
        await this.PlaceOrderButton.click();
    }

    async getUsername() {
        return this.username;
    }

    async getOrderSuccessMessage() {
        const msg = await this.orderMessage.textContent();
        return msg;
    }

}

module.exports = { PlaceOrderPage };