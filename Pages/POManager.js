const { Dashboard } = require('../Pages/Dashboard');
const { LoginPage } = require('../Pages/LoginPage');
const { CheckoutPage } = require('./CheckoutPage');
const { PlaceOrderPage } = require('./PlaceOrderPage');

class POManager {

    constructor(page) {
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
module.exports = { POManager };