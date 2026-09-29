import { APIRequestContext, expect } from '@playwright/test';
import { getUrls } from '../../config/environments';

export async function listNotifications(request: APIRequestContext) {
  const res = await request.get(`${getUrls().notification}/notifications`);
  expect(res.ok(), `GET /notifications → ${res.status()}`).toBeTruthy();
  return res.json();
}

export async function sendNotification(
  request: APIRequestContext,
  body: { recipient: string; message: string; channel?: string },
) {
  const res = await request.post(`${getUrls().notification}/notifications`, {
    data: body,
  });
  return res;
}
