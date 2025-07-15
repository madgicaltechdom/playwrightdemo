import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    const baseUrl = process.env.BASE_URL;
    if (!baseUrl) {
      throw new Error('BASE_URL environment variable is not set.');
    }
    await this.page.goto(baseUrl);
  }

  get usernameInput() {
    return this.page.getByPlaceholder('Username');
  }

  get passwordInput() {
    return this.page.getByPlaceholder('Password');
  }

  get loginButton() {
    return this.page.getByRole('button', { name: /login/i });
  }

  get errorMessage() {
    return this.page.getByTestId('error-message');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async assertLoginSuccess() {
    // Example: check for a dashboard element or successful redirect
    await expect(this.page).toHaveURL(/dashboard|inventory|home/i);
  }

  async assertLoginFailure() {
    await expect(this.errorMessage).toBeVisible();
  }
} 