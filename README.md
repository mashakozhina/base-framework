# base-framework

A reusable test automation framework template: **TypeScript + Playwright** for UI tests and **TypeScript + Jest** for API tests, built around OOP/SOLID principles.

This repo isn't meant to be run as-is for a real project — it's a **starting point**. When you need a framework for a specific task (e.g. an interview take-home), copy this repo, rename it, and fill in the pages/clients/tests for that task.

## Layout

```
base-framework/
├── ui-tests/      # Playwright + TypeScript UI tests (Page Object Model)
└── api-tests/      # Jest + TypeScript API tests
```

Each folder is a self-contained npm workspace. You can also copy just `ui-tests/` or just `api-tests/` alone if a task only needs one.

## Getting started

Each `.env.example` lists the variables that folder's tests read (e.g. `BASE_URL`, `BASIC_AUTH_USERNAME`). Copy it to `.env` and fill in real values for your task. `.env` is gitignored and only used for local runs.

```bash
npm install
cp ui-tests/.env.example ui-tests/.env
cp api-tests/.env.example api-tests/.env
```

Running in CI (e.g. GitHub Actions) is the second option: skip `.env` entirely and set the same variable names as repo/workflow secrets instead.

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

### UI tests (`ui-tests`)

- **Page objects (Encapsulation, DRY):** `LoginPage`, `InventoryPage`, `CartPage` extend `BasePage`. They hide locators behind readonly properties and expose actions instead (`login()`, `addToCart()`). `BasePage` declares an abstract `assertPageOpened()` that every subclass must implement (Liskov Substitution Principle).
- **Fixture-based injection (Dependency Inversion Principle):** specs never call `new LoginPage(page)` directly. `src/fixtures/pageObjects.ts` extends Playwright's `test` via `base.extend<Pages>({...})`, so pages are injected as fixtures.
- **Page Factory Integration:** Rather than instantiating pages directly inside the tests, a dedicated Page Factory abstracts page creation., keeping test files clean and supporting dynamic runtime page generation.`src/fixtures/pageObjects.ts` extends Playwright's `test` via `base.extend<Pages>({...})`, so pages are injected as fixtures.
- **Stable selectors:** `testIdAttribute: 'data-test'` is set globally in `playwright.config.ts`; elements are found with `getByTestId()`.
- **No manual waits:** Playwright's auto-waiting and auto-retrying assertions (e.g. `expect(locator).toHaveText(...)`) handle timing.
- **Auth reuse:** `tests/auth.setup.ts` runs once as a `dependencies: ['setup']` project, logs in, and saves `playwright/.auth/user.json` via `storageState`. Every other spec starts pre-authenticated from that file, except `login.spec.ts`, which resets to a clean state with `test.use({ storageState: { cookies: [], origins: [] } })` since it's testing login itself.

### API tests (`api-tests`)

- **Fixtures per service:** `fixtures/{service}/app-data.ts` holds the baseUrl and default headers for one backend, read straight from `process.env` (`dotenv` is preloaded once in `jest.config.ts`. no config layer in between). Resources on the same host share one `app-data.ts` (`Houses` and `Feedback` both use `fixtures/wizard-world/app-data.ts`). A new service gets its own folder.
- **Controllers per resource (Single Responsibility):** `src/controllers` has one controller per resource (`Houses`, `Feedback`), and each method on it maps to one endpoint of that resource — `Houses.getHouses()` → `GET /Houses`, `Houses.getHouseById()` → `GET /Houses/{id}`, `Feedback.sendFeedback()` → `POST /Feedback`. Each controller builds its own `HttpClient` from that resource's fixture and takes an optional `headers` override in its constructor.
- **`HttpClient`** (`src/utils/http-client.ts`) takes headers per call, and carries cookies across calls via an injected `ICookieHolder` (`src/controllers/cookie-holder.ts`). Any `Set-Cookie` on a response is added to the next request's `Cookie` header.
- **`handleError`** (`src/utils/error-handler.ts`) wraps a controller call's `.catch()` to log request context before rethrowing, so failures are easier to debug from CI output.
- **Types per resource:** `src/interfaces` and `src/enums` are created per resource.
- **One test file per endpoint**, grouped by resource: `tests/houses/get-houses.test.ts` (`GET /Houses`), `tests/houses/get-house-by-id.test.ts` (`GET /Houses/{id}`), `tests/feedback/send-feedback.test.ts` (`POST /Feedback`). Each file covers that endpoint's status-code scenarios (e.g. 200, 400) and schema validation. A new endpoint gets a new file.
- **Auth:** Basic auth only, built inline in a fixture's `getDefaultHeaders()` from `BASIC_AUTH_USERNAME`/`BASIC_AUTH_PASSWORD`. A different auth style gets added when a task actually needs one.
- **Builder Pattern:** test data generation, no hardcoded JSON payloads (`function generateFeedback()`).

### Shared

- **Config is injected at runtime (DIP):** nothing is hardcoded. `playwright.config.ts` reads `baseURL: process.env.BASE_URL ?? '...'`; API fixtures read `process.env.X` directly. Neither package has a central config layer.
- **CI:** `.github/workflows/tests.yml` runs on every push/PR to `main` — one job for `api-tests`, one for `ui-tests` (Chromium only). Screenshots are captured `only-on-failure`, video and traces `on-first-retry`, and the Jest/Playwright HTML reports are uploaded as workflow artifacts.
