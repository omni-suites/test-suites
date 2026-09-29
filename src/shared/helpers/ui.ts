import { expect, type Page } from '@playwright/test';
import { getUrls } from '../../config/environments';

/** Open omni-client home and wait for the inventory section. */
export async function openOmniClient(page: Page) {
  await page.goto(getUrls().frontend);
  await expect(page.getByRole('heading', { name: 'Omni Suites' })).toBeVisible();
}
