const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  page.on('console', msg => console.log('CONSOLE', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGEERROR', err.message));
  await page.goto('http://localhost:8080', { waitUntil: 'domcontentloaded', timeout: 30000 });
  console.log('ready');
  console.log('start visible?', await page.isVisible('#startButton'));
  await page.click('#startButton');
  console.log('after click disabled?', await page.$eval('#startButton', el => el.disabled));
  for (let i = 1; i <= 25; i++) {
    await page.waitForTimeout(1000);
    const state = await page.evaluate(() => ({
      birthday: document.getElementById('birthdayScreen')?.className || '',
      message: document.getElementById('messageScene')?.className || '',
      letter: document.getElementById('letterScene')?.className || '',
      final: document.getElementById('finalMessage')?.className || '',
      start: document.getElementById('startButton')?.style.opacity || ''
    }));
    console.log(i, JSON.stringify(state));
  }
  await browser.close();
})();
