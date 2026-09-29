# test-suites

Central Playwright **UI + API** automation for the omni-suites PoC.

Organize by **service/domain**. Classify runs with **tags** — not smoke/sanity/regression folders.

## Layout

```text
playwright.config.ts
src/
  services/<domain>/*.spec.ts
  shared/{api,fixtures,helpers}
  config/{environments,reportportal}.ts
  reporters/                 # optional Squash sync (stub)
.github/workflows/
```

| Tags (suite) | Tags (layer) | Squash |
|--------------|--------------|--------|
| `@smoke` `@sanity` `@regression` | `@ui` `@api` | `[TC-101]` in test titles |

## Setup

```bash
npm ci
npx playwright install
cp .env.sample .env
```

`.env` is loaded automatically by `playwright.config.ts` (dotenv).

## Run

```bash
npm test
npm run test:smoke
npm run test:api
npm run test:ui
npm run test:regression
```

Set required URLs in `.env` (`FRONTEND_URL`, `ORDER_URL`, `INVENTORY_URL`, `NOTIFICATION_URL`). See `.env.sample`. Missing vars fail fast at startup.

## ReportPortal

Set in `.env` (never commit the API key):

- `RP_ENDPOINT` — e.g. `https://report-portal.test-suites-poc.work.gd/api/v2`
- `RP_PROJECT` — e.g. `omni-suites`
- `RP_API_KEY` — from ReportPortal → Profile → API keys
- `RP_LAUNCH` / `RP_DESCRIPTION` — optional
- `RP_ENABLED=false` — disable reporting without removing the key

After a run, open ReportPortal → project **omni-suites** → Launches.
