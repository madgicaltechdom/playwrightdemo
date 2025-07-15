import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login.page';
import { getValidLoginCredentials } from '../helpers/testDataFactory';

test.describe('Login Feature - Performance Scenarios', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login quickly [@performance]', async ({ page }) => {
    const { username, password } = getValidLoginCredentials();
    const start = Date.now();
    await loginPage.login(username, password);
    await loginPage.assertLoginSuccess();
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(2000); // 2 seconds
  });

  test.afterEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
  });
}); 