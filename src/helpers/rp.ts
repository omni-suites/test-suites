import { ReportingApi } from '@reportportal/agent-js-playwright';
import { isReportPortalEnabled } from '@config/reportportal';

export type RpMeta = {
  /** Squash / RP test case id, e.g. TC-103 */
  testCaseId: string;
  description: string;
  /** Suite tags without @: smoke | sanity | regression */
  suites?: Array<'smoke' | 'sanity' | 'regression'>;
  layer?: 'ui' | 'api';
  service?: string;
};

/** Attach RP Item Details + attributes (no-op if ReportPortal agent is off). */
export function attachRpMeta(meta: RpMeta): void {
  if (!isReportPortalEnabled()) return;

  ReportingApi.setTestCaseId(meta.testCaseId);
  ReportingApi.setDescription(meta.description);

  const attributes: Array<{ key?: string; value: string }> = [
    { key: 'squash', value: meta.testCaseId },
  ];
  if (meta.layer) attributes.push({ key: 'layer', value: meta.layer });
  if (meta.service) attributes.push({ key: 'service', value: meta.service });
  for (const suite of meta.suites ?? []) {
    attributes.push({ key: 'suite', value: suite });
  }
  ReportingApi.addAttributes(attributes);
}

/** Info log visible in ReportPortal ALL LOGS (no-op if agent off). */
export function rpInfo(message: string): void {
  if (!isReportPortalEnabled()) return;
  ReportingApi.info(message);
}
