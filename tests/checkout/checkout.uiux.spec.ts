import { test, expect } from '../baseTest';
import { LoginPage } from '../page-objects/login.page';
import { CheckoutPage } from '../page-objects/checkout.page';
import { getValidLoginCredentials, getValidCheckoutInfo } from '../helpers/testDataFactory';
import { checkA11y } from '../helpers/axeHelper';

test.describe('Checkout Feature - UI/UX & Accessibility Scenarios', () => {
  let loginPage: LoginPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.goto();
    const { username, password } = getValidLoginCredentials();
    await loginPage.login(username, password);
  });

  test('should be accessible during checkout [@ui]', async ({ page }) => {
    await checkoutPage.addItemToCart('Sauce Labs Backpack');
    await checkoutPage.goToCart();
    await checkoutPage.clickCheckout();
    await expect(page).toHaveTitle(/checkout/i);
    await checkA11y(page);
  });

  test('should have responsive UI during checkout [@ui]', async ({ page }) => {
    await checkoutPage.addItemToCart('Sauce Labs Backpack');
    await checkoutPage.goToCart();
    await checkoutPage.clickCheckout();
    await page.setViewportSize({ width: 375, height: 667 }); // Mobile
    await expect(page.getByPlaceholder('First Name')).toBeVisible();
    await expect(page.getByPlaceholder('Last Name')).toBeVisible();
    await expect(page.getByPlaceholder('Zip/Postal Code')).toBeVisible();
    await page.setViewportSize({ width: 1280, height: 800 }); // Desktop
    await expect(page.getByPlaceholder('First Name')).toBeVisible();
  });

  test.afterEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
  });
}); 