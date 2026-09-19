const { Dashboard } = require('../Pages/Dashboard');
const { LoginPage } = require('../Pages/LoginPage');

class POManager {

    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboard = new Dashboard(page);
    }

    getLogin() {
        return this.loginPage;
    }

    getDashboard() {
        return this.dashboard;
    }

}

module.exports = {POManager};