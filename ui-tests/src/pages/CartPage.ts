import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { pageTitles } from '../fixtures/pageTitles';

export class CartPage extends BasePage {
  readonly pageTitle: Locator;
  readonly pageFooter: Locator;
  readonly cartItems: Locator;
  readonly itemNames: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.getByTestId('title');
    this.pageFooter = page.getByTestId('footer');
    this.cartItems = page.locator('.cart_item');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.checkoutButton = page.getByTestId('checkout');
  }

  async verifyPageOpened(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toHaveText(pageTitles.cart);
    await expect(this.page).toHaveURL(/.*\/cart.html$/);
  }

  getItemByName(name: string): Locator {
    return this.cartItems.filter({ hasText: name });
  }
}
