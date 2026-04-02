# 🎯 Playwright API Automation Framework

[![Playwright Tests](https://github.com/GonzaloBaldiviezo/playwright-api-automation-framework/actions/workflows/playwright.yml/badge.svg?branch=main)](https://github.com/GonzaloBaldiviezo/playwright-api-automation-framework/actions/workflows/playwright.yml)
[![Playwright](https://img.shields.io/badge/Playwright-API%20testing-2EAD33)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6)](https://www.typescriptlang.org/)
[![Failing Demo](https://img.shields.io/badge/failing--demo-intentional-orange)](#test-strategy)

A clean, production-ready API test automation framework built with **Playwright** and **TypeScript**.

This repository demonstrates solid engineering practices: reusable abstractions, fail-fast validation, structured test layers, and a scalable foundation ready to grow from smoke tests to comprehensive API coverage.

## What this repository includes

- **Reusable `ApiClient`** — One abstraction for all HTTP operations (GET, POST, PUT, PATCH, DELETE). Centralized auth, zero repetition.
- **Lightweight response helper** — A minimal shared helper for status + JSON extraction (`expectJsonResponse`) to avoid repetitive boilerplate.
- **Fail-fast env validation** — Missing `BASE_URL` or `API_KEY`? You find out immediately, not mid-test.
- **Shared Playwright fixtures** — Inject `apiClient` into every test; zero boilerplate setup per spec.
- **Fast CI/CD** — Single Playwright project (`api`), optimized for backend validation without unnecessary overhead.
- **HTML reports** — Built-in Playwright reporter for easy debugging and CI artifacts.

## Why this design matters

- **Centralized auth** — Every request carries the API key automatically. No risk of accidentally sending auth-less requests.
- **Fixture-based injection** — Tests are clean and focused on intent, not setup. Scales smoothly as you add more fixtures (auth tokens, test data, etc.).
- **Real API execution** — Tests hit live endpoints, not mocks. Catches integration issues early.
- **Explicit configuration** — Environment variables are validated at runtime. Misconfigs fail fast, not mysteriously mid-suite.

## Test strategy

- **smoke** — Core happy paths. Does the API respond to key requests? The essentials.
- **positive** — Valid requests and expected success flows.
- **negative** — Edge cases and errors. Invalid input → 400. Missing resource → 404. Framework handles them.
- **failing-demo** — Intentionally failing cases used to demonstrate Playwright HTML reports and failure diagnostics.

The foundation is here; the framework is structured to grow from an initial smoke suite into full coverage.

## Test organization

- Positive and negative scenarios are separated into different `describe` blocks in each spec.
- Tests are tagged with `@smoke`, `@positive`, `@negative`, and `@failing-demo` so the suite can be filtered without changing files.
- Assertions stay mostly inline in specs, with a single shared response helper to keep the suite simple and explicit.
- The `@failing-demo` tests are intentionally wrong by design and exist only to generate a report with visible failures for demos.

## Testing decisions

- **Positive and negative separation** — Success and error cases live in different `describe` blocks so the HTML report is easier to scan and the suite intent is obvious.
- **Tag-driven execution** — `@smoke`, `@positive`, `@negative`, and `@failing-demo` make it possible to run targeted subsets without changing code or file layout.
- **Minimal helper approach** — The suite keeps assertions mostly inline and shares only `expectJsonResponse`, so the tests stay explicit and avoid premature abstraction.
- **Intentional demo failures** — `@failing-demo` exists to showcase how Playwright reports failed checks. Those tests are part of local/demo execution, but intentionally excluded from CI.
- **Runtime over paper contract** — When ReqRes runtime behavior differs from OpenAPI, the suite documents that gap and prioritizes stable executable checks over theoretical responses.

## Project structure

```
src/
  api/
    client.ts         ← HTTP abstraction layer
  fixtures/
    api.fixture.ts    ← Playwright fixture for apiClient injection
  utils/
    api-assertions.ts ← Shared response helper (`expectJsonResponse`)
  tests/
    users.spec.ts     ← Users coverage grouped by positive/negative
    resources.spec.ts ← Resources coverage grouped by positive/negative
    auth.spec.ts      ← Auth coverage grouped by positive/negative
    crud.spec.ts      ← Write operations grouped by positive/negative
    failing-demo.spec.ts ← Intentional failing tests for report demos
docs/
  reqres-coverage-matrix.md ← OpenAPI/runtime coverage tracking

env.ts                ← Environment & URL helpers (shared across config & client)
playwright.config.ts  ← Single API project, fast execution
package.json          ← Minimal deps: Playwright + TypeScript
```

## Quick start

1. **Install**

```bash
npm install
```

2. **Configure** — Create `.env` from the example:

```env
BASE_URL=https://reqres.in/api
API_KEY=your_api_key
```

Or copy from `.env.example`.

3. **Test**

```bash
npm test
npm run test:ci
npm run test:failing-demo
npm run test:smoke
npm run test:positive
npm run test:negative
```

4. **Report**

```bash
npm run report
```

## Testing with Reqres (sample API)

Reqres is a hosted REST API for testing — perfect for portfolio work.

**To get started:**

1. **Option A: Use your own Reqres key**
   - Sign up at [reqres.in](https://reqres.in) and obtain your API key (it's free 🙂)
   - Add it to `.env`:
   ```env
   BASE_URL=https://reqres.in/api
   API_KEY=your_reqres_api_key_here
   ```

2. **Option B: Ask for mine**
   - Contact me for a shared API key to test immediately
   - No signup friction, see the framework running right away

**Run tests:**
```bash
npm test  # Runs the full suite, including intentional failing-demo tests
npm run test:ci  # Stable suite used by CI, excludes @failing-demo
npm run test:failing-demo  # Runs only the intentional failing demo tests
npm run test:smoke  # Core health-check flow
npm run test:positive  # Successful scenarios only
npm run test:negative  # Error and edge-case scenarios only
npm run report  # View results in HTML
```

If you generate an HTML report from `npm test`, expect to see intentional failures from the `@failing-demo` tag. That behavior is deliberate for demo purposes.

This setup demonstrates real-world auth patterns: the framework always sends credentials (as shown in [src/api/client.ts](src/api/client.ts)), keeping authentication concerns centralized and separated from test logic.

## CI/CD

GitHub Actions runs the Playwright suite on every push (all branches), on pull requests to `main` and `master`, and manually via workflow dispatch using [.github/workflows/playwright.yml](.github/workflows/playwright.yml). The workflow installs dependencies with `npm ci`, runs `npm run test:ci`, and uploads the Playwright HTML report as an artifact. That means CI excludes all tests tagged `@failing-demo`.

## Implementation highlights

- **ApiClient** — Thin wrapper around Playwright's `request` context. Handles headers, path normalization, and method abstraction. ~60 lines, zero magic.
- **Response helper** — [src/utils/api-assertions.ts](src/utils/api-assertions.ts) centralizes status + JSON parsing while keeping business assertions inside each test.
- **Fixture injection** — Playwright's `test.extend()` pattern. Injects `apiClient` into every test. Clean, type-safe, extensible.
- **Environment validation** — `getRequiredEnv()` throws early if `BASE_URL` or `API_KEY` are missing. No silent failures.
- **Configuration** — Single app-level config with `normalizeBaseUrl()` to avoid trailing-slash gotchas.

## Troubleshooting

- **Tests fail immediately?** → Check `BASE_URL` and `API_KEY` in `.env`. Framework validates these at startup.
- **`npm test` fails but CI passes?** → Check whether the failures come from `@failing-demo`. Those tests are intentionally wrong and are excluded from CI.
- **404 on valid endpoint?** → Keep `BASE_URL` as the API root (e.g., `https://reqres.in/api`). The framework normalizes trailing slashes automatically.
- **External API flaky?** → Retry with `curl` to confirm if it's the framework or the service.

---

Built with intention. Ready to scale. Open to your feedback.