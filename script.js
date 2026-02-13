/* ═══════════════════════════════════════════
   script.js  — page logic & interactions
═══════════════════════════════════════════ */

/* ─── ELEMENTS ─── */
const bgMusic     = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

const letterContinue   = document.getElementById('letterContinue');
const thankYouContinue = document.getElementById('thankYouContinue');

const yesBtn     = document.getElementById('yesBtn');
const noBtn      = document.getElementById('noBtn');
const qResponse  = document.getElementById('q-response');
const btnArea    = document.getElementById('btnArea');

const category1 = document.getElementById('category1');
const category2 = document.getElementById('category2');
const category3 = document.getElementById('category3');

const backFromRoses    = document.getElementById('backFromRoses');
const backFromMemories = document.getElementById('backFromMemories');
const backFromSong     = document.getElementById('backFromSong');

const vinylDisc    = document.getElementById('vinylDisc');
const needle       = document.getElementById('needle');
const wavesEl      = document.getElementById('waves');
const playBtn      = document.getElementById('playBtn');
const progressWrap = document.getElementById('progressWrap');
const progressFill = document.getElementById('progressFill');
const timeDisplay  = document.getElementById('timeDisplay');
const songAudio    = document.getElementById('songAudio');

const roseParticles = document.getElementById('roseParticles');

/* ─── MUSIC ─── */
let musicPlaying = false;

function startMusic() {
  bgMusic.volume = 0.55;
  bgMusic.play().catch(() => {});
  musicToggle.textContent = '🔊';
  musicToggle.classList.add('playing');
  musicPlaying = true;
}

function stopMusic() {
  bgMusic.pause();
  musicToggle.textContent = '🔇';
  musicToggle.classList.remove('playing');
  musicPlaying = false;
}

musicToggle.addEventListener('click', () => {
  if (musicPlaying) stopMusic(); else startMusic();
});

/* ─── SECTION TRANSITIONS ─── */
const ALL_SECTIONS = [
  'heroSection', 'letterSection', 'questionSection',
  'thankYouSection', 'categoriesSection',
  'rosesSection', 'memoriesSection', 'songSection'
];

function showSection(id) {
  ALL_SECTIONS.forEach(sid => {
    const el = document.getElementById(sid);
    if (el) el.classList.add('hidden');
  });
  const target = document.getElementById(id);
  if (target) {
    target.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function transitionTo(id) {
  // find currently visible section
  const current = ALL_SECTIONS.map(s => document.getElementById(s)).find(el => el && !el.classList.contains('hidden'));
  if (current) {
    current.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    current.style.opacity    = '0';
    current.style.transform  = 'scale(0.96)';
    setTimeout(() => {
      current.style.opacity   = '';
      current.style.transform = '';
      current.style.transition= '';
      showSection(id);
    }, 450);
  } else {
    showSection(id);
  }
}

/* ─── STEP 1: Auto-start — hero is visible by default ─── */
// hero is already shown (no .hidden on #heroSection)
// Start music on first scroll or click anywhere
let firstInteraction = false;
function handleFirstInteraction() {
  if (firstInteraction) return;
  firstInteraction = true;
  startMusic();
  document.removeEventListener('click',    handleFirstInteraction);
  document.removeEventListener('touchstart', handleFirstInteraction);
  document.removeEventListener('scroll',   handleFirstInteraction);
}
document.addEventListener('click',     handleFirstInteraction, { once: true });
document.addEventListener('touchstart',handleFirstInteraction, { once: true });
document.addEventListener('scroll',    handleFirstInteraction, { once: true });

/* ─── STEP 2: Letter continue ─── */
letterContinue.addEventListener('click', (e) => {
  launchHearts(e.clientX, e.clientY, 7);
  transitionTo('questionSection');
});

/* ─── STEP 3: Valentine Question ─── */
let noCount      = 0;
let yesBtnScale  = 1;

function getRandomScreenPos() {
  const margin = 70;
  return {
    x: margin + Math.random() * (window.WinnerWidth  - margin * 2 - noBtn.offsetWidth),
    y: margin + Math.random() * (window.innerHeight - margin * 2 - noBtn.offsetHeight)
  };
}

noBtn.addEventListener('click', () => {
  noCount++;

  // Make it float freely on first click
  if (noCount === 1) {
    noBtn.classList.add('floating');
  }

  // After 3 clicks → disappear, center Yes
  if (noCount >= 3) {
    noBtn.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    noBtn.style.opacity    = '0';
    noBtn.style.transform  = 'scale(0) rotate(20deg)';
    setTimeout(() => {
      noBtn.style.display = 'none';
      yesBtn.style.transition = 'all 0.6s cubic-bezier(0.34,1.56,0.64,1)';
      btnArea.style.justifyContent = 'center';
    }, 420);
    qResponse.textContent = "Okay I removed it… you know you want to say Yes 😊💕";
    qResponse.classList.add('show');
    return;
  }

  // Fly to random spot
  const pos = getRandomScreenPos();
  noBtn.style.left = pos.x + 'px';
  noBtn.style.top  = pos.y + 'px';

  // Grow Yes button
  yesBtnScale += 0.28;
  yesBtn.style.transform = `scale(${yesBtnScale})`;

  const msgs = [
    "Catch me if you can! 🏃‍♀️",
    "Almost got me... try Yes instead! 💕",
  ];
  qResponse.textContent = msgs[noCount - 1] || msgs[0];
  qResponse.classList.add('show');
  setTimeout(() => qResponse.classList.remove('show'), 1800);
});

yesBtn.addEventListener('click', (e) => {
  launchHearts(e.clientX, e.clientY, 22);
  launchConfetti(e.clientX, e.clientY);

  qResponse.textContent = "Yay!! You made me the happiest!! 🥰💕🌹";
  qResponse.classList.add('show');

  yesBtn.style.pointerEvents = 'none';
  if (noBtn) noBtn.style.display = 'none';

  setTimeout(() => transitionTo('thankYouSection'), 2400);
});

/* ─── STEP 4: Thank You → Categories ─── */
thankYouContinue.addEventListener('click', (e) => {
  launchHearts(e.clientX, e.clientY, 12);
  launchConfetti(e.clientX, e.clientY);
  transitionTo('categoriesSection');
});

/* ─── STEP 5: Categories ─── */
category1.addEventListener('click', (e) => {
  launchHearts(e.clientX, e.clientY, 8);
  transitionTo('rosesSection');
  // start sparks after transition
  setTimeout(() => startRoseSparks(roseParticles), 500);
});

category2.addEventListener('click', (e) => {
  launchHearts(e.clientX, e.clientY, 8);
  stopRoseSparks(roseParticles);
  transitionTo('memoriesSection');
});

category3.addEventListener('click', (e) => {
  launchHearts(e.clientX, e.clientY, 8);
  stopRoseSparks(roseParticles);
  transitionTo('songSection');
});

/* ─── BACK BUTTONS ─── */
backFromRoses.addEventListener('click', () => {
  stopRoseSparks(roseParticles);
  transitionTo('categoriesSection');
});

backFromMemories.addEventListener('click', () => {
  transitionTo('categoriesSection');
});

backFromSong.addEventListener('click', () => {
  pauseSong();
  transitionTo('categoriesSection');
});

/* ─── SONG PLAYER ─── */
function formatTime(s) {
  const m   = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec < 10 ? '0' : ''}${sec}`;
}

function playSong() {
  songAudio.play().catch(() => {});
  playBtn.textContent = '⏸';
  vinylDisc.classList.add('spinning');
  needle.classList.add('playing');
  wavesEl.classList.add('active');
}

function pauseSong() {
  songAudio.pause();
  playBtn.textContent = '▶';
  vinylDisc.classList.remove('spinning');
  needle.classList.remove('playing');
  wavesEl.classList.remove('active');
}

playBtn.addEventListener('click', () => {
  if (songAudio.paused) playSong(); else pauseSong();
});

songAudio.addEventListener('timeupdate', () => {
  if (songAudio.duration) {
    const pct = (songAudio.currentTime / songAudio.duration) * 100;
    progressFill.style.width = pct + '%';
    timeDisplay.textContent  = formatTime(songAudio.currentTime);
  }
});

songAudio.addEventListener('ended', () => {
  playBtn.textContent = '▶';
  vinylDisc.classList.remove('spinning');
  needle.classList.remove('playing');
  wavesEl.classList.remove('active');
  progressFill.style.width = '0%';
  timeDisplay.textContent  = '0:00';
});

progressWrap.addEventListener('click', (e) => {
  if (!songAudio.duration) return;
  const rect = progressWrap.getBoundingClientRect();
  const pct  = (e.clientX - rect.left) / rect.width;
  songAudio.currentTime = pct * songAudio.duration;
});