import { test, expect } from '../baseTest';
import { LoginPage } from '../page-objects/login.page';
import { CheckoutPage } from '../page-objects/checkout.page';
import { getValidLoginCredentials } from '../helpers/testDataFactory';

test.describe('Checkout Feature - Security Scenarios', () => {
  let loginPage: LoginPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.goto();
    const { username, password } = getValidLoginCredentials();
    await loginPage.login(username, password);
    await checkoutPage.addItemToCart('Sauce Labs Backpack');
    await checkoutPage.goToCart();
    await checkoutPage.clickCheckout();
  });

  test('should not allow script injection in checkout fields [@security]', async ({ page }) => {
    await checkoutPage.fillCheckoutInfo('<script>alert(1)</script>', 'Doe', '12345');
    await expect(page.locator('.error-message-container')).toBeVisible();
    await checkoutPage.fillCheckoutInfo('John', '<img src=x onerror=alert(1)>', '12345');
    await expect(page.locator('.error-message-container')).toBeVisible();
    await checkoutPage.fillCheckoutInfo('John', 'Doe', '<svg/onload=alert(1)>');
    await expect(page.locator('.error-message-container')).toBeVisible();
  });

  test.afterEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
  });
}); 