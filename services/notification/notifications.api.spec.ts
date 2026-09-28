import { test, expect } from '../../shared/fixtures';
import {
  listNotifications,
  sendNotification,
} from '../../shared/api/notifications';

test.describe('notification-service API', () => {
  test('Send / list notifications via API @smoke @regression @api [TC-105]', async ({
    request,
  }) => {
    const res = await sendNotification(request, {
      recipient: 'qa@example.com',
      message: 'Playwright PoC notification [TC-105]',
      channel: 'EMAIL',
    });
    expect(
      res.ok(),
      `POST /notifications → ${res.status()} ${await res.text()}`,
    ).toBeTruthy();

    const logs = await listNotifications(request);
    expect(Array.isArray(logs)).toBeTruthy();
    expect(logs.length).toBeGreaterThan(0);
  });
});
