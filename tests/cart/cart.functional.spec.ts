import { test, expect } from '../baseTest';
import { CartPage } from '../page-objects/cart.page';
import { CheckoutPage } from '../page-objects/checkout.page';
import { LoginPage } from '../page-objects/login.page';
import { getValidLoginCredentials } from '../helpers/testDataFactory';

const PRODUCTS = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];

// Tags: [@functional]

test.describe('Cart Feature - Additional Functional Scenarios', () => {
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

  test('should persist cart items after page reload [@functional]', async ({ page }) => {
    await checkoutPage.addItemToCart(PRODUCTS[0]);
    await cartPage.goToCart();
    await page.reload();
    const itemNames = await cartPage.getCartItemNames();
    expect(itemNames).toContain(PRODUCTS[0]);
  });

  test('should clear cart after successful checkout [@functional]', async () => {
    await checkoutPage.addItemToCart(PRODUCTS[0]);
    await cartPage.goToCart();
    await checkoutPage.clickCheckout();
    await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
    await checkoutPage.finishOrder();
    await cartPage.goToCart();
    expect(await cartPage.isEmpty()).toBeTruthy();
  });

  test('should display multiple different products in the cart [@functional]', async () => {
    for (const product of PRODUCTS) {
      await checkoutPage.addItemToCart(product);
    }
    await cartPage.goToCart();
    const itemNames = await cartPage.getCartItemNames();
    for (const product of PRODUCTS) {
      expect(itemNames).toContain(product);
    }
  });

  test('should update cart badge when items are added or removed [@functional]', async ({ page }) => {
    // Add item and check badge
    await checkoutPage.addItemToCart(PRODUCTS[0]);
    const badge = page.locator('.shopping_cart_badge');
    await expect(badge).toHaveText('1');
    // Remove item and check badge disappears
    await cartPage.goToCart();
    await cartPage.removeItem(PRODUCTS[0]);
    await expect(badge).toHaveCount(0);
  });

  test('should allow navigation from cart to product details and back [@functional]', async ({ page }) => {
    await checkoutPage.addItemToCart(PRODUCTS[0]);
    await cartPage.goToCart();
    await page.getByRole('link', { name: PRODUCTS[0] }).click();
    await expect(page).toHaveURL(/inventory-item/);
    await page.goBack();
    await expect(page).toHaveURL(/cart/);
  });

  test('should handle rapid add/remove actions without errors [@functional]', async () => {
    for (let i = 0; i < 5; i++) {
      await checkoutPage.addItemToCart(PRODUCTS[0]);
      await cartPage.goToCart();
      await cartPage.removeItem(PRODUCTS[0]);
    }
    expect(await cartPage.isEmpty()).toBeTruthy();
  });

  test.afterEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
  });
}); 