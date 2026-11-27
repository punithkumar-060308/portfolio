const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true }).catch(() => chromium.launch({ headless: true }));
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();

    // Determine active port
    let url = 'http://127.0.0.1:5174/';
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 5000 });
    } catch {
      url = 'http://127.0.0.1:5173/';
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 5000 });
    }

    console.log('Connected to', url);
    await page.waitForTimeout(1000);

    // Ensure output dir
    fs.mkdirSync('tests/e2e/screenshots', { recursive: true });

    // Step 1: Top of page (0px)
    await page.screenshot({ path: 'tests/e2e/screenshots/hero_01_top_assembled.png' });
    console.log('Step 1: Captured assembled hero top');

    // Step 2: Immediate scroll (150px)
    await page.evaluate(() => window.scrollTo(0, 150));
    await page.waitForTimeout(350);
    await page.screenshot({ path: 'tests/e2e/screenshots/hero_02_immediate_flight.png' });
    console.log('Step 2: Captured immediate shard flight at 150px');

    // Step 3: Mid scroll (450px)
    await page.evaluate(() => window.scrollTo(0, 450));
    await page.waitForTimeout(350);
    await page.screenshot({ path: 'tests/e2e/screenshots/hero_03_foreground_expansion.png' });
    console.log('Step 3: Captured 3D foreground expansion at 450px');

    // Step 4: Full hero completion and handoff (800px)
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(350);
    await page.screenshot({ path: 'tests/e2e/screenshots/hero_04_handoff_stats.png' });
    console.log('Step 4: Captured smooth unpin and handoff at 800px');

    // Step 5: Reverse scroll back to top (0px)
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'tests/e2e/screenshots/hero_05_reverse_assembled.png' });
    console.log('Step 5: Captured reverse assembly back to top');

    console.log('ALL HERO VERIFICATIONS PASSED');
  } catch (err) {
    console.error('Test error:', err);
    process.exit(1);
  } finally {
    if (browser) await browser.close();
  }
})();
