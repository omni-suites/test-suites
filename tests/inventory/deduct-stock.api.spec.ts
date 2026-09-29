import { test, expect } from '@fixtures';
import { deductStock, listInventory } from '@services/inventory/api';
import { attachRpMeta } from '@helpers/rp';

test.describe('inventory-service API', () => {
  test('List inventory @smoke @api [TC-104a]', async ({ request }) => {
    attachRpMeta({
      testCaseId: 'TC-104a',
      description: 'List inventory items via GET /inventory',
      suites: ['smoke'],
      layer: 'api',
      service: 'inventory',
    });

    const items = await listInventory(request);
    await test.step('Assert inventory non-empty', async () => {
      expect(Array.isArray(items)).toBeTruthy();
      expect(items.length).toBeGreaterThan(0);
    });
  });

  test('Deduct stock via Inventory API @smoke @regression @api [TC-104]', async ({
    request,
  }) => {
    attachRpMeta({
      testCaseId: 'TC-104',
      description: 'Deduct stock via POST /inventory/deduct and verify quantity decreased',
      suites: ['smoke', 'regression'],
      layer: 'api',
      service: 'inventory',
    });

    const before = await listInventory(request);
    const sku = before[0]?.sku ?? 'SKU-001';
    const item = before.find((i: { sku: string }) => i.sku === sku);
    const qtyBefore = item?.availableQuantity ?? item?.quantity;

    const res = await deductStock(request, { sku, quantity: 1 });
    await test.step('Assert deduct succeeded', async () => {
      expect(res.ok(), `POST /inventory/deduct → ${res.status()}`).toBeTruthy();
    });

    const after = await listInventory(request);
    await test.step('Assert quantity decreased by 1', async () => {
      const updated = after.find((i: { sku: string }) => i.sku === sku);
      if (typeof qtyBefore === 'number' && updated) {
        const qtyAfter = updated.availableQuantity ?? updated.quantity;
        expect(qtyAfter).toBe(qtyBefore - 1);
      }
    });
  });
});
