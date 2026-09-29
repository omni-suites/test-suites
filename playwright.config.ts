import path from 'path';
import dotenv from 'dotenv';
import { defineConfig, devices } from '@playwright/test';
import { getUrls } from './src/config/environments';

// Load test-suites/.env into process.env (gitignored)
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Central E2E config — tests live under src/services/ (domain folders + tags).
 * Suites: --grep @smoke | @sanity | @regression
 * Layer:  --grep @ui | @api
 */
export default defineConfig({
  testDir: './src/services',
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
  ],
});
