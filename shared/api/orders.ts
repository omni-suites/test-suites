import { APIRequestContext, expect } from '@playwright/test';
import { getUrls } from '../../config/environments';

export async function listOrders(request: APIRequestContext) {
  const res = await request.get(`${getUrls().order}/orders`);
  expect(res.ok(), `GET /orders → ${res.status()}`).toBeTruthy();
  return res.json();
}

export async function createOrder(
  request: APIRequestContext,
  body: { itemId: string; quantity: number },
) {
  const res = await request.post(`${getUrls().order}/orders`, { data: body });
  return res;
}
