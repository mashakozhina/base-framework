import { test, expect } from '../../src/fixtures/pageObjects';
import { routes } from '../../src/fixtures/routes';
import { products } from '../../src/fixtures/products';

// No login step here — this project's storageState (from auth.setup.ts)
// already starts every test authenticated.
test.describe('Cart', () => {
  test('adding item updates the cart count and contents', async ({ inventoryPage, cartPage }) => {
    const { name, slug } = products.sauceLabsBackpack;
    await inventoryPage.goto(routes.inventory);
    await inventoryPage.assertPageOpened();

    await inventoryPage.addToCart(slug);
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.openCart();
    await cartPage.assertPageOpened();
    await expect(cartPage.getItemByName(name)).toBeVisible();
  });
});
