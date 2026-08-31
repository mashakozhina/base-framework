import { test as setup, expect } from '../src/fixtures/pageObjects';

const STORAGE_STATE_PATH = 'playwright/.auth/user.json';

/**
 * Runs once before the authenticated tests (wired up as a project
 * dependency in playwright.config.ts). Logs in for real, then saves the
 * resulting storage state so every other test starts already
 * authenticated instead of repeating the login flow itself.
 */
setup('authenticate', async ({ page, loginPage, inventoryPage }) => {
  await loginPage.goto();
  await loginPage.login(
    process.env.SAUCEDEMO_USERNAME ?? 'standard_user',
    process.env.SAUCEDEMO_PASSWORD ?? 'secret_sauce',
  );
  await expect(inventoryPage.pageTitle).toHaveText('Products');

  await page.context().storageState({ path: STORAGE_STATE_PATH });
});
