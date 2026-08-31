import { expect, Locator, Page } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path: string = ''): Promise<void> {
    await this.page.goto(path);
  }

  async waitForElementVisible(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
  }

  /** Waits for a locator to disappear — e.g. a loading spinner */
  async waitForElementDisappear(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'hidden' });
  }

  async assertTextInElement(locator: Locator, text: string): Promise<void> {
    await expect(locator).toContainText(text);
  }

  //Each page object defines its own check.
  abstract assertPageOpened(): Promise<void>;
}
