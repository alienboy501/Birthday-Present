const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Capture console errors
  page.on('console', msg => console.log('CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', error => console.log('ERROR:', error.message));
  
  await page.goto('http://localhost:8080', { waitUntil: 'networkidle0' });
  
  // Wait for start button and click it
  await page.waitForSelector('#startButton');
  await page.click('#startButton');
  console.log('Clicked start button');
  
  // Wait for the letter scene to appear (the envelope scene)
  // This takes about 8+ seconds based on the timing
  await page.waitForTimeout(9000);
  
  // Check if letter scene is visible
  const letterSceneVisible = await page.evaluate(() => {
    const scene = document.getElementById('letterScene');
    return scene && scene.classList.contains('visible');
  });
  console.log('Letter scene visible:', letterSceneVisible);
  
  // Check if envelope exists
  const envelopeExists = await page.evaluate(() => {
    const env = document.getElementById('envelope');
    return !!env;
  });
  console.log('Envelope exists:', envelopeExists);
  
  // Check envelope's computed pointer-events
  const envelopePointerEvents = await page.evaluate(() => {
    const env = document.getElementById('envelope');
    return window.getComputedStyle(env).pointerEvents;
  });
  console.log('Envelope pointer-events:', envelopePointerEvents);
  
  // Check letter scene's pointer-events
  const letterScenePointerEvents = await page.evaluate(() => {
    const scene = document.getElementById('letterScene');
    return window.getComputedStyle(scene).pointerEvents;
  });
  console.log('Letter scene pointer-events:', letterScenePointerEvents);
  
  // Try clicking the envelope
  if (envelopeExists) {
    await page.click('#envelope');
    console.log('Clicked envelope');
    
    // Wait for animation
    await page.waitForTimeout(1500);
    
    // Check if envelope has open class
    const hasOpenClass = await page.evaluate(() => {
      const env = document.getElementById('envelope');
      return env && env.classList.contains('open');
    });
    console.log('Envelope has open class:', hasOpenClass);
    
    // Check if letter content scene is visible
    const letterContentVisible = await page.evaluate(() => {
      const scene = document.getElementById('letterContentScene');
      return scene && scene.classList.contains('visible');
    });
    console.log('Letter content scene visible:', letterContentVisible);
  }
  
  await browser.close();
})();
