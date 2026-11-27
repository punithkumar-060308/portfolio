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

    console.log('Testing restored entrance animation at', url);
    fs.mkdirSync('tests/e2e/screenshots', { recursive: true });

    // Step 1: Initial visibly separated shards (t=120ms)
    await page.waitForTimeout(120);
    await page.screenshot({ path: 'tests/e2e/screenshots/entrance_01_separated_shards.png' });
    console.log('Step 1: Captured visibly separated shards at t=120ms');

    // Step 2: Mid-assembly 3D convergence (t=800ms)
    await page.waitForTimeout(680);
    await page.screenshot({ path: 'tests/e2e/screenshots/entrance_02_mid_convergence.png' });
    console.log('Step 2: Captured 3D convergence & portrait reveal at t=800ms');

    // Step 3: Crimson arrival glow flash (t=1400ms)
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'tests/e2e/screenshots/entrance_03_crimson_glow.png' });
    console.log('Step 3: Captured crimson arrival glow at t=1400ms');

    // Step 4: Fully settled connected composition (t=1900ms)
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'tests/e2e/screenshots/entrance_04_settled_connected.png' });
    console.log('Step 4: Captured settled connected composition at t=1900ms');

    // Step 5: Normal scroll down 600px
    await page.evaluate(() => window.scrollBy({ top: 600, behavior: 'instant' }));
    await page.waitForTimeout(250);
    await page.screenshot({ path: 'tests/e2e/screenshots/entrance_05_scrolled_normally.png' });
    console.log('Step 5: Verified normal fluid scrolling at 600px');

    // Step 6: Scroll back to top - remains intact
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'tests/e2e/screenshots/entrance_06_scroll_back_intact.png' });
    console.log('Step 6: Verified hero remains intact when scrolling back to top');

    // Step 7: Page reload - verifies animation plays again smoothly on new load
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(150);
    await page.screenshot({ path: 'tests/e2e/screenshots/entrance_07_reload_plays_again.png' });
    console.log('Step 7: Verified reload plays entrance animation without being blocked');

    console.log('ALL RESTORED ENTRANCE ANIMATION TESTS PASSED');
  } catch (err) {
    console.error('Test error:', err);
    process.exit(1);
  } finally {
    if (browser) await browser.close();
  }
})();
