import { test, expect } from '../../shared/fixtures';
import { createOrder, listOrders } from '../../shared/api/orders';

test.describe('order-service API', () => {
  test('Create order via Order API @smoke @regression @api [TC-103]', async ({
    request,
  }) => {
    const res = await createOrder(request, {
      itemId: 'SKU-001',
      quantity: 1,
    });
    expect(res.ok(), `POST /orders → ${res.status()} ${await res.text()}`).toBeTruthy();
    const body = await res.json();
    expect(body).toHaveProperty('id');
    expect(body.itemId).toBe('SKU-001');
  });

  test('List orders @sanity @api [TC-103b]', async ({ request }) => {
    const orders = await listOrders(request);
    expect(Array.isArray(orders)).toBeTruthy();
  });
});
