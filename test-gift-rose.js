const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

  // Listen for console logs and errors
  page.on('console', msg => console.log(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', err => console.error(`[PAGE ERROR] ${err.message}`));

  try {
    await page.goto('http://localhost:8080', { waitUntil: 'networkidle', timeout: 30000 });
    console.log('Page loaded');

    // Wait for birthday screen and click start
    await page.waitForSelector('#startButton:not([style*="display: none"])', { timeout: 10000 });
    await page.click('#startButton');
    console.log('Clicked start button');

    // Wait for letter scene
    await page.waitForSelector('#letterScene[aria-hidden="false"]', { timeout: 15000 });
    console.log('Letter scene visible');

    // Click envelope
    await page.waitForSelector('#envelope:not([style*="display: none"])', { timeout: 10000 });
    await page.click('#envelope');
    console.log('Clicked envelope');

    // Wait for letter content scene
    await page.waitForSelector('#letterContentScene[aria-hidden="false"]', { timeout: 15000 });
    console.log('Letter content scene visible');

    // Click continue on letter
    await page.waitForSelector('#letterCloseBtn:not([style*="display: none"])', { timeout: 10000 });
    await page.click('#letterCloseBtn');
    console.log('Clicked letter continue');

    // Wait for gift scene
    await page.waitForSelector('#giftScene[aria-hidden="false"]', { timeout: 15000 });
    console.log('Gift scene visible');

    // Wait for gift box to appear with idle animation
    await page.waitForSelector('#giftBox.idle', { timeout: 15000 });
    console.log('Gift box has idle animation');

    // Click gift box to open
    await page.click('#giftBox');
    console.log('Clicked gift box');

    // Wait for lid to open
    await page.waitForSelector('#giftLid.open', { timeout: 5000 });
    console.log('Gift lid opened');

    // Wait for gift box to fade out
    await page.waitForFunction(() => {
      const box = document.getElementById('giftBox');
      return box && box.style.opacity === '0';
    }, { timeout: 5000 });
    console.log('Gift box faded out');

    // Wait for gift flower to appear and bloom
    await page.waitForSelector('#giftFlower.bloom', { timeout: 5000 });
    console.log('Gift flower bloomed');

    // Check flower position - should be at center
    const flowerPosition = await page.evaluate(() => {
      const flower = document.getElementById('giftFlower');
      const rect = flower.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        width: rect.width,
        height: rect.height
      };
    });
    console.log('Flower position:', flowerPosition);

    // Check that wrapper is still there (for position reference)
    const wrapperVisible = await page.evaluate(() => {
      const wrapper = document.getElementById('giftWrapper');
      return wrapper && window.getComputedStyle(wrapper).display !== 'none';
    });
    console.log('Wrapper still visible:', wrapperVisible);

    // Wait for continue button
    await page.waitForSelector('#giftContinueBtn.visible', { timeout: 10000 });
    console.log('Continue button visible');

    // Click continue button
    await page.click('#giftContinueBtn');
    console.log('Clicked continue button');

    // Wait for final message
    await page.waitForSelector('#finalMessage[aria-hidden="false"]', { timeout: 10000 });
    console.log('Final message visible - SUCCESS!');

    // Check celebration content
    const celebrationTitle = await page.textContent('#celebrationTitle');
    console.log('Celebration title:', celebrationTitle);

  } catch (err) {
    console.error('TEST FAILED:', err.message);
    await page.screenshot({ path: 'error-screenshot.png' });
    console.log('Screenshot saved to error-screenshot.png');
  }

  await browser.close();
})();