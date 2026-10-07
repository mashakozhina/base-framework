import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { pageTitles } from '../fixtures/pageTitles';

/** The product listing at "/inventory.html", shown after a successful login. */
export class InventoryPage extends BasePage {
  readonly pageTitle: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly itemPrice: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.getByTestId('title');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.itemPrice = page.getByTestId('inventory-item-price');
  }

  async verifyPageOpened(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toHaveText(pageTitles.inventory);
    await expect(this.page).toHaveURL(/.*\/inventory.html$/);
  }

  addToCartButton(productSlug: string): Locator {
    return this.page.getByTestId(`add-to-cart-${productSlug}`);
  }

  async addToCart(productSlug: string): Promise<void> {
    await this.addToCartButton(productSlug).click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
