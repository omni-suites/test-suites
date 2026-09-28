# test-suites

Central Playwright **UI + API** automation for the omni-suites PoC.

Organize by **service/domain**. Classify runs with **tags** — not smoke/sanity/regression folders.

## Layout

```text
services/<domain>/*.spec.ts
shared/{api,fixtures,helpers}
config/{environments,targets}.ts
reporters/                      # optional Squash sync (stub)
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

## Run

```bash
npm test
npm run test:smoke
npm run test:api
npm run test:ui
npm run test:regression

# Against Traefik staging hosts
TEST_ENV=staging npm run test:smoke
```

URLs come from `config/environments.ts` (override via `.env`: `FRONTEND_URL`, `ORDER_URL`, …).
