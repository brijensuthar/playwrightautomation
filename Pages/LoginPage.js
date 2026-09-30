class LoginPage {

    constructor(page) {
        this.page = page;
        this.username = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginButton = page.locator("[value='Login']");
    }

    async enterLoginCredential(usename, password) {
        await this.username.type(usename);
        await this.password.type(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }
}

module.exports = { LoginPage };