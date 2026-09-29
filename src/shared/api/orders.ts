import { APIRequestContext, expect, test } from '@playwright/test';
import { getUrls } from '../../config/environments';
import { rpInfo } from '../helpers/rp';

export async function listOrders(request: APIRequestContext) {
  return test.step('GET /orders', async () => {
    const url = `${getUrls().order}/orders`;
    const res = await request.get(url);
    rpInfo(`GET ${url} → ${res.status()}`);
    expect(res.ok(), `GET /orders → ${res.status()}`).toBeTruthy();
    return res.json();
  });
}

export async function createOrder(
  request: APIRequestContext,
  body: { itemId: string; quantity: number },
) {
  return test.step(`POST /orders (${body.itemId} x${body.quantity})`, async () => {
    const url = `${getUrls().order}/orders`;
    const res = await request.post(url, { data: body });
    rpInfo(`POST ${url} body=${JSON.stringify(body)} → ${res.status()}`);
    return res;
  });
}
