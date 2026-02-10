// Get all elements
const envelope = document.getElementById('envelope');
const message = document.getElementById('message');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const response = document.getElementById('response');
const thankYouLetter = document.getElementById('thankYouLetter');
const continueBtn = document.getElementById('continueBtn');
const surpriseCategories = document.getElementById('surpriseCategories');
const flowersSection = document.getElementById('flowersSection');
const photosSection = document.getElementById('photosSection');
const songSection = document.getElementById('songSection');
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

// Category cards
const category1 = document.getElementById('category1');
const category2 = document.getElementById('category2');
const category3 = document.getElementById('category3');

// Back buttons
const backFromFlowers = document.getElementById('backFromFlowers');
const backFromPhotos = document.getElementById('backFromPhotos');
const backFromSong = document.getElementById('backFromSong');

let noClickCount = 0;
let yesBtnScale = 1;
let noBtnScale = 1;
let isMusicPlaying = false;
let musicStarted = false;

// Music toggle functionality
musicToggle.addEventListener('click', () => {
  if (isMusicPlaying) {
    bgMusic.pause();
    musicToggle.textContent = '🔇';
    musicToggle.classList.remove('playing');
    isMusicPlaying = false;
  } else {
    bgMusic.play().catch(e => console.log('Audio play failed:', e));
    musicToggle.textContent = '🔊';
    musicToggle.classList.add('playing');
    isMusicPlaying = true;
  }
});

// Continuously create floating hearts in background
setInterval(() => {
  createFloatingHeart();
}, 3000);

// Add sparkles on mouse move
document.addEventListener('mousemove', (e) => {
  if (Math.random() > 0.95) {
    createSparkle(e.clientX, e.clientY);
  }
});

// Open envelope animation
envelope.addEventListener('click', (e) => {
  // Start music on first interaction
  if (!musicStarted) {
    bgMusic.play().catch(e => console.log('Audio play failed:', e));
    musicToggle.textContent = '🔊';
    musicToggle.classList.add('playing');
    isMusicPlaying = true;
    musicStarted = true;
  }

  envelope.classList.add('opening');
  createParticleBurst(e.clientX, e.clientY);
  
  // After envelope opens, show the message card
  setTimeout(() => {
    envelope.style.transition = 'all 0.8s ease';
    envelope.style.opacity = '0';
    envelope.style.transform = 'scale(0)';
    
    setTimeout(() => {
      envelope.classList.add('hidden');
      message.classList.remove('hidden');
      createFloatingHeart();
      createFloatingHeart();
      createFloatingHeart();
    }, 800);
  }, 2000);
});

// Add ripple effect to buttons
[yesBtn, noBtn].forEach(btn => {
  btn.addEventListener('click', (e) => {
    createRipple(e, btn);
  });
});

// Yes button - creates celebration
yesBtn.addEventListener('click', (e) => {
  response.innerHTML = "Yay! You've made me the happiest! 🥰💕✨";
  response.classList.add('show');
  
  // Hide buttons with fade
  yesBtn.style.transition = 'all 0.5s ease';
  noBtn.style.transition = 'all 0.5s ease';
  yesBtn.style.opacity = '0';
  yesBtn.style.transform = 'scale(0)';
  noBtn.style.opacity = '0';
  noBtn.style.transform = 'scale(0)';
  
  // Create massive heart burst
  createHeartBurst(e.clientX, e.clientY);
  
  // Create confetti
  createConfetti();
  
  // Create fireworks
  createFireworks();
  
  // Create continuous floating hearts
  const heartInterval = setInterval(() => {
    createFloatingHeart();
  }, 200);
  
  setTimeout(() => clearInterval(heartInterval), 3000);
  
  // Change background with animation
  document.body.style.transition = 'background 2s ease';
  document.body.style.background = 'linear-gradient(135deg, #B0E0E6 0%, #FFE4F0 50%, #87CEEB 100%)';
  
  // Show thank you letter after celebration
  setTimeout(() => {
    message.style.transition = 'all 0.8s ease';
    message.style.opacity = '0';
    message.style.transform = 'scale(0.8) rotateY(90deg)';
    
    setTimeout(() => {
      message.classList.add('hidden');
      thankYouLetter.classList.remove('hidden');
      
      // More celebration for thank you letter
      createHeartBurst(window.innerWidth / 2, window.innerHeight / 2);
      createConfetti();
      
      // Continuous floating hearts
      const continuousHearts = setInterval(() => {
        createFloatingHeart();
      }, 1000);
      
      setTimeout(() => clearInterval(continuousHearts), 10000);
    }, 800);
  }, 3000);
});

// No button - grows Yes button, shrinks No button
noBtn.addEventListener('click', (e) => {
  noClickCount++;
  
  // Add shake animation
  noBtn.classList.add('shake');
  setTimeout(() => noBtn.classList.remove('shake'), 500);
  
  // Create small particle burst
  createParticleBurst(e.clientX, e.clientY, 10);
  
  // Grow Yes button
  yesBtnScale += 0.2;
  yesBtn.style.transform = `scale(${yesBtnScale})`;
  yesBtn.style.fontSize = `${20 + noClickCount * 2}px`;
  yesBtn.style.padding = `${18 + noClickCount * 2}px ${45 + noClickCount * 5}px`;
  
  // Add wiggle to Yes button
  yesBtn.classList.add('wiggle');
  setTimeout(() => yesBtn.classList.remove('wiggle'), 900);
  
  // Shrink No button
  noBtnScale -= 0.15;
  if (noBtnScale < 0.3) noBtnScale = 0.3;
  noBtn.style.transform = `scale(${noBtnScale})`;
  
  // Change No button text
  const noTexts = [
    'Are you sure? 🥺',
    'Really? 🥹',
    'Think again... 💭',
    'Please? 🙏',
    'Pretty please? 🥺✨',
    'Just click Yes! 💕'
  ];
  
  if (noClickCount <= noTexts.length) {
    noBtn.textContent = noTexts[noClickCount - 1];
  }
  
  // Show temporary message
  response.textContent = "The Yes button is looking pretty good right now... 👀";
  response.classList.add('show');
  
  setTimeout(() => {
    if (response.textContent.includes('good right now')) {
      response.classList.remove('show');
    }
  }, 2000);
  
  // If No clicked too many times, hide it
  if (noClickCount >= 6) {
    noBtn.style.transition = 'all 0.5s ease';
    noBtn.style.opacity = '0';
    noBtn.style.transform = 'scale(0)';
    noBtn.style.pointerEvents = 'none';
    response.textContent = "Okay, I removed the No button for you 😊💕";
    response.classList.add('show');
    
    // Create hearts around yes button
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const rect = yesBtn.getBoundingClientRect();
        createFloatingHeart(rect.left + rect.width / 2, rect.top);
      }, i * 100);
    }
  }
});

// Continue button - show surprise categories
continueBtn.addEventListener('click', () => {
  thankYouLetter.style.transition = 'all 0.8s ease';
  thankYouLetter.style.opacity = '0';
  thankYouLetter.style.transform = 'scale(0.8)';
  
  setTimeout(() => {
    thankYouLetter.classList.add('hidden');
    surpriseCategories.classList.remove('hidden');
    createConfetti();
    createHeartBurst(window.innerWidth / 2, window.innerHeight / 2);
  }, 800);
});

// Category 1 - Flowers
category1.addEventListener('click', () => {
  surpriseCategories.style.transition = 'all 0.6s ease';
  surpriseCategories.style.opacity = '0';
  surpriseCategories.style.transform = 'scale(0.9)';
  
  setTimeout(() => {
    surpriseCategories.classList.add('hidden');
    flowersSection.classList.remove('hidden');
    createFlowerBurst();
  }, 600);
});

// Category 2 - Photos
category2.addEventListener('click', () => {
  surpriseCategories.style.transition = 'all 0.6s ease';
  surpriseCategories.style.opacity = '0';
  surpriseCategories.style.transform = 'scale(0.9)';
  
  setTimeout(() => {
    surpriseCategories.classList.add('hidden');
    photosSection.classList.remove('hidden');
    createHeartBurst(window.innerWidth / 2, window.innerHeight / 2);
  }, 600);
});

// Category 3 - Song
category3.addEventListener('click', () => {
  surpriseCategories.style.transition = 'all 0.6s ease';
  surpriseCategories.style.opacity = '0';
  surpriseCategories.style.transform = 'scale(0.9)';
  
  setTimeout(() => {
    surpriseCategories.classList.add('hidden');
    songSection.classList.remove('hidden');
    
    // Start vinyl spinning animation
    const vinyl = document.querySelector('.vinyl-record');
    if (vinyl) {
      vinyl.style.animationPlayState = 'running';
    }
  }, 600);
});

// Back buttons
backFromFlowers.addEventListener('click', () => {
  flowersSection.style.transition = 'all 0.6s ease';
  flowersSection.style.opacity = '0';
  
  setTimeout(() => {
    flowersSection.classList.add('hidden');
    surpriseCategories.classList.remove('hidden');
    surpriseCategories.style.opacity = '1';
    surpriseCategories.style.transform = 'scale(1)';
  }, 600);
});

backFromPhotos.addEventListener('click', () => {
  photosSection.style.transition = 'all 0.6s ease';
  photosSection.style.opacity = '0';
  
  setTimeout(() => {
    photosSection.classList.add('hidden');
    surpriseCategories.classList.remove('hidden');
    surpriseCategories.style.opacity = '1';
    surpriseCategories.style.transform = 'scale(1)';
  }, 600);
});

backFromSong.addEventListener('click', () => {
  songSection.style.transition = 'all 0.6s ease';
  songSection.style.opacity = '0';
  
  // Stop vinyl spinning
  const vinyl = document.querySelector('.vinyl-record');
  if (vinyl) {
    vinyl.style.animationPlayState = 'paused';
  }
  
  setTimeout(() => {
    songSection.classList.add('hidden');
    surpriseCategories.classList.remove('hidden');
    surpriseCategories.style.opacity = '1';
    surpriseCategories.style.transform = 'scale(1)';
  }, 600);
});

// Animation Functions
function createSparkle(x, y) {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.textContent = '✨';
  sparkle.style.left = x + 'px';
  sparkle.style.top = y + 'px';
  sparkle.style.fontSize = (Math.random() * 10 + 10) + 'px';
  
  document.body.appendChild(sparkle);
  
  setTimeout(() => sparkle.remove(), 2000);
}

function createFloatingHeart(startX, startY) {
  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  
  const hearts = ['💕', '💖', '💗', '💓', '💝', '❤️', '🩷', '💙'];
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  
  const x = startX || Math.random() * window.innerWidth;
  const y = startY || window.innerHeight;
  
  heart.style.left = x + 'px';
  heart.style.top = y + 'px';
  heart.style.setProperty('--x-offset', (Math.random() - 0.5) * 200 + 'px');
  heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
  
  document.body.appendChild(heart);
  
  setTimeout(() => heart.remove(), 5000);
}

function createRipple(e, element) {
  const ripple = document.createElement('div');
  ripple.className = 'ripple';
  ripple.style.position = 'absolute';
  ripple.style.borderRadius = '50%';
  ripple.style.background = 'rgba(135, 206, 235, 0.4)';
  ripple.style.width = '20px';
  ripple.style.height = '20px';
  ripple.style.pointerEvents = 'none';
  
  const rect = element.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  
  element.appendChild(ripple);
  
  ripple.style.animation = 'ripple-anim 1s ease-out';
  
  setTimeout(() => ripple.remove(), 1000);
}

function createParticleBurst(x, y, count = 20) {
  const colors = ['#87CEEB', '#FFB6D9', '#FF69B4', '#B0E0E6', '#4A90E2'];
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '8px';
    particle.style.height = '8px';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    const angle = (Math.PI * 2 * i) / count;
    const velocity = 50 + Math.random() * 50;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;
    
    particle.style.setProperty('--tx', tx + 'px');
    particle.style.setProperty('--ty', ty + 'px');
    
    particle.style.animation = 'particle-burst 1.5s ease-out forwards';
    
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 1500);
  }
}

function createHeartBurst(x, y) {
  const hearts = ['💕', '💖', '💗', '💓', '💝', '❤️', '🩷', '💘', '💙'];
  
  for (let i = 0; i < 30; i++) {
    const heart = document.createElement('div');
    heart.style.position = 'fixed';
    heart.style.fontSize = '30px';
    heart.style.pointerEvents = 'none';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    
    const angle = (Math.PI * 2 * i) / 30;
    const distance = 100 + Math.random() * 150;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    const rotation = Math.random() * 720 - 360;
    
    heart.style.setProperty('--burst-x', tx + 'px');
    heart.style.setProperty('--burst-y', ty + 'px');
    heart.style.setProperty('--burst-rotate', rotation + 'deg');
    
    heart.style.animation = 'heart-burst-anim 2s ease-out forwards';
    
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 2000);
  }
}

function createConfetti() {
  const colors = ['#87CEEB', '#FFB6D9', '#FF69B4', '#B0E0E6', '#4A90E2'];
  const shapes = ['💕', '💖', '⭐', '✨', '🌟', '💙'];
  
  for (let i = 0; i < 150; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-10px';
      
      // Mix colors and emoji
      if (Math.random() > 0.5) {
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.textContent = '';
      } else {
        confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        confetti.style.background = 'transparent';
        confetti.style.fontSize = '20px';
      }
      
      confetti.style.animationDelay = Math.random() * 0.5 + 's';
      confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
      
      document.body.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 4000);
    }, i * 20);
  }
}

function createFireworks() {
  const colors = ['#87CEEB', '#FFB6D9', '#FF69B4', '#B0E0E6'];
  
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight * 0.5;
      
      for (let j = 0; j < 40; j++) {
        const firework = document.createElement('div');
        firework.style.position = 'fixed';
        firework.style.width = '4px';
        firework.style.height = '4px';
        firework.style.borderRadius = '50%';
        firework.style.pointerEvents = 'none';
        firework.style.left = x + 'px';
        firework.style.top = y + 'px';
        firework.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        const angle = (Math.PI * 2 * j) / 40;
        const velocity = 100 + Math.random() * 150;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        firework.style.setProperty('--x', tx + 'px');
        firework.style.setProperty('--y', ty + 'px');
        firework.style.animation = 'firework-explode 1.5s ease-out forwards';
        
        document.body.appendChild(firework);
        
        setTimeout(() => firework.remove(), 1500);
      }
    }, i * 300);
  }
}

function createFlowerBurst() {
  const flowers = ['🌹', '🌷', '🌺', '🌸', '💐', '🌻', '🏵️', '🌼'];
  
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const flower = document.createElement('div');
      flower.style.position = 'fixed';
      flower.style.fontSize = '40px';
      flower.style.pointerEvents = 'none';
      flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
      flower.style.left = Math.random() * window.innerWidth + 'px';
      flower.style.top = '-50px';
      flower.style.animation = 'confetti-fall 3s ease-in forwards';
      
      document.body.appendChild(flower);
      
      setTimeout(() => flower.remove(), 3000);
    }, i * 100);
  }
}

// Add keyframe for particle burst
const style = document.createElement('style');
style.textContent = `
  @keyframes particle-burst {
    0% {
      transform: translate(0, 0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(var(--tx), var(--ty)) scale(0);
      opacity: 0;
    }
  }
  
  @keyframes heart-burst-anim {
    0% {
      transform: translate(-50%, -50%) scale(0) rotate(0deg);
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translate(var(--burst-x), var(--burst-y)) scale(1) rotate(var(--burst-rotate));
      opacity: 0;
    }
  }
  
  @keyframes firework-explode {
    0% {
      transform: translate(0, 0);
      opacity: 1;
    }
    100% {
      transform: translate(var(--x), var(--y));
      opacity: 0;
    }
  }
  
  @keyframes ripple-anim {
    0% {
      transform: translate(-50%, -50%) scale(0);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, -50%) scale(15);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);