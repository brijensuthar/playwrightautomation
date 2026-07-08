// @ts-check
import { chromium, defineConfig, devices, expect } from '@playwright/test';
import { TIMEOUT } from 'node:dns';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 90*1000,
  expect:{
    TIMEOUT: 90000
  },
  use: { 
   browserName: 'chromium',
   headless: false
  },
});

module.exports = config

 