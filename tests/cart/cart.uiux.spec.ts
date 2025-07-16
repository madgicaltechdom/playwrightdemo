import { test, expect } from '../baseTest';
import { CartPage } from '../page-objects/cart.page';
import { CheckoutPage } from '../page-objects/checkout.page';
import { LoginPage } from '../page-objects/login.page';
import { getValidLoginCredentials } from '../helpers/testDataFactory';
import { checkA11y } from '../helpers/axeHelper';

const PRODUCT_NAME = 'Sauce Labs Backpack';

test.describe('Cart Feature - UI/UX & Accessibility Scenarios', () => {
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

  test('should have accessible labels for all buttons and links [@ui] [@a11y]', async ({ page }) => {
    await checkoutPage.addItemToCart(PRODUCT_NAME);
    await cartPage.goToCart();
    await expect(page.getByRole('button', { name: /remove/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /continue shopping/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /checkout/i })).toBeVisible();
  });

  test('should be navigable via keyboard [@ui] [@a11y]', async ({ page }) => {
    await checkoutPage.addItemToCart(PRODUCT_NAME);
    await cartPage.goToCart();
    // Tab to Remove button
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: /remove/i })).toBeFocused();
  });

  test('should pass automated accessibility checks (axe-core) [@ui] [@a11y]', async ({ page }) => {
    await checkoutPage.addItemToCart(PRODUCT_NAME);
    await cartPage.goToCart();
    await checkA11y(page);
  });

  test('should display all cart elements correctly on mobile and desktop viewports [@ui]', async ({ page }) => {
    await checkoutPage.addItemToCart(PRODUCT_NAME);
    await cartPage.goToCart();
    await page.setViewportSize({ width: 375, height: 667 }); // Mobile
    await expect(page.getByRole('button', { name: /remove/i })).toBeVisible();
    await page.setViewportSize({ width: 1280, height: 800 }); // Desktop
    await expect(page.getByRole('button', { name: /remove/i })).toBeVisible();
  });

  test.afterEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
  });
}); 