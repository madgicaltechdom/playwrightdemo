import { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

export async function checkA11y(page: Page) {
  const results = await new AxeBuilder({ page }).analyze();
  if (results.violations.length > 0) {
    console.warn('Accessibility violations:', results.violations);
  }
  return results;
} 