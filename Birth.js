/* =========================================================
   PERFORMANCE SETTINGS
   ========================================================= */

const PERFORMANCE = {
  stars: 70,
  dust: 70,
  heartOrbit: 38,
  heartRise: 28,
  spiralPetals: 110,
  fireworks: 6,
  lanterns: 10,
  butterflies: 8,
  blossoms: 14,
  balloons: 6,
  confetti: 24,
  ambientSparkles: 12
};

const isLowPower =
  (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
  (navigator.deviceMemory && navigator.deviceMemory <= 4);

if (isLowPower) {
  PERFORMANCE.stars = 55;
  PERFORMANCE.dust = 45;
  PERFORMANCE.heartOrbit = 28;
  PERFORMANCE.heartRise = 20;
  PERFORMANCE.spiralPetals = 90;
  PERFORMANCE.ambientSparkles = 8;
}

/* =========================================================
   PERFORMANCE MONITORING & ADAPTIVE QUALITY
========================================================= */

// FPS monitoring
let fpsHistory = [];
let lastFrameTime = performance.now();
let currentQualityLevel = isLowPower ? 1 : 0; // 0 = high, 1 = medium, 2 = low
let performanceMonitoringActive = false;

// Object pools for particle reuse
const particlePools = {
  spark: [],
  firefly: [],
  firework: [],
  lantern: [],
  butterfly: [],
  blossom: [],
  balloon: [],
  confetti: [],
  ambientSparkle: []
};

const MAX_POOL_SIZE = 50;

function initPerformanceMonitoring() {
  if (performanceMonitoringActive) return;
  performanceMonitoringActive = true;

  // FPS monitoring loop
  function measureFPS(now) {
    const delta = now - lastFrameTime;
    const fps = 1000 / delta;
    fpsHistory.push(fps);
    if (fpsHistory.length > 60) fpsHistory.shift(); // Keep last 60 frames

    // Check FPS every 2 seconds
    if (fpsHistory.length >= 60) {
      const avgFps = fpsHistory.reduce((a, b) => a + b, 0) / fpsHistory.length;
      adaptQuality(avgFps);
    }

    lastFrameTime = now;
    if (performanceMonitoringActive) {
      requestAnimationFrame(measureFPS);
    }
  }

  requestAnimationFrame(measureFPS);
}

function adaptQuality(avgFps) {
  // Target 55+ FPS on modern, 30+ on low-end
  const targetFps = isLowPower ? 30 : 55;

  if (avgFps < targetFps * 0.8 && currentQualityLevel < 2) {
    // Performance degrading - reduce quality
    currentQualityLevel++;
    applyQualityLevel(currentQualityLevel);
    console.log(`Performance: Reducing quality to level ${currentQualityLevel} (avg FPS: ${avgFps.toFixed(1)})`);
  } else if (avgFps > targetFps * 1.1 && currentQualityLevel > 0) {
    // Performance good - can increase quality
    currentQualityLevel--;
    applyQualityLevel(currentQualityLevel);
    console.log(`Performance: Increasing quality to level ${currentQualityLevel} (avg FPS: ${avgFps.toFixed(1)})`);
  }
}

function applyQualityLevel(level) {
  const multipliers = {
    0: { stars: 1.0, dust: 1.0, particles: 1.0, celebration: 1.0, ambient: 1.0 },
    1: { stars: 0.7, dust: 0.6, particles: 0.7, celebration: 0.7, ambient: 0.6 },
    2: { stars: 0.4, dust: 0.4, particles: 0.5, celebration: 0.5, ambient: 0.4 }
  };

  const m = multipliers[level];

  // Apply multipliers to PERFORMANCE settings (using base values)
  PERFORMANCE.stars = Math.round(70 * m.stars);
  PERFORMANCE.dust = Math.round(70 * m.dust);
  PERFORMANCE.heartOrbit = Math.round(38 * m.particles);
  PERFORMANCE.heartRise = Math.round(28 * m.particles);
  PERFORMANCE.spiralPetals = Math.round(110 * m.particles);
  PERFORMANCE.fireworks = Math.round(6 * m.celebration);
  PERFORMANCE.lanterns = Math.round(10 * m.celebration);
  PERFORMANCE.butterflies = Math.round(8 * m.celebration);
  PERFORMANCE.blossoms = Math.round(14 * m.celebration);
  PERFORMANCE.balloons = Math.round(6 * m.celebration);
  PERFORMANCE.confetti = Math.round(24 * m.celebration);
  PERFORMANCE.ambientSparkles = Math.round(12 * m.ambient);

  // If already started, we could dynamically remove excess particles
  // For now, this affects future particle creation
}

function stopPerformanceMonitoring() {
  performanceMonitoringActive = false;
}

// Object pool functions
function createParticle(className) {
  const el = document.createElement('span');
  el.className = className;
  return el;
}

function getPooledElement(type, className, createFn) {
  const pool = particlePools[type];
  if (pool.length > 0) {
    const el = pool.pop();
    el.style.opacity = '';
    el.style.transform = '';
    el.style.display = '';
    el.className = className; // Reset class in case it changed
    return el;
  }
  return createFn();
}

function returnToPool(type, element) {
  if (particlePools[type].length < MAX_POOL_SIZE) {
    element.style.display = 'none';
    element.style.opacity = '';
    element.style.transform = '';
    particlePools[type].push(element);
  }
}


/* =========================================================
   DOM REFERENCES
========================================================= */

const starsLayer = document.getElementById('stars');
const dustLayer = document.getElementById('dust');
const heartOrbit = document.getElementById('heartOrbit');
const finalMessage = document.getElementById('finalMessage');
const startButton = document.getElementById('startButton');
const birthdayScreen = document.getElementById('birthdayScreen');
const messageScene = document.getElementById('messageScene');
const messageLine1 = document.getElementById('messageLine1');
const messageLine2 = document.getElementById('messageLine2');
const letterScene = document.getElementById('letterScene');
const letterLine1 = document.getElementById('letterLine1');
const letterLine2 = document.getElementById('letterLine2');
const envelope = document.getElementById('envelope');
const letterPrompt = document.getElementById('letterPrompt');
const letterContentScene = document.getElementById('letterContentScene');
const letterPaper = document.getElementById('letterPaper');
const letterText = document.getElementById('letterText');
const letterCloseBtn = document.getElementById('letterCloseBtn');
const poemScene = document.getElementById('poemScene');
const poemContinue = document.getElementById('poemContinue');
const mysteryGiftScene = document.getElementById('mysteryGiftScene');
const mysteryGift = document.getElementById('mysteryGift');
const mysteryGiftContinue = document.getElementById('mysteryGiftContinue');
const replayButton = document.getElementById('replayButton');

// Wrapper elements for effects that need containers
const heartStage = heartOrbit; // Use heartOrbit as heartStage
const heartShell = document.querySelector('.heart-shell') || document.createElement('div');
const heartSparks = document.querySelector('.heart-sparks') || document.createElement('div');
const celebrationLayer = document.body;
const scene = document.querySelector('.birthday-container') || document.body;
const centerBeacon = document.querySelector('.center-beacon') || document.createElement('div');

// Cache for frequently queried DOM elements to avoid repeated querySelectorAll calls
let cachedStars = null;
let cachedFinalMessage = null;

function getStars() {
  if (!cachedStars) {
    cachedStars = document.querySelectorAll('.star');
  }
  return cachedStars;
}

function getFinalMessage() {
  if (!cachedFinalMessage) {
    cachedFinalMessage = document.getElementById('finalMessage');
  }
  return cachedFinalMessage;
}

/* =========================================================
   START BUTTON HANDLER
   ========================================================= */

function startCelebration() {
  if (!startButton) return;

  startButton.disabled = true;
  startButton.style.opacity = '0';
  startButton.style.pointerEvents = 'none';

  if (birthdayScreen) {
    // Add fade-out class for smooth cinematic transition
    birthdayScreen.classList.add('fade-out');
  }

  // Initialize performance monitoring
  initPerformanceMonitoring();

  trackTimeout(() => {
    beginMainSequence();
  }, 1000);
}

if (startButton) {
  startButton.addEventListener('click', startCelebration);
}

function beginMainSequence() {
  scene.classList.add('ready');
  const stars = Array.from(getStars());

  stars.forEach((star, index) => {
    trackTimeout(() => {
      star.classList.add('visible');
    }, 700 + index * 20);
  });

  trackTimeout(() => {
    centerBeacon.classList.add('visible');
  }, 1800);

  trackTimeout(() => {
    heartStage.classList.add('revealed');
    heartShell.style.opacity = '1';
  }, 4000);

  trackTimeout(() => {
    triggerHeartbeat();
    heartbeatLoop = trackInterval(triggerHeartbeat, 5200);
  }, 6500);

  trackTimeout(() => {
    clearInterval(heartbeatLoop);
    heartStage.classList.add('quiet');
    centerBeacon.style.opacity = '0.64';

    trackTimeout(() => {
      launchTransformationPulse();
    }, 900);

    trackTimeout(() => {
      heartStage.style.filter = 'drop-shadow(0 0 30px rgba(255,175,197,0.55))';
      heartShell.style.transform = 'translate(-50%, -50%) scale(0.9)';
    }, 2400);

    trackTimeout(() => {
      createAmbientSparkles();
    }, 5000);

    trackTimeout(() => {
      showMessageScene();
    }, 8000);
  }, 15000);
}

/* =========================================================
   STARS - Dark Night Theme
   ========================================================= */

function createStars() {
  const fragment = document.createDocumentFragment();

  const starStyles = [
    { size: 1.6, bloom: true, cool: false },
    { size: 1.1, bloom: false, cool: true },
    { size: 2.0, bloom: true, cool: false },
    { size: 0.8, bloom: false, cool: true },
    { size: 1.4, bloom: false, cool: false }
  ];

  for (let i = 0; i < PERFORMANCE.stars; i++) {
    const star = document.createElement('span');
    const style = starStyles[i % starStyles.length];

    const size =
      style.size * (Math.random() * 0.8 + 0.6);

    star.className =
      `star ${style.bloom ? 'bloom' : ''} ${style.cool ? 'cool' : 'warm'}`;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    star.style.left =
      `${Math.random() * 100}%`;

    star.style.top =
      `${Math.random() * 100}%`;

    star.style.opacity = '0';

    const flicker =
      3.0 + Math.random() * 3.5;

    star.style.animation =
      `twinkle ${flicker}s ease-in-out infinite alternate`;

    star.style.animationDelay =
      `${Math.random() * 2.5}s`;

    fragment.appendChild(star);
  }

  starsLayer.appendChild(fragment);
}


/* =========================================================
   DUST - Dark Night Theme
   ========================================================= */

function createDust() {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < PERFORMANCE.dust; i++) {
    const dust = document.createElement('span');

    const near = Math.random() > 0.82;
    const isCool = Math.random() > 0.6; // 40% warm, 60% cool

    dust.className =
      `dust ${near ? 'near' : ''} ${isCool ? 'cool' : ''}`;

    dust.style.left =
      `${Math.random() * 100}%`;

    dust.style.top =
      `${Math.random() * 100}%`;

    const size = near ? 3 : 2;

    dust.style.width = `${size}px`;
    dust.style.height = `${size}px`;

    dust.style.setProperty(
      '--dx',
      `${(Math.random() - 0.5) * 80}px`
    );

    dust.style.setProperty(
      '--dy',
      `${-Math.random() * 120 - 20}px`
    );

    dust.style.setProperty(
      '--dur',
      `${Math.random() * 12 + 15}s`
    );

    dust.style.animationDelay =
      `${Math.random() * 6}s`;

    fragment.appendChild(dust);
  }

  dustLayer.appendChild(fragment);
}


/* =========================================================
   HEART PARTICLES
   ========================================================= */

function createHeartParticles() {
  const fragment = document.createDocumentFragment();

  for (
    let i = 0;
    i < PERFORMANCE.heartOrbit;
    i++
  ) {
    const p = document.createElement('span');

    const angle =
      Math.random() * Math.PI * 2;

    const radius =
      100 + Math.random() * 70;

    p.className =
      'heart-particle orbit';

    p.style.setProperty(
      '--dx',
      `${Math.cos(angle) * radius}px`
    );

    p.style.setProperty(
      '--dy',
      `${Math.sin(angle) * radius * 0.6}px`
    );

    p.style.setProperty(
      '--orbitDur',
      `${Math.random() * 9 + 13}s`
    );

    p.style.left =
      `${50 + Math.cos(angle) * 8}%`;

    p.style.top =
      `${50 + Math.sin(angle) * 6}%`;

    p.style.animationDelay =
      `${Math.random() * 3}s`;

    fragment.appendChild(p);
  }

  for (
    let i = 0;
    i < PERFORMANCE.heartRise;
    i++
  ) {
    const p = document.createElement('span');

    p.className =
      'heart-particle rise';

    p.style.setProperty(
      '--dx',
      `${(Math.random() - 0.5) * 90}px`
    );

    p.style.setProperty(
      '--dy',
      `${-Math.random() * 130 - 20}px`
    );

    p.style.setProperty(
      '--riseDur',
      `${Math.random() * 5 + 7}s`
    );

    p.style.left =
      `${50 + (Math.random() - 0.5) * 26}%`;

    p.style.top =
      `${50 + (Math.random() - 0.5) * 20}%`;

    p.style.animationDelay =
      `${Math.random() * 2.5}s`;

    fragment.appendChild(p);
  }

  heartStage.appendChild(fragment);
}


/* =========================================================
   SPARK BURST
   ========================================================= */

function createSparkBurst() {
  const sparkCount = 10;
  const fragment = document.createDocumentFragment();
  const sparks = [];

  for (let i = 0; i < sparkCount; i++) {
    // Reuse from object pool if available
    const spark = particlePools.spark.pop() || createParticle('spark');

    spark.style.setProperty(
      '--sx',
      `${(Math.random() - 0.5) * 80}px`
    );

    spark.style.setProperty(
      '--sy',
      `${(Math.random() - 0.5) * 100}px`
    );

    spark.style.animationDelay =
      `${Math.random() * 0.6}s`;

    sparks.push(spark);
    fragment.appendChild(spark);
  }

  heartSparks.appendChild(fragment);

  trackTimeout(() => {
    for (const spark of sparks) {
      spark.remove();
      if (particlePools.spark.length < MAX_POOL_SIZE) {
        particlePools.spark.push(spark);
      }
    }
  }, 2000);
}








/* =========================================================
   HEART PETAL SPIRAL
   ========================================================= */

function createHeartPetalSpiral() {

  const spiral =
    document.createElement('div');

  spiral.className =
    'petal-spiral';

  celebrationLayer.appendChild(spiral);

  spiral.style.opacity = '1';

  // Use document fragment for efficient DOM insertion
  const fragment = document.createDocumentFragment();

  for (
    let i = 0;
    i < PERFORMANCE.spiralPetals;
    i++
  ) {

    const petal =
      document.createElement('span');

    petal.className =
      'petal';

    const progress =
      i / PERFORMANCE.spiralPetals;

    const angle =
      progress *
      Math.PI *
      2 *
      4;

    const radius =
      34 + progress * 280;

    const x =
      Math.cos(angle) * radius;

    const y =
      Math.sin(angle) *
      radius *
      0.62;

    petal.style.left =
      `${x}px`;

    petal.style.top =
      `${y}px`;

    petal.style.setProperty(
      '--dx',
      `${Math.cos(angle) * 60}px`
    );

    petal.style.setProperty(
      '--dy',
      `${Math.sin(angle) * 60}px`
    );

    petal.style.animationDelay =
      `${i * 0.02}s`;

    fragment.appendChild(petal);
  }

  spiral.appendChild(fragment);

  trackTimeout(() => {

    spiral.style.opacity = '0';

    trackTimeout(() => {
      spiral.remove();
    }, 1400);

  }, 5000);
}


/* =========================================================
   CELEBRATION
   ========================================================= */

function launchCelebration() {

  const fireworkCount =
    PERFORMANCE.fireworks;

  const lanternCount =
    PERFORMANCE.lanterns;

  const butterflyCount =
    PERFORMANCE.butterflies;

  const blossomCount =
    PERFORMANCE.blossoms;

  const balloonCount =
    PERFORMANCE.balloons;

  const confettiCount =
    PERFORMANCE.confetti;

  const variants = [
    'flower',
    'heart',
    'star',
    'galaxy',
    'wing'
  ];

  // Natural timing function variants
  const timingFunctions = [
    'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    'cubic-bezier(0.42, 0, 0.58, 1)',
    'cubic-bezier(0.16, 1, 0.3, 1)',
    'cubic-bezier(0.4, 0, 0.2, 1)'
  ];

  // Use document fragment for efficient DOM insertion
  const fragment = document.createDocumentFragment();


  // Fireworks - stagger delays more (0-2s), vary burst sizes

  for (
    let i = 0;
    i < fireworkCount;
    i++
  ) {

    const firework = getPooledElement('firework', `firework ${variants[i % variants.length]}`, createParticle);

    firework.style.left =
      `${18 + Math.random() * 64}%`;

    firework.style.top =
      `${12 + Math.random() * 28}%`;

    // Stagger delays more (0-2s) for natural cascade
    firework.style.animationDelay =
      `${Math.random() * 2}s`;

    // Vary firework scale for different burst sizes
    const scale = 0.7 + Math.random() * 0.6; // 0.7-1.3
    firework.style.setProperty('--scale', scale.toFixed(2));

    fragment.appendChild(firework);

    trackTimeout(() => {
      firework.remove();
      returnToPool('firework', firework);
    }, 5000);
  }


  // Lanterns - add subtle horizontal drift variance

  for (
    let i = 0;
    i < lanternCount;
    i++
  ) {

    const lantern = getPooledElement('lantern', 'lantern', createParticle);

    lantern.style.left =
      `${Math.random() * 92}%`;

    lantern.style.top =
      `${85 + Math.random() * 6}%`;

    // More organic horizontal drift
    lantern.style.setProperty(
      '--dx',
      `${(Math.random() - 0.5) * 140}px`
    );

    // Add subtle vertical sway variance
    const dyVariance = -Math.random() * 80 - 20;
    lantern.style.setProperty('--dy', `${dyVariance}px`);

    lantern.style.animationDelay =
      `${Math.random() * 0.5}s`;

    // Vary animation duration and timing function for natural drift
    const animDuration = 12 + Math.random() * 4; // 12-16s
    lantern.style.setProperty('--dur', `${animDuration}s`);
    const timingFn = timingFunctions[Math.floor(Math.random() * timingFunctions.length)];
    lantern.style.setProperty('--timing-fn', timingFn);

    fragment.appendChild(lantern);

    trackTimeout(() => {
      lantern.remove();
      returnToPool('lantern', lantern);
    }, 9000);
  }


  // Butterflies - vary wing-beat frequency via animation-duration (3.5-5s)

  for (
    let i = 0;
    i < butterflyCount;
    i++
  ) {

    const butterfly = getPooledElement('butterfly', 'butterfly', createParticle);

    butterfly.style.left =
      `${10 + Math.random() * 80}%`;

    butterfly.style.top =
      `${20 + Math.random() * 54}%`;

    butterfly.style.setProperty(
      '--dx',
      `${(Math.random() - 0.5) * 180}px`
    );

    butterfly.style.setProperty(
      '--dy',
      `${(Math.random() - 0.5) * 180}px`
    );

    butterfly.style.animationDelay =
      `${Math.random() * 4}s`;

    // Vary wing-beat frequency: 3.5-5s for more natural flutter
    const wingBeatDur = 3.5 + Math.random() * 1.5;
    butterfly.style.setProperty('--flap-dur', `${wingBeatDur}s`);
    const timingFn = timingFunctions[Math.floor(Math.random() * timingFunctions.length)];
    butterfly.style.setProperty('--timing-fn', timingFn);

    fragment.appendChild(butterfly);

    trackTimeout(() => {
      butterfly.remove();
      returnToPool('butterfly', butterfly);
    }, 9000);
  }


  // Blossom petals - add slight rotation during fall

  for (
    let i = 0;
    i < blossomCount;
    i++
  ) {

    const petal = getPooledElement('blossom', 'blossom-petal', createParticle);

    petal.style.left =
      `${Math.random() * 94}%`;

    petal.style.top =
      `${Math.random() * 16}%`;

    petal.style.setProperty(
      '--dx',
      `${(Math.random() - 0.5) * 170}px`
    );

    // Add rotation during fall for natural petal drift
    const rotation = (Math.random() - 0.5) * 720; // -360 to 360 degrees
    petal.style.setProperty('--rotate', `${rotation}deg`);

    petal.style.animationDelay =
      `${Math.random() * 3}s`;

    // Vary fall duration
    const fallDur = 5 + Math.random() * 3; // 5-8s
    petal.style.setProperty('--fall-dur', `${fallDur}s`);

    fragment.appendChild(petal);

    trackTimeout(() => {
      petal.remove();
      returnToPool('blossom', petal);
    }, 7000);
  }


  // Balloons - more varied float paths

  for (
    let i = 0;
    i < balloonCount;
    i++
  ) {

    const balloon = getPooledElement('balloon', 'balloon', createParticle);

    balloon.style.left =
      `${Math.random() * 86}%`;

    balloon.style.top =
      `${86 + Math.random() * 8}%`;

    balloon.style.setProperty(
      '--dx',
      `${(Math.random() - 0.5) * 260}px`
    );

    // Add vertical drift variance
    const dyVariance = -Math.random() * 300 - 100;
    balloon.style.setProperty('--dy', `${dyVariance}px`);

    balloon.style.animationDelay =
      `${Math.random() * 1}s`;

    // Vary balloon float duration and path
    const floatDur = 14 + Math.random() * 6; // 14-20s
    balloon.style.setProperty('--float-dur', `${floatDur}s`);
    const timingFn = timingFunctions[Math.floor(Math.random() * timingFunctions.length)];
    balloon.style.setProperty('--timing-fn', timingFn);

    // Random balloon color variant
    const colorVariants = ['pink', 'gold', 'lavender', 'mint'];
    balloon.classList.add(colorVariants[Math.floor(Math.random() * colorVariants.length)]);

    fragment.appendChild(balloon);

    trackTimeout(() => {
      balloon.remove();
      returnToPool('balloon', balloon);
    }, 10000);
  }


  // Confetti - varied rotation speeds

  for (
    let i = 0;
    i < confettiCount;
    i++
  ) {

    const confettiEl = getPooledElement('confetti', 'confetti', createParticle);

    confettiEl.style.left =
      `${Math.random() * 92}%`;

    confettiEl.style.top =
      `${Math.random() * 28}%`;

    confettiEl.style.setProperty(
      '--dx',
      `${(Math.random() - 0.5) * 240}px`
    );

    confettiEl.style.animationDelay =
      `${Math.random() * 2}s`;

    // Varied rotation speeds for natural confetti tumble
    const rotation = (Math.random() - 0.5) * 1440; // -720 to 720 degrees
    confettiEl.style.setProperty('--rotate', `${rotation}deg`);

    // Vary fall duration and timing function
    const fallDur = 4 + Math.random() * 3; // 4-7s
    confettiEl.style.setProperty('--fall-dur', `${fallDur}s`);
    const timingFn = timingFunctions[Math.floor(Math.random() * timingFunctions.length)];
    confettiEl.style.setProperty('--timing-fn', timingFn);

    fragment.appendChild(confettiEl);

    trackTimeout(() => {
      confettiEl.remove();
      returnToPool('confetti', confettiEl);
    }, 7000);
  }

  // Append all at once
  celebrationLayer.appendChild(fragment);
}


/* =========================================================
   HEARTBEAT
   ========================================================= */

function triggerHeartbeat() {

  heartStage.classList.add('beating');

  createSparkBurst();

  dimNearbyStars();

  trackTimeout(() => {

    heartStage.classList.remove('beating');

    restoreStars();

  }, 1650);
}


/* =========================================================
   HELPER FUNCTIONS
========================================================= */

function dimNearbyStars() {
  const stars = getStars();
  stars.forEach(star => {
    if (Math.random() > 0.3) {
      star.style.opacity = '0.3';
    }
  });
}

function restoreStars() {
  const stars = getStars();
  stars.forEach(star => {
    star.style.opacity = '';
  });
}

function launchTransformationPulse() {
  const pulse = document.createElement('div');
  pulse.className = 'transformation-pulse';
  document.body.appendChild(pulse);

  trackTimeout(() => pulse.remove(), 1500);
}

/* =========================================================
   MESSAGE SCENE
   ========================================================= */

function showMessageScene() {
  // Fade out heart stage
  if (heartStage) {
    heartStage.style.opacity = '0';
    heartStage.style.pointerEvents = 'none';
  }
  if (centerBeacon) {
    centerBeacon.style.opacity = '0';
  }

  // Show message scene
  if (messageScene) {
    messageScene.classList.add('visible');
    messageScene.setAttribute('aria-hidden', 'false');
  }

  // Show first message line
  if (messageLine1) {
    trackTimeout(() => {
      messageLine1.classList.add('visible');
    }, 500);
  }

  // Show second message line after delay
  if (messageLine2) {
    trackTimeout(() => {
      messageLine2.classList.add('visible');
    }, 3500);
  }

  // Create floating hearts for message scene
  trackTimeout(() => {
    createFloatingHearts();
  }, 1000);

  // Create glowing flowers for message scene
  trackTimeout(() => {
    createGlowingFlowers();
  }, 1500);

  // Transition to final message after messages are shown
  trackTimeout(() => {
    transitionToFinalMessage();
  }, 8000);
}

function transitionToFinalMessage() {
  // Fade out message scene
  if (messageScene) {
    messageScene.classList.add('fade-out');
    messageScene.setAttribute('aria-hidden', 'true');
  }

  // Show the letter scene after the journey
  trackTimeout(() => {
    cleanupSceneEffects('.floating-heart, .glowing-flower');
    showLetterScene();
  }, 2000);
}

function cleanupSceneEffects(selector) {
  document.querySelectorAll(selector).forEach(element => element.remove());
}

function showLetterScene() {
  // Show letter scene
  if (letterScene) {
    letterScene.classList.add('visible');
    letterScene.setAttribute('aria-hidden', 'false');
  }

  // Show first letter line
  if (letterLine1) {
    trackTimeout(() => {
      letterLine1.classList.add('visible');
    }, 300);
  }

  // Show second letter line
  if (letterLine2) {
    trackTimeout(() => {
      letterLine2.classList.add('visible');
    }, 2800);
  }

  // Show prompt with pulse animation
  if (letterPrompt) {
    trackTimeout(() => {
      letterPrompt.classList.add('pulse');
    }, 4500);
  }

  // Envelope interaction
  if (envelope) {
    envelope.addEventListener('click', openEnvelope);
    envelope.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openEnvelope();
      }
    });
  }
}

function openEnvelope() {
  // Remove event listeners to prevent double-trigger
  if (envelope) {
    envelope.removeEventListener('click', openEnvelope);
    envelope.classList.add('open');
  }

  // Stop prompt pulse
  if (letterPrompt) {
    letterPrompt.classList.remove('pulse');
  }

  // Fade out letter scene
  if (letterScene) {
    letterScene.classList.add('fade-out');
  }

  // Show letter content scene
  trackTimeout(() => {
    showLetterContent();
  }, 1000);
}

function showLetterContent() {
  // Show letter content scene
  if (letterContentScene) {
    letterContentScene.classList.add('visible');
    letterContentScene.setAttribute('aria-hidden', 'false');
  }

  // Letter content paragraphs for typewriter-style reveal
  const letterParagraphs = [
    "Heyy! 😄",
    "",
    "Happy Birthday!! 🎉🎂",
    "",
    "I honestly hope you have an amazing day because you really deserve it. I hope today brings you lots of happiness, laughter, good memories, and obviously… a ridiculous amount of cake. 😂🎂",
    "",
    "I’m really glad I got the chance to know you. You’re honestly such an amazing person, and even though I might not always say it, I really do appreciate having you in my life. You have this way of making things more fun just by being around, and somehow you manage to make me smile without even trying. 😭❤️",
    "",
    "And before I continue, there’s something I really want to say.",
    "",
    "I’m genuinely sorry for being a jerk and an idiot sometimes. 😔 I know there are moments when I’ve acted badly or said things I probably shouldn’t have, and looking back, I realize I could’ve handled things so much better. I hate knowing that I might have hurt you or made you feel bad, because honestly, that’s never what I wanted.",
    "",
    "I’m not saying sorry just because it’s your birthday or because I want everything to magically be okay. I’m saying it because I genuinely mean it. You didn’t deserve me acting like that, and I should’ve thought more about your feelings instead of just doing whatever my stupid brain decided at the time. 😂😭",
    "",
    "I can’t change what I’ve already done, but I can learn from it and try to be better. And honestly, I really don’t want some stupid mistakes from me to ruin the friendship we have. You mean more to me than I probably let on, and I hope you know that. ❤️",
    "",
    "Anywayyy, enough of the serious stuff before I start sounding like I’m giving a speech at your wedding. 😭😂",
    "",
    "Since it’s your birthday, I hope you get everything you wished for… although if one of those wishes involves a certain handsome, slightly stupid guy, I’m not saying no. 👀😂❤️",
    "",
    "But seriously, I hope this new year of your life is filled with happiness, amazing memories, success, and people who genuinely care about you. Keep being the amazing, funny, beautiful person you are, and don’t let anyone make you feel like you’re anything less than that.",
    "",
    "And yes, you’re officially one year older… congratulations. 🎉😂 Unfortunately, I still have no idea how you’re going to deal with me for another year. 😭",
    "",
    "Happy Birthday once again. ❤️🎂",
    "",
    "I hope you smile a lot today, laugh until your stomach hurts, eat way too much cake, and most importantly, enjoy your day because you deserve it.",
    "",
    "Happy Birthday, birthday girl. ❤️🥳",
    "",
    "— From me ❤️"
  ];

  // Reveal paragraphs gradually
  if (letterText) {
    letterText.textContent = '';
    letterParagraphs.forEach((paragraph, index) => {
      const delay = 400 + index * 350; // Staggered reveal
      trackTimeout(() => {
        const p = document.createElement('p');
        p.className = 'letter-paragraph';
        p.style.opacity = '0';
        p.style.transform = 'translateY(10px)';
        p.textContent = paragraph;
        letterText.appendChild(p);

        // Animate in
        trackTimeout(() => {
          p.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          p.style.opacity = '1';
          p.style.transform = 'translateY(0)';
        }, 50);
      }, delay);
    });
  }

  // Create floating hearts around the letter
  trackTimeout(() => {
    createLetterHearts();
  }, 800);

  // Create sparkles around the letter
  trackTimeout(() => {
    createLetterSparkles();
  }, 1000);

  // Show continue button after letter-opening animation finishes
  // Letter scene fades out (1000ms) + paper animation (800ms) = ~1800ms
  trackTimeout(() => {
    if (letterCloseBtn) {
      letterCloseBtn.classList.add('visible');
    }
  }, 1800);

  // Set up close button handler
  if (letterCloseBtn) {
    letterCloseBtn.addEventListener('click', closeLetterAndShowMysteryGift);
    letterCloseBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        closeLetterAndShowMysteryGift();
      }
    });
  }
}

function closeLetterAndShowMysteryGift() {
  // Remove event listener to prevent double-trigger
  if (letterCloseBtn) {
    letterCloseBtn.removeEventListener('click', closeLetterAndShowMysteryGift);
  }

  // Fade out letter content scene
  if (letterContentScene) {
    letterContentScene.classList.remove('visible');
    letterContentScene.style.opacity = '0';
    letterContentScene.style.pointerEvents = 'none';
    letterContentScene.setAttribute('aria-hidden', 'true');
  }

  if (letterScene) {
    letterScene.classList.remove('visible');
    letterScene.classList.remove('fade-out');
    letterScene.style.opacity = '0';
    letterScene.style.pointerEvents = 'none';
    letterScene.setAttribute('aria-hidden', 'true');
  }

  // Fade out letter paper
  if (letterPaper) {
    letterPaper.style.transform = 'scale(0.9) translateY(30px)';
    letterPaper.style.opacity = '0';
  }

  // Hide close button
  if (letterCloseBtn) {
    letterCloseBtn.classList.remove('visible');
  }

  // Show the gift after the letter fades
  trackTimeout(() => {
    cleanupSceneEffects('.letter-heart, .letter-sparkle');
    showMysteryGift();
  }, 1000);
}

function showPoem() {
  if (!poemScene) return;

  poemScene.classList.add('visible');
  poemScene.setAttribute('aria-hidden', 'false');

  poemScene.querySelectorAll('.poem-line').forEach((line, index) => {
    line.style.setProperty('--poem-delay', `${250 + index * 170}ms`);
  });

  if (poemContinue) {
    poemContinue.removeEventListener('click', continueFromPoem);
    poemContinue.addEventListener('click', continueFromPoem, { once: true });
    trackTimeout(() => poemContinue.classList.add('visible'), 7000);
  }
}

function continueFromPoem() {
  if (!poemScene) return;

  poemScene.classList.remove('visible');
  poemScene.classList.add('fade-out');
  poemScene.setAttribute('aria-hidden', 'true');

  trackTimeout(() => {
    poemScene.classList.remove('fade-out');
    showFinalMessage();
  }, 1000);
}

function showMysteryGift() {
  if (!mysteryGiftScene) return;

  mysteryGiftScene.classList.add('visible');
  mysteryGiftScene.setAttribute('aria-hidden', 'false');

  if (mysteryGift) {
    mysteryGift.addEventListener('click', openMysteryGift, { once: true });
    mysteryGift.addEventListener('keydown', handleMysteryGiftKeydown);
  }
}

function handleMysteryGiftKeydown(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    openMysteryGift();
  }
}

function openMysteryGift() {
  if (!mysteryGift || mysteryGift.classList.contains('open')) return;

  mysteryGift.classList.add('open');
  mysteryGift.removeEventListener('keydown', handleMysteryGiftKeydown);

  trackTimeout(() => {
    mysteryGift.classList.add('rose-rising');
  }, 900);

  trackTimeout(() => {
    mysteryGift.classList.add('rose-bloomed');
  }, 1800);

  trackTimeout(() => {
    mysteryGift.classList.add('message-visible');
  }, 3000);

  trackTimeout(() => {
    if (mysteryGiftContinue) {
      mysteryGiftContinue.classList.add('visible');
      mysteryGiftContinue.focus();
    }
  }, 3900);
}

function continueToPoem() {
  if (!mysteryGiftScene) return;

  mysteryGiftScene.classList.add('fade-out');
  mysteryGiftScene.setAttribute('aria-hidden', 'true');

  trackTimeout(() => {
    showPoem();
  }, 1000);
}

if (mysteryGiftContinue) {
  mysteryGiftContinue.addEventListener('click', continueToPoem);
}

function showFinalMessage() {
  // Show final message
  if (finalMessage) {
    finalMessage.classList.add('visible');
    finalMessage.setAttribute('aria-hidden', 'false');
  }

  // Launch the cinematic celebration sequence
  trackTimeout(() => {
    showCelebrationScene();
  }, 300);
}

function startMessageSequence(callback) {
  const finalMsg = getFinalMessage();
  if (finalMsg) {
    finalMsg.style.opacity = '1';
    finalMsg.style.transform = 'translate(-50%, -50%) scale(1)';
    finalMsg.classList.add('visible');
  }
  launchCelebration();
  if (callback) trackTimeout(callback, 2000);
}

function startGrandReveal() {
  if (birthdayScreen) {
    birthdayScreen.style.opacity = '0';
    birthdayScreen.style.pointerEvents = 'none';
  }
  const finalMsg = getFinalMessage();
  if (finalMsg) finalMsg.classList.add('final-reveal');
}

/* =========================================================
   MESSAGE SCENE EFFECTS
   ========================================================= */

function createFloatingHearts() {
  const count = 8;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';

    // Random start position around the message area
    const startX = 50 + (Math.random() - 0.5) * 60; // 20-80%
    const startY = 50 + (Math.random() - 0.5) * 40; // 30-70%
    heart.style.left = `${startX}%`;
    heart.style.top = `${startY}%`;

    // Drift amount
    const dx = (Math.random() - 0.5) * 200;
    const dy = -Math.random() * 150 - 50;
    heart.style.setProperty('--sx', `${dx * 0.6}px`);
    heart.style.setProperty('--sy', `${dy * 0.6}px`);

    // Vary animation duration: 10-14s
    const duration = 14 + Math.random() * 5;
    heart.style.animationDuration = `${duration}s`;

    // Stagger start
    heart.style.animationDelay = `${Math.random() * 3}s`;

    // Vary size
    const size = 14 + Math.random() * 10;
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;

    fragment.appendChild(heart);
  }

  messageScene.appendChild(fragment);

  // Trigger visibility after adding to DOM
  trackTimeout(() => {
    fragment.querySelectorAll('.floating-heart').forEach(h => h.classList.add('visible'));
  }, 50);
}

function createGlowingFlowers() {
  const count = 12;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const flower = document.createElement('span');
    flower.className = 'glowing-flower';

    // Random position around the message area
    const startX = 10 + Math.random() * 80; // 10-90%
    const startY = 10 + Math.random() * 80; // 10-90%
    flower.style.left = `${startX}%`;
    flower.style.top = `${startY}%`;

    // Drift amount
    const dx = (Math.random() - 0.5) * 120;
    const dy = -Math.random() * 100 - 30;
    flower.style.setProperty('--sx', `${dx * 0.6}px`);
    flower.style.setProperty('--sy', `${dy * 0.6}px`);

    // Vary animation duration: 8-12s
    const duration = 12 + Math.random() * 5;
    flower.style.animationDuration = `${duration}s`;

    // Stagger start
    flower.style.animationDelay = `${Math.random() * 2}s`;

    // Vary size
    const size = 8 + Math.random() * 8;
    flower.style.width = `${size}px`;
    flower.style.height = `${size}px`;

    fragment.appendChild(flower);
  }

  messageScene.appendChild(fragment);

  // Trigger visibility after adding to DOM
  trackTimeout(() => {
    fragment.querySelectorAll('.glowing-flower').forEach(f => f.classList.add('visible'));
  }, 50);
}

/* =========================================================
   AMBIENT SPARKLES
   ========================================================= */

function createAmbientSparkles() {
  const count = PERFORMANCE.ambientSparkles;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const sparkle = particlePools.ambientSparkle.pop() || document.createElement('span');
    sparkle.className = 'ambient-sparkle';

    // Random position across the viewport
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;

    // Very slow, gentle drift
    const dx = (Math.random() - 0.5) * 120;
    const dy = -Math.random() * 180 - 70;
    sparkle.style.setProperty('--dx', `${dx}px`);
    sparkle.style.setProperty('--dy', `${dy}px`);

    // Long duration: 15-20 seconds
    const duration = 15 + Math.random() * 5;
    sparkle.style.animationDuration = `${duration}s`;

    // Subtle size variation
    const size = 3 + Math.random() * 3; // 3-6px
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;

    // Staggered start
    sparkle.style.animationDelay = `${Math.random() * 5}s`;

    fragment.appendChild(sparkle);
  }

  celebrationLayer.appendChild(fragment);
}

/* =========================================================
   LETTER CONTENT SCENE EFFECTS
   ========================================================= */

function createLetterHearts() {
  const count = 10;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');
    heart.className = 'letter-heart';

    // Random position around the letter area (center of screen)
    const startX = 50 + (Math.random() - 0.5) * 70; // 15-85%
    const startY = 50 + (Math.random() - 0.5) * 60; // 20-80%
    heart.style.left = `${startX}%`;
    heart.style.top = `${startY}%`;

    // Drift amount - gentle floating around letter
    const dx = (Math.random() - 0.5) * 110;
    const dy = -Math.random() * 140 - 40;
    heart.style.setProperty('--sx', `${dx}px`);
    heart.style.setProperty('--sy', `${dy}px`);

    // Vary animation duration: 12-16s
    const duration = 12 + Math.random() * 4;
    heart.style.animationDuration = `${duration}s`;

    // Stagger start
    heart.style.animationDelay = `${Math.random() * 4}s`;

    // Vary size
    const size = 16 + Math.random() * 12; // 16-28px
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;

    fragment.appendChild(heart);
  }

  document.body.appendChild(fragment);

  // Trigger visibility after adding to DOM
  trackTimeout(() => {
    fragment.querySelectorAll('.letter-heart').forEach(h => h.classList.add('visible'));
  }, 50);
}

function createLetterSparkles() {
  const count = 15;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement('span');
    sparkle.className = 'letter-sparkle';

    // Random position around the letter area
    const startX = 50 + (Math.random() - 0.5) * 80; // 10-90%
    const startY = 50 + (Math.random() - 0.5) * 70; // 15-85%
    sparkle.style.left = `${startX}%`;
    sparkle.style.top = `${startY}%`;

    // Drift amount
    const dx = (Math.random() - 0.5) * 90;
    const dy = -Math.random() * 120 - 20;
    sparkle.style.setProperty('--sx', `${dx}px`);
    sparkle.style.setProperty('--sy', `${dy}px`);

    // Vary animation duration: 8-12s
    const duration = 12 + Math.random() * 5;
    sparkle.style.animationDuration = `${duration}s`;

    // Stagger start
    sparkle.style.animationDelay = `${Math.random() * 3}s`;

    // Vary size
    const size = 4 + Math.random() * 4; // 4-8px
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;

    fragment.appendChild(sparkle);
  }

  document.body.appendChild(fragment);

  // Trigger visibility after adding to DOM
  trackTimeout(() => {
    fragment.querySelectorAll('.letter-sparkle').forEach(s => s.classList.add('visible'));
  }, 50);
}

/* =========================================================
   CELEBRATION SCENE EFFECTS
   ========================================================= */

function createCelebrationBursts() {
  const count = 8;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const burst = document.createElement('span');
    burst.className = 'celebration-burst';

    // Random position across screen, favoring upper area for fireworks
    const x = 15 + Math.random() * 70; // 15-85%
    const y = 10 + Math.random() * 40; // 10-50%
    burst.style.left = `${x}%`;
    burst.style.top = `${y}%`;

    // Random color variation
    const hue = 320 + Math.random() * 60; // Pink to purple range
    burst.style.background = `radial-gradient(circle, hsl(${hue}, 100%, 70%) 0%, transparent 70%)`;
    burst.style.boxShadow = `0 0 20px hsl(${hue}, 100%, 70%), 0 0 40px hsl(${hue}, 100%, 50%)`;

    // Stagger animation
    burst.style.animationDelay = `${Math.random() * 0.5}s`;
    burst.style.animationDuration = `${1 + Math.random() * 0.5}s`;

    fragment.appendChild(burst);
  }

  document.body.appendChild(fragment);

  // Cleanup
  trackTimeout(() => {
    fragment.querySelectorAll('.celebration-burst').forEach(b => b.remove());
  }, 2000);
}

function createLightExplosions() {
  const count = 6;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const explosion = document.createElement('span');
    explosion.className = 'light-explosion';

    // Random position
    const x = 20 + Math.random() * 60;
    const y = 15 + Math.random() * 35;
    explosion.style.left = `${x}%`;
    explosion.style.top = `${y}%`;

    // Random size
    const size = 60 + Math.random() * 100;
    explosion.style.width = `${size}px`;
    explosion.style.height = `${size}px`;

    // Color variation
    const hue = 330 + Math.random() * 50;
    explosion.style.borderColor = `hsla(${hue}, 100%, 70%, 0.6)`;

    // Stagger
    explosion.style.animationDelay = `${Math.random() * 0.8}s`;
    explosion.style.animationDuration = `${1.2 + Math.random() * 0.6}s`;

    fragment.appendChild(explosion);
  }

  document.body.appendChild(fragment);

  trackTimeout(() => {
    fragment.querySelectorAll('.light-explosion').forEach(e => e.remove());
  }, 2500);
}

function createMagicSparkles() {
  const count = 25;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const sparkle = particlePools.ambientSparkle.pop() || document.createElement('span');
    sparkle.className = 'magic-sparkle';

    // Full screen distribution
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;

    // Gentle drift
    const dx = (Math.random() - 0.5) * 150;
    const dy = -Math.random() * 200 - 50;
    sparkle.style.setProperty('--sx', `${dx}px`);
    sparkle.style.setProperty('--sy', `${dy}px`);

    // Long duration
    const duration = 8 + Math.random() * 4;
    sparkle.style.animationDuration = `${duration}s`;

    // Size variation
    const size = 3 + Math.random() * 4;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;

    sparkle.style.animationDelay = `${Math.random() * 3}s`;

    fragment.appendChild(sparkle);
  }

  document.body.appendChild(fragment);
}

function createFloatingHeartsCelebration() {
  const count = 12;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');
    heart.className = 'celebration-heart';

    // Start from bottom area, spread horizontally
    const startX = 10 + Math.random() * 80;
    const startY = 70 + Math.random() * 25;
    heart.style.left = `${startX}%`;
    heart.style.top = `${startY}%`;

    // Drift upward and sideways
    const dx = (Math.random() - 0.5) * 200;
    const dy = -Math.random() * 300 - 150;
    heart.style.setProperty('--sx', `${dx}px`);
    heart.style.setProperty('--sy', `${dy}px`);

    // Vary animation duration
    const duration = 10 + Math.random() * 6;
    heart.style.animationDuration = `${duration}s`;

    // Stagger start
    heart.style.animationDelay = `${Math.random() * 2}s`;

    // Vary size
    const size = 14 + Math.random() * 12;
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;

    fragment.appendChild(heart);
  }

  document.body.appendChild(fragment);

  // Trigger visibility
  trackTimeout(() => {
    fragment.querySelectorAll('.celebration-heart').forEach(h => h.classList.add('visible'));
  }, 50);
}

function createCelebrationBalloons() {
  const count = 8;
  const fragment = document.createDocumentFragment();

  const balloonColors = [
    { color: '#ff6b9d', dark: '#e84a7a' },
    { color: '#ffd93d', dark: '#e6c236' },
    { color: '#6bcb77', dark: '#5aa865' },
    { color: '#a8d8ea', dark: '#90c5d6' },
    { color: '#ffb347', dark: '#e6a03d' },
    { color: '#d4a5ff', dark: '#c090e8' },
  ];

  for (let i = 0; i < count; i++) {
    const balloon = document.createElement('span');
    balloon.className = 'celebration-balloon';

    const colorSet = balloonColors[i % balloonColors.length];
    balloon.style.setProperty('--balloon-color', colorSet.color);
    balloon.style.setProperty('--balloon-color-dark', colorSet.dark);

    // Start from bottom
    balloon.style.left = `${5 + Math.random() * 90}%`;
    balloon.style.top = `${90 + Math.random() * 8}%`;

    // Horizontal drift
    const dx = (Math.random() - 0.5) * 180;
    balloon.style.setProperty('--dx', `${dx}px`);

    // Vary animation duration
    const duration = 14 + Math.random() * 6;
    balloon.style.animationDuration = `${duration}s`;

    balloon.style.animationDelay = `${Math.random() * 2}s`;

    fragment.appendChild(balloon);
  }

  document.body.appendChild(fragment);

  // Cleanup after they float off screen
  trackTimeout(() => {
    fragment.querySelectorAll('.celebration-balloon').forEach(b => b.remove());
  }, 30000);
}

/**
 * Main celebration sequence orchestrator
 * Creates a cinematic, layered celebration that builds up, peaks, then settles
 */
function showCelebrationScene() {
  const celebrationTitle = document.getElementById('celebrationTitle');
  if (!finalMessage) return;

  finalMessage.classList.remove('message-stage', 'ending');
  if (replayButton) replayButton.classList.remove('visible');
  document.body.style.transition = 'background 2s ease';
  document.body.style.background = 'radial-gradient(ellipse at 50% 45%, #24172c 0%, #100b1b 58%, #080711 100%)';

  trackTimeout(() => {
    finalMessage.classList.add('message-stage');
    if (celebrationTitle) celebrationTitle.classList.add('glow');
  }, 600);

  trackTimeout(() => {
    finalMessage.classList.add('ending');
  }, 3600);

  trackTimeout(() => {
    if (replayButton) replayButton.classList.add('visible');
  }, 4700);
}

function replayJourney() {
  const replayTitle = document.getElementById('celebrationTitle');
  allTimeouts.forEach(id => clearTimeout(id));
  allIntervals.forEach(id => clearInterval(id));
  allTimeouts = [];
  allIntervals = [];
  stopPerformanceMonitoring();

  document.querySelectorAll('.star, .dust, .heart-particle').forEach(element => {
    element.classList.remove('visible', 'revealed', 'quiet');
  });
  document.querySelectorAll('.celebration-burst, .magic-sparkle, .celebration-heart, .light-explosion, .celebration-balloon, .confetti, .firework').forEach(element => element.remove());

  [messageScene, letterScene, letterContentScene, poemScene, mysteryGiftScene, finalMessage].forEach(element => {
    if (!element) return;
    element.classList.remove('visible', 'fade-out', 'final-reveal', 'message-stage', 'ending');
    element.setAttribute('aria-hidden', 'true');
  });
  if (envelope) envelope.classList.remove('open');
  if (letterPrompt) letterPrompt.classList.remove('pulse');
  if (letterLine1) letterLine1.classList.remove('visible');
  if (letterLine2) letterLine2.classList.remove('visible');
  if (letterCloseBtn) letterCloseBtn.classList.remove('visible');
  if (poemContinue) poemContinue.classList.remove('visible');
  if (mysteryGift) mysteryGift.classList.remove('open', 'rose-rising', 'rose-bloomed', 'message-visible');
  if (mysteryGiftContinue) mysteryGiftContinue.classList.remove('visible');
  if (heartStage) {
    heartStage.classList.remove('revealed', 'quiet');
    heartStage.style.opacity = '';
    heartStage.style.filter = '';
  }
  if (heartShell) {
    heartShell.style.opacity = '';
    heartShell.style.transform = '';
  }
  if (centerBeacon) {
    centerBeacon.classList.remove('visible');
    centerBeacon.style.opacity = '';
  }
  if (birthdayScreen) {
    birthdayScreen.classList.remove('fade-out');
    birthdayScreen.style.opacity = '';
    birthdayScreen.style.pointerEvents = '';
  }
  if (startButton) {
    startButton.disabled = false;
    startButton.style.opacity = '';
    startButton.style.pointerEvents = '';
  }
  if (replayButton) replayButton.classList.remove('visible');
  if (replayTitle) replayTitle.classList.remove('glow');
  window.scrollTo(0, 0);
}

if (replayButton) replayButton.addEventListener('click', replayJourney);

/* =========================================================
   GLOBAL STATE (declared first to avoid TDZ)
   ========================================================= */

let heartbeatLoop;
let allTimeouts = [];
let allIntervals = [];

/* =========================================================
   STARTUP
   ========================================================= */

createStars();
createDust();
createHeartParticles();

// Helper to track timeouts for cleanup
function trackTimeout(fn, delay) {
  const id = setTimeout(fn, delay);
  allTimeouts.push(id);
  return id;
}

// Helper to track intervals for cleanup
function trackInterval(fn, delay) {
  const id = setInterval(fn, delay);
  allIntervals.push(id);
  return id;
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  allTimeouts.forEach(id => clearTimeout(id));
  allIntervals.forEach(id => clearInterval(id));
  stopPerformanceMonitoring();
});