# base-framework

A reusable test automation framework template: **TypeScript + Playwright** for UI tests and **TypeScript + Jest** for API tests, built around OOP/SOLID principles.

This repo isn't meant to be run as-is for a real project — it's a **starting point**. When you need a framework for a specific task (e.g. an interview take-home), copy this repo, rename it, and fill in the pages/clients/tests for that task.

## Layout

```
base-framework/
├── ui-tests/      # Playwright + TypeScript UI tests (Page Object Model)
└── api-tests/      # Jest + TypeScript API tests
```

Each folder is a self-contained npm workspace — you can also copy just `ui-tests/` or just `api-tests/` alone if a task only needs one.

## Getting started

```bash
npm install
cp ui-tests/.env.example ui-tests/.env
cp api-tests/.env.example api-tests/.env
```

Each `.env.example` lists the variables that folder's tests read (e.g. `BASE_URL`, `BASIC_AUTH_USERNAME`) — copy it to `.env` and fill in real values for your task. `.env` is gitignored and only used for local runs.

Running in CI (e.g. GitHub Actions) is the second option: skip `.env` entirely and set the same variable names as repo/workflow secrets instead. There's no central config layer — `process.env.X` is read directly wherever it's needed (`ui-tests/playwright.config.ts`; `api-tests/fixtures/*/app-data.ts`), so no code changes are needed to switch between the two.

Run everything:

```bash
npm test
```

Run one suite:

```bash
npm run test:ui
npm run test:api
```

## Conventions

- **Page objects** (`ui-tests/src/pages`) extend `BasePage` and receive their `Page` via constructor injection — one page, one class (`LoginPage`, `InventoryPage`, `CartPage`). New pages are added, existing ones aren't reshaped, to support new specs (OCP).
- **Page objects are wired into specs via a fixture** (`ui-tests/src/fixtures/pageObjects.fixture.ts`) — specs never do `new SomePage(page)` themselves (DIP).
- **Locators use `getByTestId`**, configured via `testIdAttribute: 'data-test'` in `playwright.config.ts` to match the target site's actual test-hook attribute (Playwright's own default is `data-testid` — check what the real site uses before assuming). Falls back to structural locators (`.filter({ hasText })`) only where no test hook exists.
- **No manual waits/sleeps** — Playwright auto-waits on actionability before every action, and `expect(locator).toHaveText(...)`-style assertions auto-retry until their timeout. A `page.waitForTimeout(...)` in a spec is a smell, not a fix.
- **Auth is reused, not repeated**: `tests/auth.setup.ts` runs once (wired as a project `dependencies: ['setup']` in `playwright.config.ts`), logs in for real, and saves `playwright/.auth/user.json` via `storageState`. Every other project/spec starts already authenticated from that file — `login.spec.ts` is the one exception, overriding back to a clean unauthenticated state via `test.use({ storageState: { cookies: [], origins: [] } })` since login itself is what it's testing. The saved state is gitignored (`**/playwright/.auth/`) — it holds real session cookies.
- **CI**: `.github/workflows/playwright.yml` installs deps, installs the Chromium browser, and runs the suite on push/PR to `main`, uploading the HTML report as an artifact.
- **API controllers** (`api-tests/src/controllers`) each wrap one resource — `Houses`, `Feedback`. Each builds its own `HttpClient` from `fixtures/{service}/app-data.ts` (endpoint + default headers) and takes an optional `headers` override in its constructor — a new resource gets its own controller, not a branch in an existing one (SRP + OCP).
- **Fixtures** (`api-tests/fixtures/{service}/app-data.ts`) hold the endpoint and default headers for one backend service — a plain `getDefaultHeaders()` function reading `process.env` directly, no central config layer, no helper import (`dotenv` is preloaded once via `jest.config.ts`, so fixtures just read `process.env.X`). Resources on the same host share one `app-data.ts` (`Houses` and `Feedback` both use `fixtures/wizard-world/app-data.ts`); a task hitting a second service adds a second folder. Query-param builders (`query-params.ts`) belong alongside it once a resource has real filters to build.
- **`HttpClient`** (`api-tests/src/utils/http-client.ts`) takes headers per call rather than baking them into the instance, and carries cookies across calls via an injected `ICookieHolder` (`api-tests/src/controllers/{cookie-holder,simple-cookie-holder}.ts`) — any `Set-Cookie` on a response is appended to the next request's `Cookie` header, for login-then-act flows.
- **Auth**: Basic auth only, built inline in a fixture's `getDefaultHeaders()` from `BASIC_AUTH_USERNAME`/`BASIC_AUTH_PASSWORD` in `.env`. If a task needs a different auth style later, add it there — this template doesn't guess in advance.
- **`handleError`** (`api-tests/src/utils/error-handler.ts`) wraps a controller call's `.catch()` to log request context before rethrowing, so a failure is easier to debug from CI output.
- **Types are segregated per resource** (`api-tests/src/interfaces`, `api-tests/src/enums`) rather than gathered into one shared interface.
- **One test file per action**, grouped by resource: `api-tests/tests/houses/get-houses.test.ts`, `api-tests/tests/feedback/send-feedback.test.ts`. Each file covers one endpoint's scenarios (happy path + edge cases) — a new action gets a new file, not a longer existing one.
