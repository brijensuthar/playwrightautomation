import { Locator, Page } from '@playwright/test';

export class LoginPage {

    page: Page;
    username: Locator;
    password: Locator;
    loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginButton = page.locator("[value='Login']");
    }

    async enterLoginCredential(usename: string, password: string) {
        await this.username.type(usename);
        await this.password.type(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }
}
