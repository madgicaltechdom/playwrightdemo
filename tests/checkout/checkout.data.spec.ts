import { test, expect } from '../baseTest';
import { LoginPage } from '../page-objects/login.page';
import { CheckoutPage } from '../page-objects/checkout.page';
import { getValidLoginCredentials, getValidCheckoutInfo, getInvalidCheckoutInfo } from '../helpers/testDataFactory';

test.describe('Checkout Feature - Data-Driven Scenarios', () => {
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

  test('should complete checkout with valid data sets [@data]', async () => {
    const validSets = [getValidCheckoutInfo()];
    for (const info of validSets) {
      await checkoutPage.fillCheckoutInfo(info.firstName, info.lastName, info.postalCode);
      await checkoutPage.finishOrder();
      await checkoutPage.assertOrderSuccess();
    }
  });

  for (const info of getInvalidCheckoutInfo()) {
    test(`should show error for invalid data set: ${JSON.stringify(info)} [@data] [@edge]`, async ({ page }) => {
      await checkoutPage.fillCheckoutInfo(info.firstName, info.lastName, info.postalCode);
      await expect(page.locator('.error-message-container')).toBeVisible();
    });
  }

  test.afterEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
  });
}); 