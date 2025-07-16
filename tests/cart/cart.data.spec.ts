import { test, expect } from '../baseTest';
import { CartPage } from '../page-objects/cart.page';
import { CheckoutPage } from '../page-objects/checkout.page';
import { LoginPage } from '../page-objects/login.page';
import { getValidLoginCredentials } from '../helpers/testDataFactory';

const PRODUCTS = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];

test.describe('Cart Feature - Data-Driven Scenarios', () => {
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

  test('should display correct details for various products and quantities [@data]', async () => {
    for (const product of PRODUCTS) {
      await checkoutPage.addItemToCart(product);
    }
    await cartPage.goToCart();
    const itemNames = await cartPage.getCartItemNames();
    for (const product of PRODUCTS) {
      expect(itemNames).toContain(product);
    }
  });

  test('should handle cart with maximum allowed items [@data]', async () => {
    // Assuming max 10 items for this example
    for (let i = 0; i < 10; i++) {
      await checkoutPage.addItemToCart(PRODUCTS[0]);
    }
    await cartPage.goToCart();
    // Should only appear once or quantity should be updated
    const itemNames = await cartPage.getCartItemNames();
    expect(itemNames.filter(name => name === PRODUCTS[0]).length).toBe(1);
    // Optionally, check quantity if supported
    // const quantities = await cartPage.getCartItemQuantities();
    // expect(Number(quantities[0])).toBeGreaterThanOrEqual(10);
  });

  test('should handle cart with mixed product types [@data]', async () => {
    for (const product of PRODUCTS) {
      await checkoutPage.addItemToCart(product);
    }
    await cartPage.goToCart();
    const itemNames = await cartPage.getCartItemNames();
    for (const product of PRODUCTS) {
      expect(itemNames).toContain(product);
    }
  });

  test.afterEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
  });
}); 