import { test, expect } from '../../shared/fixtures';
import { deductStock, listInventory } from '../../shared/api/inventory';

test.describe('inventory-service API', () => {
  test('List inventory @smoke @api [TC-104a]', async ({ request }) => {
    const items = await listInventory(request);
    expect(Array.isArray(items)).toBeTruthy();
    expect(items.length).toBeGreaterThan(0);
  });

  test('Deduct stock via Inventory API @smoke @regression @api [TC-104]', async ({
    request,
  }) => {
    const before = await listInventory(request);
    const sku = before[0]?.sku ?? 'SKU-001';
    const item = before.find((i: { sku: string }) => i.sku === sku);
    const qtyBefore = item?.availableQuantity ?? item?.quantity;

    const res = await deductStock(request, { sku, quantity: 1 });
    expect(res.ok(), `POST /inventory/deduct → ${res.status()}`).toBeTruthy();

    const after = await listInventory(request);
    const updated = after.find((i: { sku: string }) => i.sku === sku);
    if (typeof qtyBefore === 'number' && updated) {
      const qtyAfter = updated.availableQuantity ?? updated.quantity;
      expect(qtyAfter).toBe(qtyBefore - 1);
    }
  });
});
