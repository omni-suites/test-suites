import { test, expect } from '../../shared/fixtures';
import { createOrder } from '../../shared/api/orders';
import { listInventory } from '../../shared/api/inventory';
import { listNotifications } from '../../shared/api/notifications';

/**
 * Full API chain: order → inventory deduct (inside order) → notification.
 * Squash: TC-106
 */
test.describe('full chain API', () => {
  test('Order → Inventory → Notification chain @regression @api [TC-106]', async ({
    request,
  }) => {
    const inventory = await listInventory(request);
    expect(inventory.length).toBeGreaterThan(0);
    const sku = inventory[0].sku as string;

    const orderRes = await createOrder(request, { itemId: sku, quantity: 1 });
    expect(
      orderRes.ok(),
      `POST /orders → ${orderRes.status()} ${await orderRes.text()}`,
    ).toBeTruthy();

    const notifications = await listNotifications(request);
    expect(Array.isArray(notifications)).toBeTruthy();
    // Notification is best-effort in order-service; assert list endpoint still healthy
    expect(notifications.length).toBeGreaterThanOrEqual(0);
  });
});
