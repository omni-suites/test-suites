/**
 * Target URLs for Playwright runs — required from env (.env / CI).
 * No hardcoded host fallbacks.
 */

export interface EnvironmentUrls {
  frontend: string;
  order: string;
  inventory: string;
  notification: string;
}

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(
      `Missing required env: ${name}. Set it in test-suites/.env or CI (see .env.sample).`,
    );
  }
  return value;
}

export function getUrls(): EnvironmentUrls {
  return {
    frontend: requireEnv('FRONTEND_URL'),
    order: requireEnv('ORDER_URL'),
    inventory: requireEnv('INVENTORY_URL'),
    notification: requireEnv('NOTIFICATION_URL'),
  };
}

/** Optional label for reports/metadata (not used for URL resolution). */
export function getTestEnvLabel(): string | undefined {
  const raw = process.env.TEST_ENV?.trim();
  return raw || undefined;
}
