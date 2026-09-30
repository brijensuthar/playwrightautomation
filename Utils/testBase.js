const  base  = require('@playwright/test');

exports.customTest = base.test.extend({
    testdataforOrder: {
        username: "brijensuthar@gmail.com",
        password: "Brijen@123",
        productName: "iphone 13 pro"
    }
})