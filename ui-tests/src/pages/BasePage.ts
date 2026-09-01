import { Page } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path: string = ''): Promise<void> {
    await this.page.goto(path);
  }

  //Each page object defines its own check.
  abstract verifyPageOpened(): Promise<void>;
}
