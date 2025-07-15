import { test as base } from '@playwright/test';
import fs from 'fs';

const test = base.extend({});

test.afterEach(async ({ page }, testInfo) => {
  if (page && testInfo.status !== testInfo.expectedStatus) {
    const dir = 'screenshots';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    const timestamp = Date.now();
    const safeTitle = testInfo.title.replace(/[^a-z0-9\-]+/gi, '_').toLowerCase();
    await page.screenshot({ path: `${dir}/${safeTitle}-${timestamp}.png`, fullPage: true });
  }
});

export { test };
export const expect = test.expect; 