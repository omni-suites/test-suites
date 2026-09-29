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
  reporters/                    # optional Squash sync (stub)
.github/workflows/
  e2e.yml
  nightly-regression.yml
  post-deploy-smoke.yml
```

| Tags (suite) | Tags (layer) | Squash |
|--------------|--------------|--------|
| `@smoke` `@sanity` `@regression` | `@ui` `@api` | `[TC-101]` in test titles |

## Setup

```bash
npm ci
npx playwright install chromium
cp .env.sample .env
# fill required URLs + ReportPortal key in .env
```

`.env` is loaded by `playwright.config.ts` (dotenv). Missing `FRONTEND_URL` / `ORDER_URL` / `INVENTORY_URL` / `NOTIFICATION_URL` fails fast.

## Run locally

```bash
npm test
npm run test:smoke
npm run test:api
npm run test:ui
npm run test:regression
npm run report          # local Playwright HTML report
```

## ReportPortal

Reporting is on when `RP_API_KEY` is set (`RP_ENABLED=false` to skip).

| Variable | Purpose |
|----------|---------|
| `RP_ENDPOINT` | e.g. `https://report-portal.test-suites-poc.work.gd/api/v2` |
| `RP_PROJECT` | e.g. `omni-suites` |
| `RP_API_KEY` | Profile → API keys (never commit) |
| `RP_LAUNCH` | Launch name (optional locally) |
| `RP_DESCRIPTION` | Launch description (optional) |

After a run: ReportPortal → **omni-suites** → Launches. Local HTML report stays separate (`npm run report`).

## CI

| Workflow | Trigger | Suite |
|----------|---------|--------|
| `e2e.yml` | `workflow_dispatch` | chosen tag (`smoke` / `api` / … / `all`) |
| `nightly-regression.yml` | schedule + manual | `@regression` |
| `post-deploy-smoke.yml` | `workflow_call` / manual | `@smoke` |

Configure GitHub **Environment `staging`** (or repo vars/secrets):

| Type | Names |
|------|--------|
| vars | `FRONTEND_URL`, `ORDER_URL`, `INVENTORY_URL`, `NOTIFICATION_URL`, `RP_ENDPOINT`, `RP_PROJECT` |
| secret | `RP_API_KEY` |

CI sets `RP_LAUNCH` / `RP_DESCRIPTION` per run (suite + `run_id` / commit). Playwright HTML is also uploaded as a workflow artifact.
