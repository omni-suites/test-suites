/**
 * ReportPortal agent config from env.
 * Enabled when RP_API_KEY is set (see .env.sample).
 */

export type ReportPortalConfig = {
  apiKey: string;
  endpoint: string;
  project: string;
  launch: string;
  description?: string;
  attributes: Array<{ key?: string; value: string }>;
  includeTestSteps?: boolean;
  skippedIssue?: boolean;
  restClientConfig?: { timeout?: number };
};

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(
      `Missing required env: ${name}. Set it in test-suites/.env (see .env.sample).`,
    );
  }
  return value;
}

/** True when reporting to ReportPortal should be active. */
export function isReportPortalEnabled(): boolean {
  const flag = process.env.RP_ENABLED?.trim().toLowerCase();
  if (flag === 'false' || flag === '0') return false;
  return Boolean(process.env.RP_API_KEY?.trim());
}

export function getReportPortalConfig(): ReportPortalConfig {
  const testEnv = process.env.TEST_ENV?.trim() || 'unknown';
  return {
    apiKey: requireEnv('RP_API_KEY'),
    endpoint: requireEnv('RP_ENDPOINT'),
    project: requireEnv('RP_PROJECT'),
    launch: process.env.RP_LAUNCH?.trim() || 'playwright',
    description: process.env.RP_DESCRIPTION?.trim() || 'omni-suites Playwright run',
    attributes: [
      { key: 'env', value: testEnv },
      { key: 'framework', value: 'playwright' },
      { key: 'repo', value: 'test-suites' },
      ...(process.env.GITHUB_SHA
        ? [{ key: 'commit', value: process.env.GITHUB_SHA.slice(0, 7) }]
        : []),
      ...(process.env.GITHUB_RUN_ID
        ? [{ key: 'ci_run', value: process.env.GITHUB_RUN_ID }]
        : []),
    ],
    includeTestSteps: true,
    skippedIssue: false,
    restClientConfig: {
      timeout: 60_000,
    },
  };
}
