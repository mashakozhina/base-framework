import { expect, Locator, Page } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path: string = ''): Promise<void> {
    await this.page.goto(path);
  }

  async assertTextInElement(locator: Locator, text: string): Promise<void> {
    await expect(locator).toContainText(text);
  }

  //Each page object defines its own check.
  abstract assertPageOpened(): Promise<void>;
}
