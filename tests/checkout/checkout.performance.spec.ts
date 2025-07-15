import { test, expect } from '../baseTest';
import { LoginPage } from '../page-objects/login.page';
import { CheckoutPage } from '../page-objects/checkout.page';
import { getValidLoginCredentials, getValidCheckoutInfo } from '../helpers/testDataFactory';

test.describe('Checkout Feature - Performance Scenarios', () => {
  let loginPage: LoginPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.goto();
    const { username, password } = getValidLoginCredentials();
    await loginPage.login(username, password);
  });

  test('should complete checkout quickly [@performance]', async () => {
    const start = Date.now();
    await checkoutPage.addItemToCart('Sauce Labs Backpack');
    await checkoutPage.goToCart();
    await checkoutPage.clickCheckout();
    const { firstName, lastName, postalCode } = getValidCheckoutInfo();
    await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
    await checkoutPage.finishOrder();
    await checkoutPage.assertOrderSuccess();
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(3000); // 3 seconds
  });

  test.afterEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
  });
}); 