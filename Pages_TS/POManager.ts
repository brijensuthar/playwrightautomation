import { Dashboard } from './Dashboard';
import { LoginPage } from './LoginPage';
import { CheckoutPage } from './CheckoutPage';
import { PlaceOrderPage } from './PlaceOrderPage';
import { Page } from '@playwright/test';


export class POManager {

    loginPage: LoginPage;
    dashboard: Dashboard;
    checkout: CheckoutPage;
    orderdetail: PlaceOrderPage;
    page: Page;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboard = new Dashboard(page);
        this.checkout = new CheckoutPage(page);
        this.orderdetail = new PlaceOrderPage(page);
    }

    getLogin() {
        return this.loginPage;
    }

    getDashboard() {
        return this.dashboard;
    }

    getCheckoutItem() {
        return this.checkout;
    }

    getOrder() {
        return this.orderdetail;
    }
}

//module.exports = { POManager };