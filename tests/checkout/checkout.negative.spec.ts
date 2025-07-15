import { test, expect } from '../baseTest';
import { LoginPage } from '../page-objects/login.page';
import { CheckoutPage } from '../page-objects/checkout.page';
import { getValidLoginCredentials, getInvalidCheckoutInfo } from '../helpers/testDataFactory';

test.describe('Checkout Feature - Negative Scenarios', () => {
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

  for (const info of getInvalidCheckoutInfo()) {
    test(`should show error for invalid checkout info: ${JSON.stringify(info)} [@regression] [@edge] [@ui] [@data]`, async ({ page }) => {
      await checkoutPage.fillCheckoutInfo(info.firstName, info.lastName, info.postalCode);
      // Expect some error message or validation
      await expect(page.locator('.error-message-container')).toBeVisible();
    });
  }

  test.afterEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
  });
}); 