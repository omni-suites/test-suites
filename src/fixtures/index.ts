import { test as base } from '@playwright/test';
import { getUrls, type EnvironmentUrls } from '@config/environments';

type Fixtures = {
  urls: EnvironmentUrls;
};

/**
 * Shared fixtures. Extend here for auth, seeded data, etc.
 */
export const test = base.extend<Fixtures>({
  urls: async ({}, use) => {
    await use(getUrls());
  },
});

export { expect } from '@playwright/test';
