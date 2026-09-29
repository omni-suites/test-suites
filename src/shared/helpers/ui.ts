import { expect, test, type Page } from '@playwright/test';
import { getUrls } from '../../config/environments';
import { rpInfo } from './rp';

/** Open omni-client home and wait for the inventory section. */
export async function openOmniClient(page: Page) {
  await test.step('Open omni-client home', async () => {
    const url = getUrls().frontend;
    rpInfo(`Navigate to ${url}`);
    await page.goto(url);
    await expect(page.getByRole('heading', { name: 'Omni Suites' })).toBeVisible();
  });
}
