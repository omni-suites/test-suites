import { test, expect } from '@fixtures';
import { createOrder, listOrders } from '@services/order/api';
import { attachRpMeta } from '@helpers/rp';

test.describe('order-service API', () => {
  test('Create order via Order API @smoke @regression @api [TC-103]', async ({
    request,
  }) => {
    attachRpMeta({
      testCaseId: 'TC-103',
      description: 'Create an order via POST /orders (SKU-001, qty 1)',
      suites: ['smoke', 'regression'],
      layer: 'api',
      service: 'order',
    });

    const res = await createOrder(request, {
      itemId: 'SKU-001',
      quantity: 1,
    });
    await test.step('Assert order created', async () => {
      const status = res.status();
      const text = await res.text();
      expect(res.ok(), `POST /orders → ${status} ${text}`).toBeTruthy();
      const body = JSON.parse(text);
      expect(body).toHaveProperty('id');
      expect(body.itemId).toBe('SKU-001');
    });
  });

  test('List orders @sanity @api [TC-103b]', async ({ request }) => {
    attachRpMeta({
      testCaseId: 'TC-103b',
      description: 'List orders via GET /orders',
      suites: ['sanity'],
      layer: 'api',
      service: 'order',
    });

    const orders = await listOrders(request);
    await test.step('Assert orders is an array', async () => {
      expect(Array.isArray(orders)).toBeTruthy();
    });
  });
});
