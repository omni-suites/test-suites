import { test, expect } from '../../shared/fixtures';
import { openOmniClient } from '../../shared/helpers/ui';

test.describe('omni-client — place order', () => {
  test('Place valid order end-to-end @smoke @regression @ui [TC-101]', async ({
    page,
  }) => {
    await openOmniClient(page);
    await expect(page.getByRole('heading', { name: 'Inventory' })).toBeVisible();

    // Buy first available SKU card (seeded inventory)
    const buyButton = page.getByRole('button', { name: /buy/i }).first();
    await expect(buyButton).toBeVisible({ timeout: 30_000 });
    await buyButton.click();

    // Orders count in header should eventually update (best-effort for PoC)
    await expect(page.getByRole('button', { name: /Orders/i })).toBeVisible();
  });

  test('Insufficient stock shows error @regression @ui [TC-102]', async ({
    page,
  }) => {
    test.skip(true, 'Wire when UI surfaces insufficient-stock errors clearly');
    await openOmniClient(page);
  });
});
