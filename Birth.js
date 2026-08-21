/* =========================================================
   PERFORMANCE SETTINGS
   ========================================================= */

const PERFORMANCE = {
  stars: 70,
  dust: 70,
  heartOrbit: 38,
  heartRise: 28,
  leaves: 220,
  treeParticles: 45,
  heartPoints: 110,
  spiralPetals: 110,
  fireworks: 6,
  lanterns: 10,
  butterflies: 8,
  blossoms: 14,
  balloons: 6,
  confetti: 24
};

const isLowPower =
  (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
  (navigator.deviceMemory && navigator.deviceMemory <= 4);

if (isLowPower) {
  PERFORMANCE.stars = 55;
  PERFORMANCE.dust = 45;
  PERFORMANCE.heartOrbit = 28;
  PERFORMANCE.heartRise = 20;
  PERFORMANCE.leaves = 160;
  PERFORMANCE.treeParticles = 30;
  PERFORMANCE.heartPoints = 90;
  PERFORMANCE.spiralPetals = 90;
}


/* =========================================================
   STARS
   ========================================================= */

function createStars() {
  const fragment = document.createDocumentFragment();

  const starStyles = [
    { size: 1.6, bloom: true },
    { size: 1.1, bloom: false },
    { size: 2.0, bloom: true },
    { size: 0.8, bloom: false },
    { size: 1.4, bloom: false }
  ];

  for (let i = 0; i < PERFORMANCE.stars; i++) {
    const star = document.createElement('span');
    const style = starStyles[i % starStyles.length];

    const size =
      style.size * (Math.random() * 0.8 + 0.6);

    star.className =
      `star ${style.bloom ? 'bloom' : ''}`;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    star.style.left =
      `${Math.random() * 100}%`;

    star.style.top =
      `${Math.random() * 100}%`;

    star.style.opacity = '0';

    const flicker =
      2.5 + Math.random() * 3;

    star.style.animation =
      `twinkle ${flicker}s ease-in-out infinite alternate`;

    star.style.animationDelay =
      `${Math.random() * 2}s`;

    fragment.appendChild(star);
  }

  starsLayer.appendChild(fragment);
}


/* =========================================================
   DUST
   ========================================================= */

function createDust() {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < PERFORMANCE.dust; i++) {
    const dust = document.createElement('span');

    const near = Math.random() > 0.82;

    dust.className =
      `dust ${near ? 'near' : ''}`;

    dust.style.left =
      `${Math.random() * 100}%`;

    dust.style.top =
      `${Math.random() * 100}%`;

    const size = near ? 3 : 2;

    dust.style.width = `${size}px`;
    dust.style.height = `${size}px`;

    dust.style.setProperty(
      '--dx',
      `${(Math.random() - 0.5) * 120}px`
    );

    dust.style.setProperty(
      '--dy',
      `${-Math.random() * 180 - 30}px`
    );

    dust.style.setProperty(
      '--dur',
      `${Math.random() * 10 + 12}s`
    );

    dust.style.animationDelay =
      `${Math.random() * 5}s`;

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
      `${Math.random() * 7 + 9}s`
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
      `${(Math.random() - 0.5) * 130}px`
    );

    p.style.setProperty(
      '--dy',
      `${-Math.random() * 190 - 20}px`
    );

    p.style.setProperty(
      '--riseDur',
      `${Math.random() * 4 + 4}s`
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

  for (let i = 0; i < sparkCount; i++) {
    const spark =
      document.createElement('span');

    spark.className = 'spark';

    spark.style.setProperty(
      '--sx',
      `${(Math.random() - 0.5) * 120}px`
    );

    spark.style.setProperty(
      '--sy',
      `${(Math.random() - 0.5) * 120}px`
    );

    spark.style.animationDelay =
      `${Math.random() * 0.6}s`;

    heartSparks.appendChild(spark);

    setTimeout(() => {
      spark.remove();
    }, 2000);
  }
}


/* =========================================================
   REALISTIC TREE BRANCHES
   ========================================================= */

function spawnTreeBranches() {

  const branchData = [

    // Main trunk branches
    { angle: -52, height: 125, width: 10, offset: -55, bottom: 155 },
    { angle: -38, height: 150, width: 11, offset: -30, bottom: 175 },
    { angle: -22, height: 170, width: 12, offset: -10, bottom: 190 },
    { angle: -8,  height: 185, width: 13, offset: 0,   bottom: 200 },

    { angle: 10, height: 175, width: 12, offset: 15, bottom: 195 },
    { angle: 25, height: 155, width: 11, offset: 35, bottom: 180 },
    { angle: 42, height: 130, width: 10, offset: 60, bottom: 160 },

    // Lower branches
    { angle: -65, height: 95, width: 7, offset: -75, bottom: 145 },
    { angle: -45, height: 110, width: 7, offset: -105, bottom: 125 },
    { angle: -28, height: 105, width: 7, offset: -125, bottom: 115 },

    { angle: 62, height: 95, width: 7, offset: 78, bottom: 145 },
    { angle: 45, height: 110, width: 7, offset: 105, bottom: 125 },
    { angle: 28, height: 105, width: 7, offset: 125, bottom: 115 },

    // Upper branches
    { angle: -35, height: 105, width: 6, offset: -42, bottom: 245 },
    { angle: -18, height: 120, width: 6, offset: -20, bottom: 255 },
    { angle: 18, height: 120, width: 6, offset: 22, bottom: 255 },
    { angle: 35, height: 105, width: 6, offset: 45, bottom: 245 }
  ];

  branchData.forEach((branch, index) => {

    const branchEl =
      document.createElement('span');

    branchEl.className = 'branch';

    branchEl.style.left =
      `${50 + branch.offset * 0.22}%`;

    branchEl.style.bottom =
      `${branch.bottom}px`;

    branchEl.style.width =
      `${branch.width}px`;

    branchEl.style.setProperty(
      '--branch-height',
      `${branch.height}px`
    );

    branchEl.style.transform =
      `translateX(-50%) rotate(${branch.angle}deg)`;

    branchLayer.appendChild(branchEl);

    setTimeout(() => {
      branchEl.classList.add('visible');
    }, 700 + index * 180);
  });
}


/* =========================================================
   REALISTIC TREE LEAVES
   ========================================================= */

function spawnLeaves() {

  for (let i = 0; i < PERFORMANCE.leaves; i++) {

    const leaf =
      document.createElement('span');

    leaf.className = 'leaf';

    /*
      The tree crown is:
      - narrower at the top
      - widest around the middle
      - narrower near the bottom
    */

    const y =
      16 + Math.random() * 55;

    const normalizedY =
      (y - 16) / 55;

    const crownWidth =
      35 +
      Math.sin(normalizedY * Math.PI) * 70;

    const x =
      50 +
      (Math.random() - 0.5) * crownWidth;

    const size =
      7 + Math.random() * 10;

    leaf.style.left =
      `${x}%`;

    leaf.style.top =
      `${y}%`;

    leaf.style.width =
      `${size}px`;

    leaf.style.height =
      `${size * 0.72}px`;

    leaf.style.setProperty(
      '--leaf-rotate',
      `${Math.random() * 100 - 50}deg`
    );

    leafLayer.appendChild(leaf);

    setTimeout(() => {
      leaf.classList.add('visible');
    }, 900 + i * 7);
  }
}


/* =========================================================
   TREE PARTICLES
   ========================================================= */

function spawnTreeParticles() {

  for (
    let i = 0;
    i < PERFORMANCE.treeParticles;
    i++
  ) {

    const particle =
      document.createElement('span');

    particle.className =
      'tree-particle';

    particle.style.left =
      `${50 + (Math.random() - 0.5) * 34}%`;

    particle.style.top =
      `${50 + (Math.random() - 0.5) * 34}%`;

    particle.style.setProperty(
      '--dx',
      `${(Math.random() - 0.5) * 150}px`
    );

    particle.style.setProperty(
      '--dy',
      `${-Math.random() * 170 - 20}px`
    );

    particle.style.animationDelay =
      `${Math.random() * 4}s`;

    treeParticleLayer.appendChild(particle);
  }
}


/* =========================================================
   TREE TRANSFORMATION
   ========================================================= */

function beginTreeTransformation() {

  treeStage.classList.add('ready');

  treeStage.style.opacity = '1';

  heartStage.classList.add('transforming');

  heartShell.style.top = '36%';

  heartShell.style.transform =
    'translate(-50%, -50%) scale(0.7)';

  heartShell.style.filter =
    'drop-shadow(0 0 24px rgba(255,196,226,0.7))';

  // Grow trunk
  setTimeout(() => {

    treeTrunk.style.height =
      '190px';

    treeTrunk.style.opacity =
      '1';

  }, 450);

  // Grow branches
  setTimeout(() => {
    spawnTreeBranches();
  }, 1500);

  // Grow leaves
  setTimeout(() => {

    spawnLeaves();
    spawnTreeParticles();

  }, 3200);

  // Activate aura
  setTimeout(() => {

    const glow =
      document.querySelector('.tree-aura');

    if (glow) {
      glow.style.opacity = '1';
    }

  }, 2200);
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
      `${Math.cos(angle) * 90}px`
    );

    petal.style.setProperty(
      '--dy',
      `${Math.sin(angle) * 90}px`
    );

    petal.style.animationDelay =
      `${i * 0.02}s`;

    spiral.appendChild(petal);
  }

  setTimeout(() => {

    spiral.style.opacity = '0';

    setTimeout(() => {
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


  // Fireworks

  for (
    let i = 0;
    i < fireworkCount;
    i++
  ) {

    const firework =
      document.createElement('span');

    firework.className =
      `firework ${variants[i % variants.length]}`;

    firework.style.left =
      `${18 + Math.random() * 64}%`;

    firework.style.top =
      `${12 + Math.random() * 28}%`;

    firework.style.animationDelay =
      `${Math.random() * 0.9}s`;

    celebrationLayer.appendChild(firework);

    setTimeout(() => {
      firework.remove();
    }, 5000);
  }


  // Lanterns

  for (
    let i = 0;
    i < lanternCount;
    i++
  ) {

    const lantern =
      document.createElement('span');

    lantern.className =
      'lantern';

    lantern.style.left =
      `${Math.random() * 92}%`;

    lantern.style.top =
      `${85 + Math.random() * 6}%`;

    lantern.style.setProperty(
      '--dx',
      `${(Math.random() - 0.5) * 110}px`
    );

    lantern.style.animationDelay =
      `${Math.random() * 0.3}s`;

    celebrationLayer.appendChild(lantern);

    setTimeout(() => {
      lantern.remove();
    }, 9000);
  }


  // Butterflies

  for (
    let i = 0;
    i < butterflyCount;
    i++
  ) {

    const butterfly =
      document.createElement('span');

    butterfly.className =
      'butterfly';

    butterfly.style.left =
      `${10 + Math.random() * 80}%`;

    butterfly.style.top =
      `${20 + Math.random() * 54}%`;

    butterfly.style.setProperty(
      '--dx',
      `${(Math.random() - 0.5) * 150}px`
    );

    butterfly.style.setProperty(
      '--dy',
      `${(Math.random() - 0.5) * 150}px`
    );

    butterfly.style.animationDelay =
      `${Math.random() * 4}s`;

    celebrationLayer.appendChild(butterfly);

    setTimeout(() => {
      butterfly.remove();
    }, 9000);
  }


  // Blossom petals

  for (
    let i = 0;
    i < blossomCount;
    i++
  ) {

    const petal =
      document.createElement('span');

    petal.className =
      'blossom-petal';

    petal.style.left =
      `${Math.random() * 94}%`;

    petal.style.top =
      `${Math.random() * 16}%`;

    petal.style.setProperty(
      '--dx',
      `${(Math.random() - 0.5) * 170}px`
    );

    petal.style.animationDelay =
      `${Math.random() * 2.8}s`;

    celebrationLayer.appendChild(petal);

    setTimeout(() => {
      petal.remove();
    }, 7000);
  }


  // Balloons

  for (
    let i = 0;
    i < balloonCount;
    i++
  ) {

    const balloon =
      document.createElement('span');

    balloon.className =
      'balloon';

    balloon.style.left =
      `${Math.random() * 86}%`;

    balloon.style.top =
      `${86 + Math.random() * 8}%`;

    balloon.style.setProperty(
      '--dx',
      `${(Math.random() - 0.5) * 220}px`
    );

    balloon.style.animationDelay =
      `${Math.random() * 0.8}s`;

    celebrationLayer.appendChild(balloon);

    setTimeout(() => {
      balloon.remove();
    }, 10000);
  }


  // Confetti

  for (
    let i = 0;
    i < confettiCount;
    i++
  ) {

    const confetti =
      document.createElement('span');

    confetti.className =
      'confetti';

    confetti.style.left =
      `${Math.random() * 92}%`;

    confetti.style.top =
      `${Math.random() * 28}%`;

    confetti.style.setProperty(
      '--dx',
      `${(Math.random() - 0.5) * 240}px`
    );

    confetti.style.animationDelay =
      `${Math.random() * 1.6}s`;

    celebrationLayer.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 7000);
  }
}


/* =========================================================
   HEARTBEAT
   ========================================================= */

function triggerHeartbeat() {

  heartStage.classList.add('beating');

  createSparkBurst();

  dimNearbyStars();

  setTimeout(() => {

    heartStage.classList.remove('beating');

    restoreStars();

  }, 1650);
}


/* =========================================================
   STARTUP
   ========================================================= */

createStars();
createDust();
createHeartParticles();

let heartbeatLoop;

setTimeout(() => {

  scene.classList.add('ready');

  const stars =
    Array.from(
      document.querySelectorAll('.star')
    );

  stars.forEach((star, index) => {

    setTimeout(() => {

      star.classList.add('visible');

    }, 700 + index * 20);

  });


  setTimeout(() => {

    centerBeacon.classList.add('visible');

  }, 1800);


  setTimeout(() => {

    heartStage.classList.add('revealed');

    heartShell.style.opacity =
      '1';

  }, 4000);


  // Heartbeat

  setTimeout(() => {

    triggerHeartbeat();

    heartbeatLoop =
      setInterval(
        triggerHeartbeat,
        5200
      );

  }, 6500);


  // Begin transformation

  setTimeout(() => {

    clearInterval(heartbeatLoop);

    heartStage.classList.add('quiet');

    centerBeacon.style.opacity =
      '0.64';


    setTimeout(() => {

      launchTransformationPulse();

    }, 900);


    setTimeout(() => {

      heartStage.style.filter =
        'drop-shadow(0 0 30px rgba(255,175,197,0.55))';

      heartShell.style.transform =
        'translate(-50%, -50%) scale(0.9)';

      beginTreeTransformation();

    }, 2400);


    // Tree fireflies

    setTimeout(() => {

      const fireflies =
        isLowPower ? 10 : 16;

      for (
        let i = 0;
        i < fireflies;
        i++
      ) {

        const firefly =
          document.createElement('span');

        firefly.className =
          'firefly';

        firefly.style.left =
          `${Math.random() * 100}%`;

        firefly.style.top =
          `${Math.random() * 100}%`;

        firefly.style.setProperty(
          '--fx',
          `${(Math.random() - 0.5) * 44}px`
        );

        firefly.style.setProperty(
          '--fy',
          `${(Math.random() - 0.5) * 44}px`
        );

        firefly.style.animationDelay =
          `${Math.random() * 3}s`;

        treeStage.appendChild(firefly);

        setTimeout(() => {
          firefly.remove();
        }, 12000);
      }

    }, 5000);


    // Story

    setTimeout(() => {

      startMessageSequence(() => {

        startGrandReveal();

      });

    }, 8200);

  }, 15000);

}, 1000);