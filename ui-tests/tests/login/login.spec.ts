import { test, expect } from '../../src/fixtures/pageObjects';

// Login itself is what's under test here, so start unauthenticated.
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.verifyPageOpened();
  });

  test('logs in successfully with valid credentials', async ({
    page,
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.login(
      process.env.SAUCEDEMO_USERNAME ?? 'standard_user',
      process.env.SAUCEDEMO_PASSWORD ?? 'secret_sauce',
    );

    await inventoryPage.verifyPageOpened();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('rejects login with an invalid password', async ({ page, loginPage }) => {
    await loginPage.login(process.env.SAUCEDEMO_USERNAME ?? 'standard_user', 'wrong_password');

    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Username and password do not match any user in this service',
    );
    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
  });
});
