import path from 'path';
import dotenv from 'dotenv';
import { defineConfig, devices, type ReporterDescription } from '@playwright/test';
import { getUrls } from './src/config/environments';
import {
  getReportPortalConfig,
  isReportPortalEnabled,
} from './src/config/reportportal';

// Load test-suites/.env into process.env (gitignored)
dotenv.config({ path: path.resolve(__dirname, '.env') });

const reporters: ReporterDescription[] = [
  ['list'],
  ['html', { open: 'never' }],
];

if (isReportPortalEnabled()) {
  reporters.push([
    '@reportportal/agent-js-playwright',
    getReportPortalConfig(),
  ]);
}

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
  reporter: reporters,
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
