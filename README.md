# 🎯 Playwright API Automation Framework

A clean, production-ready API test automation framework built with **Playwright** and **TypeScript**.

This repository demonstrates solid engineering practices: reusable abstractions, fail-fast validation, structured test layers, and a scalable foundation ready to grow from smoke tests to comprehensive API coverage.

## What this repository includes

- **Reusable `ApiClient`** — One abstraction for all HTTP operations (GET, POST, PUT, PATCH, DELETE). Centralized auth, zero repetition.
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
- **negative** — Edge cases and errors. Invalid input → 400. Missing resource → 404. Framework handles them.
- **contract** — Beyond status codes. Verify response shape and critical fields match expectations.

The foundation is here; the framework is structured to grow from an initial smoke suite into full coverage.

## Project structure

```
src/
  api/
    client.ts         ← HTTP abstraction layer
  fixtures/
    api.fixture.ts    ← Playwright fixture for apiClient injection
  tests/
    users.spec.ts     ← Example: smoke test for users endpoint

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
npm test  # Runs against Reqres live endpoints
npm run report  # View results in HTML
```

This setup demonstrates real-world auth patterns: the framework always sends credentials (as shown in [src/api/client.ts](src/api/client.ts)), keeping authentication concerns centralized and separated from test logic.

## Implementation highlights

- **ApiClient** — Thin wrapper around Playwright's `request` context. Handles headers, path normalization, and method abstraction. ~60 lines, zero magic.
- **Fixture injection** — Playwright's `test.extend()` pattern. Injects `apiClient` into every test. Clean, type-safe, extensible.
- **Environment validation** — `getRequiredEnv()` throws early if `BASE_URL` or `API_KEY` are missing. No silent failures.
- **Configuration** — Single app-level config with `normalizeBaseUrl()` to avoid trailing-slash gotchas.

## Troubleshooting

- **Tests fail immediately?** → Check `BASE_URL` and `API_KEY` in `.env`. Framework validates these at startup.
- **404 on valid endpoint?** → Keep `BASE_URL` as the API root (e.g., `https://reqres.in/api`). The framework normalizes trailing slashes automatically.
- **External API flaky?** → Retry with `curl` to confirm if it's the framework or the service.

---

Built with intention. Ready to scale. Open to your feedback.