import { Page, expect } from '@playwright/test';

export async function expectApiResponse(page: Page, urlPart: string, status: number = 200) {
  const response = await page.waitForResponse(resp => resp.url().includes(urlPart) && resp.status() === status, { timeout: 5000 });
  expect(response.ok()).toBeTruthy();
  return response;
} 