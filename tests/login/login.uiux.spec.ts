import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login.page';

test.describe('Login Feature - UI/UX & Accessibility Scenarios', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should be accessible [@ui]', async ({ page }) => {
    await expect(page).toHaveTitle(/login/i);
    // Optionally use axe or similar tools for full a11y scan
  });

  test('should have responsive UI [@ui]', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // Mobile
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await page.setViewportSize({ width: 1280, height: 800 }); // Desktop
    await expect(loginPage.usernameInput).toBeVisible();
  });

  test.afterEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
  });
}); 