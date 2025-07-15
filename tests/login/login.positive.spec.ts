import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login.page';
import { getValidLoginCredentials } from '../helpers/testDataFactory';

test.describe('Login Feature - Positive Scenarios', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login successfully with valid credentials [@smoke] [@regression] [@ui]', async () => {
    const { username, password } = getValidLoginCredentials();
    await loginPage.login(username, password);
    await loginPage.assertLoginSuccess();
    // Optionally assert network response for login API
    // const [response] = await Promise.all([
    //   page.waitForResponse('**/login'),
    //   loginPage.login(username, password),
    // ]);
    // expect(response.ok()).toBeTruthy();
  });

  test.afterEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
  });
}); 