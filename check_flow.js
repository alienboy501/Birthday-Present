const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });
  await page.goto('http://localhost:8000', { waitUntil: 'networkidle' });

  const logState = async (label) => {
    const data = await page.evaluate(() => {
      const get = (id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        return {
          ariaHidden: el.getAttribute('aria-hidden'),
          visible: el.classList.contains('visible'),
          className: el.className,
          opacity: el.style.opacity,
          pointerEvents: el.style.pointerEvents,
        };
      };
      return {
        birthdayScreen: get('birthdayScreen'),
        messageScene: get('messageScene'),
        letterScene: get('letterScene'),
        letterContentScene: get('letterContentScene'),
        mysteryGiftScene: get('mysteryGiftScene'),
        poemScene: get('poemScene'),
        finalMessage: get('finalMessage'),
        replayButton: get('replayButton'),
      };
    });
    console.log('--- ' + label, JSON.stringify(data, null, 2));
  };

  await logState('initial');
  await page.click('#startButton');
  console.log('Clicked start button');
  await logState('after start');

  await page.waitForSelector('#letterScene[aria-hidden="false"]', { timeout: 90000 });
  console.log('Letter scene visible');
  await logState('letter-scene');

  await page.click('#envelope');
  await page.waitForSelector('#letterContentScene[aria-hidden="false"]', { timeout: 30000 });
  await page.waitForSelector('#letterCloseBtn.visible', { timeout: 30000 });
  console.log('Letter content visible');
  await logState('letter-content');

  await page.click('#letterCloseBtn');
  await page.waitForSelector('#mysteryGiftScene[aria-hidden="false"]', { timeout: 30000 });
  console.log('Mystery gift visible');
  await logState('mystery-gift');

  await page.click('#mysteryGift');
  await page.waitForTimeout(4500);
  await page.click('#mysteryGiftContinue');
  await page.waitForSelector('#poemScene[aria-hidden="false"]', { timeout: 30000 });
  console.log('Poem visible');
  await logState('poem');

  await page.click('#poemContinue');
  await page.waitForSelector('#finalMessage[aria-hidden="false"]', { timeout: 60000 });
  console.log('Final message visible');
  await logState('final-message');

  await page.waitForTimeout(5000);
  const finalState = await page.evaluate(() => ({
    finalVisible: document.getElementById('finalMessage')?.classList.contains('visible'),
    replayVisible: document.getElementById('replayButton')?.classList.contains('visible'),
    birthdayVisible: document.getElementById('birthdayScreen')?.classList.contains('visible'),
    letterSceneVisible: document.getElementById('letterScene')?.classList.contains('visible'),
    letterContentVisible: document.getElementById('letterContentScene')?.classList.contains('visible'),
    messageSceneVisible: document.getElementById('messageScene')?.classList.contains('visible'),
  }));
  console.log('--- final-state-check', JSON.stringify(finalState, null, 2));

  await browser.close();
})();
