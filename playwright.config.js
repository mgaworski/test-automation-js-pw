// @ts-check
import { defineConfig, devices } from '@playwright/test';
// loading env from file (secrets);
import 'dotenv/config';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: 'e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    /* allow downloading files */
    acceptDownloads: true,
  },

  /* Configure projects for major browsers */
  projects: [

    {
      name: 'api',
      testDir: 'e2e/tests-api/tests',
      use: {
        trace: 'off',
      }
    },

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      },
      testDir: 'e2e/tests-ui/tests'
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox']
      },
      testDir: 'e2e/tests-ui/tests'
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari']
      },
      testDir: 'e2e/tests-ui/tests'
    },
  ],

});