import { APIRequestContext, expect, test } from '@playwright/test';
import { getUrls } from '../../config/environments';
import { rpInfo } from '../helpers/rp';

export async function listInventory(request: APIRequestContext) {
  return test.step('GET /inventory', async () => {
    const url = `${getUrls().inventory}/inventory`;
    const res = await request.get(url);
    rpInfo(`GET ${url} → ${res.status()}`);
    expect(res.ok(), `GET /inventory → ${res.status()}`).toBeTruthy();
    return res.json();
  });
}

export async function deductStock(
  request: APIRequestContext,
  body: { sku: string; quantity: number },
) {
  return test.step(`POST /inventory/deduct (${body.sku} x${body.quantity})`, async () => {
    const url = `${getUrls().inventory}/inventory/deduct`;
    const res = await request.post(url, { data: body });
    rpInfo(`POST ${url} body=${JSON.stringify(body)} → ${res.status()}`);
    return res;
  });
}
