import { test, expect } from '../baseTest';
import { CartPage } from '../page-objects/cart.page';
import { CheckoutPage } from '../page-objects/checkout.page';
import { LoginPage } from '../page-objects/login.page';
import { getValidLoginCredentials } from '../helpers/testDataFactory';

const PRODUCT_NAME = 'Sauce Labs Backpack';

test.describe('Cart Feature - Security Scenarios', () => {
  let loginPage: LoginPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
  });

  test('should not allow unauthorized access to cart page [@security]', async ({ page }) => {
    await page.goto(process.env.BASE_URL + '/cart.html');
    // Expect to be redirected to login or see an error if not logged in
    await expect(page).toHaveURL(/login/);
  });

  test('should not allow cart manipulation via browser console [@security]', async ({ page }) => {
    await loginPage.goto();
    const { username, password } = getValidLoginCredentials();
    await loginPage.login(username, password);
    await cartPage.goToCart();
    // Try to manipulate cart via localStorage (simulate attack)
    await page.evaluate(() => { localStorage.setItem('cart-contents', 'malicious-data'); });
    // Reload and check cart is not corrupted
    await page.reload();
    expect(await cartPage.isEmpty()).toBeFalsy(); // Should still show valid items
  });

  test.afterEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
  });
}); 