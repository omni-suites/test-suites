/**
 * Environment URLs for Playwright runs.
 * Prefer process.env (CI / .env); fall back to local defaults.
 */
export type AppEnvironment = 'local' | 'staging';

export interface EnvironmentUrls {
  frontend: string;
  order: string;
  inventory: string;
  notification: string;
}

const defaults: Record<AppEnvironment, EnvironmentUrls> = {
  local: {
    frontend: 'http://localhost:5173',
    order: 'http://localhost:3000',
    inventory: 'http://localhost:3001',
    notification: 'http://localhost:3002',
  },
  staging: {
    frontend: 'https://frontend-svc.test-suites-poc.work.gd',
    order: 'https://order-svc.test-suites-poc.work.gd',
    inventory: 'https://inventory-svc.test-suites-poc.work.gd',
    notification: 'https://notification-svc.test-suites-poc.work.gd',
  },
};

export function resolveEnv(): AppEnvironment {
  const raw = (process.env.TEST_ENV || 'local').toLowerCase();
  return raw === 'staging' ? 'staging' : 'local';
}

export function getUrls(): EnvironmentUrls {
  const env = resolveEnv();
  const base = defaults[env];
  return {
    frontend: process.env.FRONTEND_URL || base.frontend,
    order: process.env.ORDER_URL || base.order,
    inventory: process.env.INVENTORY_URL || base.inventory,
    notification: process.env.NOTIFICATION_URL || base.notification,
  };
}
