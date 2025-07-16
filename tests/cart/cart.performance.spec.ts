import { test, expect } from '../baseTest';
import { CartPage } from '../page-objects/cart.page';
import { CheckoutPage } from '../page-objects/checkout.page';
import { LoginPage } from '../page-objects/login.page';
import { getValidLoginCredentials } from '../helpers/testDataFactory';

const PRODUCT_NAME = 'Sauce Labs Backpack';

test.describe('Cart Feature - Performance Scenarios', () => {
  let loginPage: LoginPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.goto();
    const { username, password } = getValidLoginCredentials();
    await loginPage.login(username, password);
  });

  test('should load cart page within acceptable time with multiple items [@performance]', async ({ page }) => {
    for (let i = 0; i < 5; i++) {
      await checkoutPage.addItemToCart(PRODUCT_NAME);
    }
    const start = Date.now();
    await cartPage.goToCart();
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(2000); // 2 seconds
  });

  test('should update cart quickly when adding/removing items [@performance]', async ({ page }) => {
    await checkoutPage.addItemToCart(PRODUCT_NAME);
    await cartPage.goToCart();
    const start = Date.now();
    await cartPage.removeItem(PRODUCT_NAME);
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(1000); // 1 second
  });

  test.afterEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
  });
}); 