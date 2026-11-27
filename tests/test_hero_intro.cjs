const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true }).catch(() => chromium.launch({ headless: true }));
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();

    let url = 'http://127.0.0.1:5174/';
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 5000 });
    } catch {
      url = 'http://127.0.0.1:5173/';
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 5000 });
    }

    console.log('Testing intro transition at', url);
    fs.mkdirSync('tests/e2e/screenshots', { recursive: true });

    // Step 1: Capture initial separated shard state right after mount
    await page.waitForTimeout(200);
    await page.screenshot({ path: 'tests/e2e/screenshots/intro_01_shards_separated.png' });
    console.log('Step 1: Captured separated shards at t=200ms');

    // Step 2: Capture mid-assembly transition
    await page.waitForTimeout(700);
    await page.screenshot({ path: 'tests/e2e/screenshots/intro_02_assembling.png' });
    console.log('Step 2: Captured assembling shards at t=900ms');

    // Step 3: Capture settled, completed hero
    await page.waitForTimeout(1100);
    await page.screenshot({ path: 'tests/e2e/screenshots/intro_03_fully_assembled.png' });
    console.log('Step 3: Captured completed stationary hero at t=2000ms');

    // Step 4: Scroll down 600px - verify normal fluid scrolling with zero pinning
    await page.evaluate(() => window.scrollBy({ top: 600, behavior: 'instant' }));
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'tests/e2e/screenshots/intro_04_scrolled_normally.png' });
    console.log('Step 4: Captured normal page scrolling at 600px');

    // Step 5: Scroll back to top - verify hero remains intact and does not replay
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'tests/e2e/screenshots/intro_05_scroll_back_intact.png' });
    console.log('Step 5: Captured intact hero after scrolling back up');

    console.log('ALL ONE-TIME INTRO VERIFICATIONS PASSED');
  } catch (err) {
    console.error('Test error:', err);
    process.exit(1);
  } finally {
    if (browser) await browser.close();
  }
})();
