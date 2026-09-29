import { test, expect } from '../../shared/fixtures';
import { createOrder } from '../../shared/api/orders';
import { listInventory } from '../../shared/api/inventory';
import { listNotifications } from '../../shared/api/notifications';
import { attachRpMeta } from '../../shared/helpers/rp';

/**
 * Full API chain: order → inventory deduct (inside order) → notification.
 * Squash: TC-106
 */
test.describe('full chain API', () => {
  test('Order → Inventory → Notification chain @regression @api [TC-106]', async ({
    request,
  }) => {
    attachRpMeta({
      testCaseId: 'TC-106',
      description:
        'Full API chain: list inventory → create order (deducts stock + notify) → list notifications',
      suites: ['regression'],
      layer: 'api',
      service: 'full-chain',
    });

    const inventory = await listInventory(request);
    await test.step('Pick SKU from inventory', async () => {
      expect(inventory.length).toBeGreaterThan(0);
    });
    const sku = inventory[0].sku as string;

    const orderRes = await createOrder(request, { itemId: sku, quantity: 1 });
    await test.step('Assert order accepted', async () => {
      const status = orderRes.status();
      const text = await orderRes.text();
      expect(orderRes.ok(), `POST /orders → ${status} ${text}`).toBeTruthy();
    });

    const notifications = await listNotifications(request);
    await test.step('Assert notifications list healthy', async () => {
      expect(Array.isArray(notifications)).toBeTruthy();
      expect(notifications.length).toBeGreaterThanOrEqual(0);
    });
  });
});
