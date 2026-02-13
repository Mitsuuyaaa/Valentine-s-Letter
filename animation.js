/* ═══════════════════════════════════════════
   animation.js  — pure visual effects
═══════════════════════════════════════════ */

/* ─── GLITTER CANVAS ─── */
const canvas = document.getElementById('glitter');
const ctx    = canvas.getContext('2d');
let glitterParticles = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', () => { resizeCanvas(); initGlitter(); });

function initGlitter() {
  glitterParticles = [];
  const count = Math.floor((canvas.width * canvas.height) / 3800);
  const colors = ['#ff6b6b','#ffb3c6','#ffd700','#ff8c94','#ffffff','#c0392b','#f1948a','#e74c3c'];
  for (let i = 0; i < count; i++) {
    glitterParticles.push({
      x:          Math.random() * canvas.width,
      y:          Math.random() * canvas.height,
      r:          Math.random() * 2 + 0.4,
      speed:      Math.random() * 0.35 + 0.08,
      drift:      (Math.random() - 0.5) * 0.4,
      opacity:    Math.random(),
      opacityDir: Math.random() > 0.5 ? 1 : -1,
      color:      colors[Math.floor(Math.random() * colors.length)],
      angle:      Math.random() * Math.PI * 2
    });
  }
}
initGlitter();

function drawGlitter(ts) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  glitterParticles.forEach(p => {
    // move
    p.y       -= p.speed;
    p.x       += p.drift;
    p.opacity += p.opacityDir * 0.012;
    if (p.opacity >= 1)   { p.opacityDir = -1; }
    if (p.opacity <= 0)   { p.opacityDir =  1; }
    if (p.y < -6)         { p.y = canvas.height + 6; p.x = Math.random() * canvas.width; }
    if (p.x < -6 || p.x > canvas.width + 6) { p.x = Math.random() * canvas.width; }

    // draw 4-point star
    ctx.save();
    ctx.globalAlpha  = Math.max(0, p.opacity);
    ctx.fillStyle    = p.color;
    ctx.shadowBlur   = 8;
    ctx.shadowColor  = p.color;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle + ts * 0.0008);
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2;
      ctx.lineTo(Math.cos(a) * p.r * 2.8, Math.sin(a) * p.r * 2.8);
      ctx.lineTo(Math.cos(a + Math.PI / 4) * p.r * 0.9, Math.sin(a + Math.PI / 4) * p.r * 0.9);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  });
  requestAnimationFrame(drawGlitter);
}
requestAnimationFrame(drawGlitter);

/* ─── FALLING PETALS ─── */
const petalsContainer = document.getElementById('petals');

function spawnPetal() {
  const p       = document.createElement('div');
  p.className   = 'petal';
  const emojis  = ['🌸', '🌺', '🌹', '🌷'];
  p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  const dur     = 6 + Math.random() * 9;
  const size    = 14 + Math.random() * 18;
  p.style.cssText = `
    left: ${Math.random() * 100}vw;
    top: -40px;
    font-size: ${size}px;
    animation-duration: ${dur}s;
    animation-delay: ${Math.random() * 3}s;
    --drift: ${(Math.random() - 0.5) * 180}px;
    opacity: ${0.5 + Math.random() * 0.5};
  `;
  petalsContainer.appendChild(p);
  setTimeout(() => p.remove(), (dur + 3) * 1000);
}

setInterval(spawnPetal, 800);

/* ─── FLOATING HEARTS (ambient) ─── */
function spawnAmbientHeart() {
  const h       = document.createElement('div');
  h.className   = 'fheart';
  const emojis  = ['💕', '🌹', '❤️', '💗', '🌸'];
  h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  const dur     = 4 + Math.random() * 5;
  const size    = 12 + Math.random() * 16;
  h.style.cssText = `
    left: ${Math.random() * 100}vw;
    top: 100vh;
    font-size: ${size}px;
    --rot: ${Math.random() * 360}deg;
    animation-duration: ${dur}s;
  `;
  document.body.appendChild(h);
  setTimeout(() => h.remove(), dur * 1000 + 200);
}
setInterval(spawnAmbientHeart, 1600);

/* ─── EXPORTED BURST HELPERS ─── */

/**
 * Launch hearts from a point
 * @param {number} x
 * @param {number} y
 * @param {number} count
 */
function launchHearts(x, y, count = 12) {
  const emojis = ['💕', '💖', '🌹', '❤️', '💗', '💓', '🌸'];
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const h       = document.createElement('div');
      h.className   = 'fheart';
      h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      const dur     = 1.4 + Math.random() * 1.6;
      h.style.cssText = `
        left: ${x + (Math.random() - 0.5) * 120}px;
        top: ${y}px;
        font-size: ${18 + Math.random() * 18}px;
        --rot: ${(Math.random() * 360)}deg;
        animation-duration: ${dur}s;
      `;
      document.body.appendChild(h);
      setTimeout(() => h.remove(), dur * 1000 + 100);
    }, i * 70);
  }
}

/**
 * Launch confetti from a point
 * @param {number} x
 * @param {number} y
 */
function launchConfetti(x, y) {
  const colors = ['#c0392b', '#e74c3c', '#f39c12', '#f1948a', '#fff', '#fadbd8', '#ffd700'];
  for (let i = 0; i < 45; i++) {
    const c     = document.createElement('div');
    c.className = 'confetti-p';
    const angle = Math.random() * Math.PI * 2;
    const dist  = 80 + Math.random() * 170;
    const dur   = 0.7 + Math.random() * 0.9;
    c.style.cssText = `
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      left: ${x}px;
      top: ${y}px;
      --cx: ${Math.cos(angle) * dist}px;
      --cy: ${Math.sin(angle) * dist}px;
      --cr: ${Math.random() * 720 - 360}deg;
      animation-duration: ${dur}s;
    `;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), dur * 1000 + 100);
  }
}

/**
 * Spawn continuously rising spark particles inside an element
 * Used for the rose/flowers section background
 * @param {HTMLElement} container  — .rose-particles div
 */
function startRoseSparks(container) {
  if (!container) return;
  // clear old interval if re-entering
  if (container._sparkInterval) clearInterval(container._sparkInterval);

  const colors = ['#c0392b', '#e74c3c', '#f1948a', '#ffd700', '#fff', '#fadbd8'];

  container._sparkInterval = setInterval(() => {
    const s     = document.createElement('div');
    s.className = 'spark';
    const size  = 3 + Math.random() * 5;
    const angle = Math.random() * Math.PI * 2;
    const dist  = 60 + Math.random() * 120;
    const dur   = 1.2 + Math.random() * 2;
    s.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      box-shadow: 0 0 ${size * 2}px ${colors[0]};
      left: ${10 + Math.random() * 80}%;
      bottom: ${10 + Math.random() * 30}%;
      --sx: ${Math.cos(angle) * dist}px;
      --sy: ${-Math.abs(Math.sin(angle)) * dist - 40}px;
      animation-duration: ${dur}s;
    `;
    container.appendChild(s);
    setTimeout(() => s.remove(), dur * 1000 + 100);
  }, 120);
}

/**
 * Stop rose sparks
 * @param {HTMLElement} container
 */
function stopRoseSparks(container) {
  if (container && container._sparkInterval) {
    clearInterval(container._sparkInterval);
    container._sparkInterval = null;
  }
}