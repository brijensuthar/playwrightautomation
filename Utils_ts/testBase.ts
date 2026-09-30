//const  base  = require('@playwright/test');
import { test as baseTest } from '@playwright/test';

interface TestDataForOrder {
    username: string;
    password: string;
    productName: string;
}


export const customTest = baseTest.extend<{ testdataforOrder: TestDataForOrder }>({
    testdataforOrder: {
        username: "brijensuthar@gmail.com",
        password: "Brijen@123",
        productName: "iphone 13 pro"
    }
})