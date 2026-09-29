import { test, expect } from '../../shared/fixtures';
import { openOmniClient } from '../../shared/helpers/ui';
import { attachRpMeta } from '../../shared/helpers/rp';

test.describe('omni-client — place order', () => {
  test('Place valid order end-to-end @smoke @regression @ui [TC-101]', async ({
    page,
  }) => {
    attachRpMeta({
      testCaseId: 'TC-101',
      description: 'UI: open omni-client, buy first inventory item, confirm Orders control visible',
      suites: ['smoke', 'regression'],
      layer: 'ui',
      service: 'omni-client',
    });

    await openOmniClient(page);
    await test.step('Assert Inventory heading', async () => {
      await expect(page.getByRole('heading', { name: 'Inventory' })).toBeVisible();
    });

    await test.step('Click first Buy button', async () => {
      const buyButton = page.getByRole('button', { name: /buy/i }).first();
      await expect(buyButton).toBeVisible({ timeout: 30_000 });
      await buyButton.click();
    });

    await test.step('Assert Orders control visible', async () => {
      await expect(page.getByRole('button', { name: /Orders/i })).toBeVisible();
    });
  });

  test('Insufficient stock shows error @regression @ui [TC-102]', async ({
    page,
  }) => {
    attachRpMeta({
      testCaseId: 'TC-102',
      description: 'UI: insufficient stock error (skipped until UI surfaces the case)',
      suites: ['regression'],
      layer: 'ui',
      service: 'omni-client',
    });
    test.skip(true, 'Wire when UI surfaces insufficient-stock errors clearly');
    await openOmniClient(page);
  });
});
