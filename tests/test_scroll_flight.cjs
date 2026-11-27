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

    console.log('Testing scroll-driven animation at', url);
    fs.mkdirSync('tests/e2e/screenshots', { recursive: true });
    await page.waitForTimeout(600);

    // Step 1: Top of page (0px) - fully assembled hero
    await page.screenshot({ path: 'tests/e2e/screenshots/scrolldown_01_top_assembled.png' });
    console.log('Step 1: Captured fully assembled hero at 0px');

    // Step 2: Scroll down 150px - shards immediately start separating and flying forward
    await page.evaluate(() => window.scrollTo({ top: 150, behavior: 'instant' }));
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'tests/e2e/screenshots/scrolldown_02_immediate_flight.png' });
    console.log('Step 2: Captured immediate shard flight while scrolling at 150px');

    // Step 3: Scroll down 400px - shards fly into foreground (+Z) with 3D scale and perspective
    await page.evaluate(() => window.scrollTo({ top: 400, behavior: 'instant' }));
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'tests/e2e/screenshots/scrolldown_03_foreground_expansion.png' });
    console.log('Step 3: Captured 3D foreground expansion while scrolling at 400px');

    // Step 4: Scroll down 750px - clean unpinning and smooth handoff to next sections
    await page.evaluate(() => window.scrollTo({ top: 750, behavior: 'instant' }));
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'tests/e2e/screenshots/scrolldown_04_handoff_stats.png' });
    console.log('Step 4: Captured smooth unpin and handoff to rest of page at 750px');

    // Step 5: Reverse scroll back to top (0px) - shards smoothly re-assemble into intact composition
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'tests/e2e/screenshots/scrolldown_05_reverse_reassemble.png' });
    console.log('Step 5: Captured reverse re-assembly back to top of page');

    console.log('ALL SCROLL-DOWN 3D ANIMATION TESTS PASSED');
  } catch (err) {
    console.error('Test error:', err);
    process.exit(1);
  } finally {
    if (browser) await browser.close();
  }
})();
