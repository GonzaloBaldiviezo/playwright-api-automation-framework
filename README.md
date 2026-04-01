# Playwright API Automation Framework

Portfolio-oriented API test automation framework built with Playwright + TypeScript.

## What this repository includes

- Reusable `ApiClient` wrapper for HTTP methods.
- Required environment variable validation (`BASE_URL`, `API_KEY`).
- Shared Playwright fixture to inject `apiClient` into tests.
- Single Playwright API project for fast CI execution.
- HTML report generation.

## Test strategy

- `smoke`: validate key endpoints and expected happy paths.
- `negative`: cover expected API failures such as `400` and `404`.
- `contract`: verify response shape and critical fields, not just status codes.

This repository currently starts with a small smoke suite and is structured to grow into a broader API portfolio.

## Design decisions

- A single Playwright `api` project keeps execution fast and focused on backend validation.
- `ApiClient` centralizes authentication and request behavior to keep specs small.
- Environment validation fails fast so missing configuration is detected immediately.
- The framework targets real API execution instead of mocked-only flows.

## Project structure

```
src/
	api/
		client.ts
	config/
		env.ts
	fixtures/
		api.fixture.ts
	tests/
		users.spec.ts
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` with required variables:

```env
BASE_URL=https://reqres.in/api
API_KEY=your_api_key
```

You can also copy the structure from `.env.example`.

## Run tests

```bash
npm test
```

## View report

```bash
npm run report
```

## Troubleshooting

- If tests fail before execution starts, verify `BASE_URL` and `API_KEY` are defined.
- If a request unexpectedly hits the wrong path, keep `BASE_URL` pointed to the API root such as `https://reqres.in/api`; the framework already normalizes the trailing slash.
- If Reqres rate-limits or changes behavior, re-run the same request with `curl` to confirm whether the issue is in the framework or the external service.