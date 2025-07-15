import { test, expect } from '../baseTest';
import { LoginPage } from '../page-objects/login.page';
import { CheckoutPage } from '../page-objects/checkout.page';
import { getValidLoginCredentials, getValidCheckoutInfo } from '../helpers/testDataFactory';
import { expectApiResponse } from '../helpers/networkHelper';

test.describe('Checkout Feature - Positive Scenarios', () => {
  let loginPage: LoginPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.goto();
    const { username, password } = getValidLoginCredentials();
    await loginPage.login(username, password);
  });

  test('should complete checkout successfully [@smoke] [@regression] [@ui]', async ({ page }) => {
    await checkoutPage.addItemToCart('Sauce Labs Backpack');
    await checkoutPage.goToCart();
    await checkoutPage.clickCheckout();
    const { firstName, lastName, postalCode } = getValidCheckoutInfo();
    await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
    await checkoutPage.finishOrder();
    await expectApiResponse(page, '/checkout');
    await checkoutPage.assertOrderSuccess();
  });

  test.afterEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
  });
}); 