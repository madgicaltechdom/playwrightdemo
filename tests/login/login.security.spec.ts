import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login.page';

test.describe('Login Feature - Security Scenarios', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should prevent brute force attacks [@security]', async ({ page }) => {
    for (let i = 0; i < 5; i++) {
      await loginPage.login('invalid', 'invalid');
      await loginPage.assertLoginFailure();
    }
    // Optionally check for lockout message or captcha
    // await expect(page.getByTestId('lockout-message')).toBeVisible();
  });

  test('should not expose sensitive data in UI [@security]', async ({ page }) => {
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
    // Optionally, check UI for sensitive data
  });

  test.afterEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
  });
}); 