import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** The product listing at "/inventory.html", shown after a successful login. */
export class InventoryPage extends BasePage {
  readonly pageTitle: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.getByTestId('title');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  async assertPageOpened(): Promise<void> {
    await this.assertTextInElement(this.pageTitle, 'Products');
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
