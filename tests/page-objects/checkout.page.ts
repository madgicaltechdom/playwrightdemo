import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addItemToCart(itemName: string) {
    const item = this.page.locator('.inventory_item').filter({ hasText: itemName });
    await item.getByRole('button', { name: /add to cart/i }).click();
  }

  async goToCart() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async clickCheckout() {
    await this.page.getByRole('button', { name: /checkout/i }).click();
  }

  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    await this.page.getByPlaceholder('First Name').fill(firstName);
    await this.page.getByPlaceholder('Last Name').fill(lastName);
    await this.page.getByPlaceholder('Zip/Postal Code').fill(postalCode);
    await this.page.getByRole('button', { name: /continue/i }).click();
  }

  async finishOrder() {
    await this.page.getByRole('button', { name: /finish/i }).click();
  }

  async assertOrderSuccess() {
    await expect(this.page.getByText('THANK YOU FOR YOUR ORDER')).toBeVisible();
  }
} 