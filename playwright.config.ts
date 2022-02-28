// playwright.config.ts
import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  timeout: 60000,
  use: {
    baseURL: "https://demoqa.com/",
    trace: 'on',
    headless: true,
    viewport: { width: 1920, height: 1080 },
    screenshot: "on",
    video: 'on',
    launchOptions: {
      slowMo: 30
    }
  },
  projects: [{
    name: 'chrome',
    use: { ...devices['Desktop Chrome'] },
  }
    , {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    }
  ]
};
export default config;