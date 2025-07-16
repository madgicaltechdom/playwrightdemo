import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login.page';
import { CartPage } from '../page-objects/cart.page';
import { CheckoutPage } from '../page-objects/checkout.page';
import { getValidLoginCredentials } from '../helpers/testDataFactory';

const PRODUCT_NAME = 'Sauce Labs Backpack';
test.describe('Cart Feature - Visual Regression', () => {
  
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const checkoutPage = new CheckoutPage(page);
    const cartPage = new CartPage(page);

    const { username, password } = getValidLoginCredentials();
    await loginPage.goto();
    await loginPage.login(username, password);
    await checkoutPage.addItemToCart(PRODUCT_NAME);
    await cartPage.goToCart();

  });

  test('should match the full cart page snapshot', async ({ page }) => {
    expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('cart-page.png');
  });

  test('should match the cart section snapshot', async ({ page }) => {
    // CartPage does not expose a cart section locator, so use the main cart container
    const cartSection = page.locator('#cart_contents_container');
    expect(await cartSection.screenshot()).toMatchSnapshot('cart-section.png');
  });

  test('should match the cart summary text snapshot', async ({ page }) => {
    // Use the cart summary container if available, fallback to cart contents
    const summaryText = await page.locator('#cart_summary_container, #cart_contents_container').textContent();
    expect(summaryText).toMatchSnapshot('cart-summary.txt');
  });
}); 


