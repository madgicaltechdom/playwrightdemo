import { test, expect } from '../baseTest';
import { LoginPage } from '../page-objects/login.page';
import { CheckoutPage } from '../page-objects/checkout.page';
import { CartPage } from '../page-objects/cart.page';
import { getValidLoginCredentials, getValidCheckoutInfo } from '../helpers/testDataFactory';
import { expectApiResponse } from '../helpers/networkHelper';

test.describe('Checkout Feature - Positive Scenarios', () => {
    let loginPage: LoginPage;
    let checkoutPage: CheckoutPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        checkoutPage = new CheckoutPage(page);
        cartPage = new CartPage(page);
        await loginPage.goto();
        const { username, password } = getValidLoginCredentials();
        await loginPage.login(username, password);
    });

    test('should complete checkout successfully [@smoke] [@regression] [@ui]', async ({ page }) => {
        await checkoutPage.addItemToCart('Sauce Labs Backpack');
        // Validate cart contents before checkout
        await cartPage.goToCart();
        const itemNames = await cartPage.getCartItemNames();
        expect(itemNames).toContain('Sauce Labs Backpack');
        expect(await cartPage.isRemoveButtonVisibleForItem('Sauce Labs Backpack')).toBeTruthy();
        const itemPrices = await cartPage.getCartItemPrices();
        expect(itemPrices).toContain('$29.99');
        // Proceed to checkout
        await checkoutPage.clickCheckout();
        const { firstName, lastName, postalCode } = getValidCheckoutInfo();
        await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
        // Validate summary details before finishing order
        const summarySection = page.locator('.summary_info');

        // Check payment information
        await expect(summarySection.getByText('Payment Information:')).toBeVisible();
        await expect(summarySection.getByText('SauceCard #31337')).toBeVisible();

        // Check shipping information
        await expect(summarySection.getByText('Shipping Information:')).toBeVisible();
        await expect(summarySection.getByText('FREE PONY EXPRESS DELIVERY!')).toBeVisible();

        // Check item total, tax, and total
        await expect(summarySection.getByText('Item total: $29.99')).toBeVisible();
        await expect(summarySection.getByText('Tax: $2.40')).toBeVisible();
        await expect(summarySection.getByText('Total: $32.39')).toBeVisible();

        // Check presence of Cancel and Finish buttons
        await expect(page.getByText('Cancel', { exact: true })).toBeVisible();
        await expect(page.getByRole('button', { name: /finish/i })).toBeVisible();
        await checkoutPage.finishOrder();
        await checkoutPage.assertOrderSuccess();
    });

    test.afterEach(async ({ page }) => {
        await page.context().clearCookies();
        await page.evaluate(() => localStorage.clear());
    });
}); 