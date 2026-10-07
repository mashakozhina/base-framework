import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { errorMessageText, errorMessageType } from '../fixtures/errorType';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.errorMessage = page.getByTestId('error');
  }

  async verifyPageOpened(): Promise<void> {
    await expect(this.loginButton).toBeVisible();
    await expect(this.page).toHaveURL(/saucedemo\.com\/$/);
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async assertErrorMessage(type: string) {
    await expect(this.errorMessage).toBeVisible();
    switch (type) {
      case errorMessageType.invalidCredentials:
        await expect(this.errorMessage).toHaveText(errorMessageText.invalidCredentials);
        break;
      case errorMessageType.lockedOutUser:
        await expect(this.errorMessage).toHaveText(errorMessageText.lockedOutUser);
        break;
    }
  }
}
