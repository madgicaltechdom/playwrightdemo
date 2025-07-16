import { test, expect } from '../baseTest';
import { CartPage } from '../page-objects/cart.page';
import { CheckoutPage } from '../page-objects/checkout.page';
import { LoginPage } from '../page-objects/login.page';
import { getValidLoginCredentials } from '../helpers/testDataFactory';

// Example product name for tests
const PRODUCT_NAME = 'Sauce Labs Backpack';

// Tags: [@smoke], [@regression], [@ui], [@functional]

test.describe('Cart Feature - Functional Scenarios', () => {
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

  test('should display added item in the cart with correct details [@smoke] [@ui]', async () => {
    await checkoutPage.addItemToCart(PRODUCT_NAME);
    await cartPage.goToCart();
    const itemNames = await cartPage.getCartItemNames();
    expect(itemNames).toContain(PRODUCT_NAME);
    const itemPrices = await cartPage.getCartItemPrices();
    expect(itemPrices[0]).toMatch(/\$?\d+\.\d{2}/);
    const itemDescriptions = await cartPage.getCartItemDescriptions();
    expect(itemDescriptions[0].length).toBeGreaterThan(0);
  });

  test('should allow user to remove an item from the cart [@regression] [@ui]', async () => {
    await checkoutPage.addItemToCart(PRODUCT_NAME);
    await cartPage.goToCart();
    await cartPage.removeItem(PRODUCT_NAME);
    const itemNames = await cartPage.getCartItemNames();
    expect(itemNames).not.toContain(PRODUCT_NAME);
    expect(await cartPage.isEmpty()).toBeTruthy();
  });

  test('should allow user to continue shopping from the cart [@ui]', async ({ page }) => {
    await checkoutPage.addItemToCart(PRODUCT_NAME);
    await cartPage.goToCart();
    await page.getByRole('link', { name: /continue shopping/i }).click();
    // Assert that we are back on the inventory/product list page
    await expect(page).toHaveURL(/inventory/);
  });

  test('should allow user to proceed to checkout from the cart [@smoke] [@ui]', async ({ page }) => {
    await checkoutPage.addItemToCart(PRODUCT_NAME);
    await cartPage.goToCart();
    await page.getByRole('link', { name: /checkout/i }).click();
    // Assert that we are on the checkout step one page
    await expect(page).toHaveURL(/checkout-step-one/);
  });

  test('should navigate to product details when clicking product name in cart [@ui]', async ({ page }) => {
    await checkoutPage.addItemToCart(PRODUCT_NAME);
    await cartPage.goToCart();
    await page.getByRole('link', { name: PRODUCT_NAME }).click();
    // Assert that we are on the product details page
    await expect(page).toHaveURL(/inventory-item/);
    await expect(page.getByText(PRODUCT_NAME)).toBeVisible();
  });

  test.afterEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
  });
}); 