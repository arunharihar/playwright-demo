// playwright.config.ts
import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  timeout: 60000,
  use: {
    baseURL: "https://demoqa.com/",
    trace: 'on',
    headless: false,
    viewport: { width: 1920, height: 1080 },
    screenshot: "on",
    video: 'on',
    launchOptions: {
      slowMo: 150
    }
  },
  projects: [{
    name: 'Chrome',
    use: { ...devices['Desktop Chrome'] },
  }
    // , {
    //   name: 'Firefox',
    //   use: { ...devices['Desktop Firefox'] }
    // }
  ]
};
export default config;