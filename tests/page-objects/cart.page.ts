import { Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToCart() {
    await this.page.locator('.shopping_cart_link').click();
    await this.page.waitForSelector('#cart_contents_container');
  }

  async getCartItemNames(): Promise<string[]> {
    return this.page.locator('.cart_item .inventory_item_name').allTextContents();
  }

  async getCartItemDescriptions(): Promise<string[]> {
    return this.page.locator('.cart_item .inventory_item_desc').allTextContents();
  }

  async getCartItemPrices(): Promise<string[]> {
    return this.page.locator('.cart_item .inventory_item_price').allTextContents();
  }

  async getCartItemQuantities(): Promise<string[]> {
    return this.page.locator('.cart_item .cart_quantity').allTextContents();
  }

  async isRemoveButtonVisibleForItem(itemName: string): Promise<boolean> {
    const item = this.page.locator('.cart_item').filter({ hasText: itemName });
    return item.getByRole('button', { name: /remove/i }).isVisible();
  }

  async removeItem(itemName: string) {
    const item = this.page.locator('.cart_item').filter({ hasText: itemName });
    await item.getByRole('button', { name: /remove/i }).click();
  }

  async isEmpty(): Promise<boolean> {
    return (await this.page.locator('.cart_item').count()) === 0;
  }
} 