import { defineConfig, devices } from '@playwright/test';
import { getUrls } from './config/environments';

/**
 * Central E2E config — tests live under services/ (domain folders + tags).
 * Suites: --grep @smoke | @sanity | @regression
 * Layer:  --grep @ui | @api
 */
export default defineConfig({
  testDir: './services',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    // ['blob'], // enable when wiring ReportPortal agent
  ],
  use: {
    baseURL: getUrls().frontend,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // API-only runs still need a project; chromium is fine (request fixture).
  ],
});
