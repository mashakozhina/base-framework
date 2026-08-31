import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

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

  async assertPageOpened(): Promise<void> {
    await this.assertTextInElement(this.pageTitle, 'Your Cart');
  }

  getItemByName(name: string): Locator {
    return this.cartItems.filter({ hasText: name });
  }
}
