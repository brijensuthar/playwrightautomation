 
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',

  // Maximum time one test can run
  timeout: 90 * 1000,

  // Maximum time for Playwright assertions
  expect: {
    timeout: 90 * 1000,
  },

  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'on',
    trace: 'on',
  },

  reporter: 'html',
});