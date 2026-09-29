import { test, expect } from '../../shared/fixtures';
import {
  listNotifications,
  sendNotification,
} from '../../shared/api/notifications';
import { attachRpMeta } from '../../shared/helpers/rp';

test.describe('notification-service API', () => {
  test('Send / list notifications via API @smoke @regression @api [TC-105]', async ({
    request,
  }) => {
    attachRpMeta({
      testCaseId: 'TC-105',
      description: 'Send a notification via POST /notifications then list via GET',
      suites: ['smoke', 'regression'],
      layer: 'api',
      service: 'notification',
    });

    const res = await sendNotification(request, {
      recipient: 'qa@example.com',
      message: 'Playwright PoC notification [TC-105]',
      channel: 'EMAIL',
    });
    await test.step('Assert notification accepted', async () => {
      const status = res.status();
      const text = await res.text();
      expect(res.ok(), `POST /notifications → ${status} ${text}`).toBeTruthy();
    });

    const logs = await listNotifications(request);
    await test.step('Assert notification logs non-empty', async () => {
      expect(Array.isArray(logs)).toBeTruthy();
      expect(logs.length).toBeGreaterThan(0);
    });
  });
});
