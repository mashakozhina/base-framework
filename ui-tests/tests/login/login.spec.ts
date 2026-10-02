import { test, expect } from '../../src/fixtures/pageObjects';
import { routes } from '../../src/fixtures/routes';
import { customers } from '../../src/fixtures/customer';
import { errorMessageType } from '../../src/fixtures/errorType';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login-', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto(routes.login);
    await loginPage.verifyPageOpened();
  });

  test('valid credentials lead on the inventory page and show the product list', async ({
    page,
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.login(customers.standard.username, customers.standard.password);
    await inventoryPage.verifyPageOpened();
    await expect(page).toHaveURL(routes.inventory);
  });

  test('invalid username/password combination shows an error message', async ({
    page,
    loginPage,
  }) => {
    await loginPage.login(customers.invalidPassword.username, customers.invalidPassword.password);
    await loginPage.assertErrorMessage(errorMessageType.invalidCredentials);
    await expect(page).toHaveURL(routes.login);
  });

  test('locked-out user shows a specific error message', async ({ loginPage }) => {
    const lockedOutUser = customers.lockedOut;
    await loginPage.login(lockedOutUser.username, lockedOutUser.password);
    await loginPage.assertErrorMessage(errorMessageType.lockedOutUser);
  });
});
