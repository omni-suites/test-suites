import { APIRequestContext, expect } from '@playwright/test';
import { getUrls } from '../../config/environments';

export async function listInventory(request: APIRequestContext) {
  const res = await request.get(`${getUrls().inventory}/inventory`);
  expect(res.ok(), `GET /inventory → ${res.status()}`).toBeTruthy();
  return res.json();
}

export async function deductStock(
  request: APIRequestContext,
  body: { sku: string; quantity: number },
) {
  const res = await request.post(`${getUrls().inventory}/inventory/deduct`, {
    data: body,
  });
  return res;
}
