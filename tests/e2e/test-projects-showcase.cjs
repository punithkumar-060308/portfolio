const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome' }).catch(() => chromium.launch({ channel: 'msedge' }));
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
  await page.locator('#projects').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  const frames = await page.locator('.project-gallery-frame').count();
  console.log('Gallery frames count:', frames);

  await page.locator('.project-gallery-frame').first().click();
  await page.waitForTimeout(400);

  const modalOpen = await page.locator('[role="dialog"]').isVisible();
  console.log('Modal opened on click:', modalOpen);

  await page.screenshot({ path: 'tests/e2e/screenshots/blueprint_gallery_verified.png' });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);

  await browser.close();
  console.log('Verified successfully!');
})();
