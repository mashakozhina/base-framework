import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { pageTitles } from '../fixtures/pageTitles';

export class CartPage extends BasePage {
  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly itemNames: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.getByTestId('title');
    this.cartItems = page.locator('.cart_item');
    this.itemNames = page.getByTestId('inventory-item-name');
  }

  async verifyPageOpened(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toHaveText(pageTitles.cart);
  }

  getItemByName(name: string): Locator {
    return this.cartItems.filter({ hasText: name });
  }
}
