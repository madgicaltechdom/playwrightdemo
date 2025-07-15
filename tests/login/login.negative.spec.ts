import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login.page';
import { getInvalidLoginCredentials } from '../helpers/testDataFactory';

test.describe('Login Feature - Negative Scenarios', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should not login with invalid credentials [@regression] [@edge] [@ui] [@data]', async () => {
    for (const creds of getInvalidLoginCredentials()) {
      await loginPage.login(creds.username, creds.password);
      await loginPage.assertLoginFailure();
    }
  });

  test('should show error for empty username and password [@edge] [@ui]', async () => {
    await loginPage.login('', '');
    await loginPage.assertLoginFailure();
  });

  test.afterEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
  });
}); 