import { test, expect } from '../baseTest';
import { CartPage } from '../page-objects/cart.page';
import { CheckoutPage } from '../page-objects/checkout.page';
import { LoginPage } from '../page-objects/login.page';
import { getValidLoginCredentials } from '../helpers/testDataFactory';

const PRODUCT_NAME = 'Sauce Labs Backpack';

test.describe('Cart Feature - Negative/Edge Scenarios', () => {
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

  test('should display empty cart state when no items are present [@edge] [@ui]', async () => {
    await cartPage.goToCart();
    expect(await cartPage.isEmpty()).toBeTruthy();
    // Optionally, check for empty cart message
    // await expect(page.getByText(/your cart is empty/i)).toBeVisible();
  });

  test('should update cart correctly when all items are removed [@edge] [@ui]', async () => {
    await checkoutPage.addItemToCart(PRODUCT_NAME);
    await cartPage.goToCart();
    await cartPage.removeItem(PRODUCT_NAME);
    expect(await cartPage.isEmpty()).toBeTruthy();
  });

  test('should not duplicate items when adding the same product multiple times [@edge] [@ui]', async () => {
    await checkoutPage.addItemToCart(PRODUCT_NAME);
    await checkoutPage.addItemToCart(PRODUCT_NAME);
    await cartPage.goToCart();
    const itemNames = await cartPage.getCartItemNames();
    // Should only appear once or quantity should be updated
    expect(itemNames.filter(name => name === PRODUCT_NAME).length).toBe(1);
    // Optionally, check quantity if supported
    // const quantities = await cartPage.getCartItemQuantities();
    // expect(Number(quantities[0])).toBeGreaterThanOrEqual(1);
  });

  test.afterEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
  });
}); 