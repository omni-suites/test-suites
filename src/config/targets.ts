/**
 * Execution targets for filtering / documenting what a run covers.
 * Suites themselves are tags (@smoke | @sanity | @regression), not folders.
 */
export type Target =
  | 'omni-client'
  | 'order'
  | 'inventory'
  | 'notification'
  | 'full-chain';

export const TARGETS: Target[] = [
  'omni-client',
  'order',
  'inventory',
  'notification',
  'full-chain',
];

/** Map target → path under services/ (for --grep path or docs). */
export const targetPaths: Record<Exclude<Target, 'full-chain'>, string> = {
  'omni-client': 'services/omni-client',
  order: 'services/order',
  inventory: 'services/inventory',
  notification: 'services/notification',
};
