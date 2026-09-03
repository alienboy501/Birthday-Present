const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });

  await page.goto('http://localhost:8080', { waitUntil: 'networkidle' });

  // Wait for the page to load
  await page.waitForTimeout(3000);

  // Click start button
  await page.click('#startButton');
  console.log('Clicked start button');
  await page.waitForTimeout(1000);

  // Wait for message scene - longer timeout
  try {
    await page.waitForSelector('.message-scene.visible', { timeout: 60000 });
    console.log('Message scene appeared');
  } catch (e) {
    console.log('Message scene timeout, checking state...');
    const visible = await page.evaluate(() => document.querySelector('.message-scene.visible'));
    console.log('Visible?', visible);
    const classes = await page.evaluate(() => document.querySelector('.message-scene').className);
    console.log('Classes:', classes);
  }
  await page.waitForTimeout(8000);

  // Wait for letter scene
  try {
    await page.waitForSelector('.letter-scene.visible', { timeout: 30000 });
    console.log('Letter scene appeared');
  } catch (e) {
    console.log('Letter scene timeout');
  }
  await page.waitForTimeout(1000);

  // Click envelope
  await page.click('#envelope');
  console.log('Clicked envelope');
  await page.waitForTimeout(2000);

  // Click continue on letter
  await page.click('#letterCloseBtn');
  console.log('Clicked letter continue');
  await page.waitForTimeout(2000);

  // Wait for mystery gift scene
  try {
    await page.waitForSelector('.mystery-gift-scene.visible', { timeout: 30000 });
    console.log('Mystery gift scene appeared');
  } catch (e) {
    console.log('Mystery gift scene timeout');
  }
  await page.waitForTimeout(1000);

  // Click mystery gift
  await page.click('#mysteryGift');
  console.log('Clicked mystery gift');
  await page.waitForTimeout(4000);

  // Take screenshot of the flower
  await page.screenshot({ path: 'flower-before.png', fullPage: true });

  console.log('Screenshot saved as flower-before.png');

  await browser.close();
})();