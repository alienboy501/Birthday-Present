const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  await page.goto('http://localhost:8080', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.click('#startButton');
  console.log('start clicked');
  await page.waitForSelector('#messageScene.visible', { timeout: 50000 });
  console.log('message visible');
  await page.waitForSelector('#letterScene.visible', { timeout: 50000 });
  console.log('letter visible');
  await page.click('#envelope');
  await page.waitForSelector('#letterContentScene.visible', { timeout: 20000 });
  await page.waitForSelector('#letterCloseBtn.visible', { timeout: 20000 });
  await page.click('#letterCloseBtn');
  console.log('letter close clicked');
  await page.waitForSelector('#mysteryGiftScene[aria-hidden="false"]', { timeout: 20000 });
  console.log('mystery visible');
  await page.click('#mysteryGift');
  await page.waitForSelector('#mysteryGiftContinue.visible', { timeout: 20000 });
  console.log('mystery continue visible');
  await page.click('#mysteryGiftContinue');
  await page.waitForSelector('#poemScene[aria-hidden="false"]', { timeout: 20000 });
  console.log('poem visible');
  await page.waitForSelector('#poemContinue.visible', { timeout: 20000 });
  await page.click('#poemContinue');
  await page.waitForSelector('#finalMessage[aria-hidden="false"]', { timeout: 20000 });
  console.log('final visible');
  await page.waitForSelector('#replayButton.visible', { timeout: 20000 });
  console.log('replay visible');
  await page.click('#replayButton');
  await page.waitForTimeout(1500);
  const state = await page.evaluate(() => ({
    letter: document.getElementById('letterScene')?.classList.contains('visible'),
    final: document.getElementById('finalMessage')?.classList.contains('visible'),
    replay: document.getElementById('replayButton')?.classList.contains('visible')
  }));
  console.log('replay state', state);
  console.log('errors', errors);
  await browser.close();
})();
