const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(`console:${msg.text()}`);
  });

  page.on('pageerror', err => {
    errors.push(`pageerror:${err.message}`);
  });

  try {
    await page.goto('http://localhost:8080', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForSelector('#startButton', { timeout: 15000 });
    await page.click('#startButton');

    // The opening heart sequence intentionally runs for about 26 seconds.
    await page.waitForSelector('#letterScene.visible', { timeout: 40000 });
    await page.click('#envelope');
    await page.waitForSelector('#letterContentScene.visible', { timeout: 20000 });
    await page.waitForSelector('#letterCloseBtn.visible', { timeout: 20000 });
    await page.click('#letterCloseBtn');

    await page.waitForSelector('#mysteryGiftScene[aria-hidden="false"]', { timeout: 20000 });
    await page.click('#mysteryGift');
    await page.waitForSelector('#mysteryGift.open', { timeout: 10000 });
    await page.waitForSelector('#mysteryGiftContinue.visible', { timeout: 15000 });
    await page.click('#mysteryGiftContinue');

    await page.waitForSelector('#poemScene[aria-hidden="false"]', { timeout: 20000 });
    await page.waitForSelector('#poemContinue.visible', { timeout: 20000 });
    await page.click('#poemContinue');

    await page.waitForSelector('#finalMessage[aria-hidden="false"]', { timeout: 20000 });
    await page.waitForSelector('#replayButton.visible', { timeout: 20000 });
    await page.click('#replayButton');

    await page.waitForTimeout(1200);
    const state = await page.evaluate(() => ({
      letterVisible: !!document.getElementById('letterScene')?.classList.contains('visible'),
      finalVisible: !!document.getElementById('finalMessage')?.classList.contains('visible'),
      replayVisible: !!document.getElementById('replayButton')?.classList.contains('visible')
    }));

    if (!state.letterVisible || state.finalVisible || state.replayVisible) {
      throw new Error(`Replay did not restart correctly: ${JSON.stringify(state)}`);
    }

    if (errors.length) {
      throw new Error(errors[0]);
    }

    console.log('Current journey test passed');
  } catch (error) {
    console.error('TEST FAILED:', error.message);
    await page.screenshot({ path: 'error-screenshot.png' });
    console.log('Screenshot saved to error-screenshot.png');
    process.exit(1);
  } finally {
    await browser.close();
  }
})();