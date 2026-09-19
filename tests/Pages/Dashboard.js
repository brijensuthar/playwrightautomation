class Dashboard {

    constructor(page) {
        this.page = page;
        this.titles = page.locator(".card-body b");
        this.products = page.locator(".card-body");
        this.cart = page.locator("[routerlink*='cart']");

    }

    async searchProductandAddtoCard(productName) {

        await this.titles.first().waitFor();
        const titles = await this.titles.allTextContents();
        console.log(titles);
        const count = await this.products.count();
        console.log(count);

        for (let i = 0; i < count; ++i) {
            const productText = await this.products.nth(i).locator("b").textContent();
            console.log(productText);
            if (productText === productName) {
                // click on add to cart
                await this.products.nth(i).locator("text= Add To Cart").click();
                console.log("clicked");
                break;
            }
        }
        await this.cart.click();
    }
}

module.exports = {Dashboard};