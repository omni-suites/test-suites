import { APIRequestContext, expect, test } from '@playwright/test';
import { getUrls } from '@config/environments';
import { rpInfo } from '@helpers/rp';

export async function listNotifications(request: APIRequestContext) {
  return test.step('GET /notifications', async () => {
    const url = `${getUrls().notification}/notifications`;
    const res = await request.get(url);
    rpInfo(`GET ${url} → ${res.status()}`);
    expect(res.ok(), `GET /notifications → ${res.status()}`).toBeTruthy();
    return res.json();
  });
}

export async function sendNotification(
  request: APIRequestContext,
  body: { recipient: string; message: string; channel?: string },
) {
  return test.step(`POST /notifications (${body.channel ?? 'default'})`, async () => {
    const url = `${getUrls().notification}/notifications`;
    const res = await request.post(url, { data: body });
    rpInfo(`POST ${url} recipient=${body.recipient} → ${res.status()}`);
    return res;
  });
}
