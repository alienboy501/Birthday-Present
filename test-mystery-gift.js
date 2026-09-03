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
    await page.waitForSelector('#letterCloseBtn.visible', { timeout: 15000 });
    await page.click('#letterCloseBtn');
    console.log('Clicked letter continue');

    // Wait for MYSTERY GIFT scene (not gift scene!)
    await page.waitForSelector('#mysteryGiftScene[aria-hidden="false"]', { timeout: 15000 });
    console.log('Mystery Gift scene visible');

    // Check mystery gift lines appear
    await page.waitForSelector('#mysteryGiftLine1.visible', { timeout: 5000 });
    await page.waitForSelector('#mysteryGiftLine2.visible', { timeout: 5000 });
    console.log('Mystery gift lines visible');

    // Wait for gift box to appear with idle animation
    await page.waitForSelector('#mysteryGiftBox.idle', { timeout: 10000 });
    console.log('Mystery gift box has idle animation');

    // Check continue button is NOT visible yet
    const continueBtnVisibleBefore = await page.isVisible('#mysteryContinueBtn.visible');
    console.log('Continue button visible before opening:', continueBtnVisibleBefore);

    // Click mystery gift box to open
    await page.click('#mysteryGiftBox');
    console.log('Clicked mystery gift box');

    // Wait for lid to open
    await page.waitForSelector('#mysteryGiftLid.open', { timeout: 5000 });
    console.log('Mystery gift lid opened');

    // Wait for card to reveal
    await page.waitForSelector('#mysteryCard.reveal', { timeout: 5000 });
    console.log('Mystery card revealed');

    // Check card text
    const cardLine1 = await page.textContent('#mysteryCardLine1');
    const cardLine2 = await page.textContent('#mysteryCardLine2');
    console.log('Card line 1:', cardLine1);
    console.log('Card line 2:', cardLine2);

    // Wait for continue button to appear
    await page.waitForSelector('#mysteryContinueBtn.visible', { timeout: 10000 });
    console.log('Continue button visible after opening');

    // Click continue button
    await page.click('#mysteryContinueBtn');
    console.log('Clicked mystery continue button');

    // Wait for GIFT scene (the original gift scene after mystery gift)
    await page.waitForSelector('#giftScene[aria-hidden="false"]', { timeout: 15000 });
    console.log('Gift scene visible after mystery gift');

    // Wait for gift box
    await page.waitForSelector('#giftBox.idle', { timeout: 10000 });
    console.log('Gift box has idle animation');

    // Click gift box to open
    await page.click('#giftBox');
    console.log('Clicked gift box');

    // Wait for lid to open
    await page.waitForSelector('#giftLid.open', { timeout: 5000 });
    console.log('Gift lid opened');

    // Wait for flower to bloom
    await page.waitForSelector('#giftFlower.bloom', { timeout: 5000 });
    console.log('Gift flower bloomed');

    // Wait for continue button
    await page.waitForSelector('#giftContinueBtn.visible', { timeout: 10000 });
    console.log('Gift continue button visible');

    // Click continue button
    await page.click('#giftContinueBtn');
    console.log('Clicked gift continue button');

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
    process.exit(1);
  }

  await browser.close();
  console.log('All tests passed!');
})();