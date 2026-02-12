const envelope = document.getElementById('envelope');
const loveLetter = document.getElementById('loveLetter');
const letterContinue = document.getElementById('letterContinue');
const valentineQuestion = document.getElementById('valentineQuestion');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const response = document.getElementById('response');
const thankYouLetter = document.getElementById('thankYouLetter');
const thankYouContinue = document.getElementById('thankYouContinue');
const surpriseCategories = document.getElementById('surpriseCategories');
const flowersSection = document.getElementById('flowersSection');
const photosSection = document.getElementById('photosSection');
const songSection = document.getElementById('songSection');
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

let noClickCount = 0;
let yesBtnScale = 1;
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

// Step 1: Open envelope → Show love letter
envelope.addEventListener('click', () => {
  // Start music on first interaction
  if (!musicStarted) {
    bgMusic.play().catch(e => console.log('Audio play failed:', e));
    musicToggle.textContent = '🔊';
    musicToggle.classList.add('playing');
    isMusicPlaying = true;
    musicStarted = true;
  }

  envelope.classList.add('opening');
  setTimeout(() => {
    envelope.style.display = 'none';
    loveLetter.classList.remove('hidden');
  }, 1200);
});

// Step 2: Love letter continue → Show valentine question
letterContinue.addEventListener('click', () => {
  loveLetter.style.opacity = '0';
  loveLetter.style.transform = 'scale(0.9)';
  loveLetter.style.transition = 'all 0.5s ease';
  setTimeout(() => {
    loveLetter.classList.add('hidden');
    loveLetter.style.opacity = '1';
    loveLetter.style.transform = 'scale(1)';
    valentineQuestion.classList.remove('hidden');
  }, 500);
});

// Step 3: Yes button → Show thank you
yesBtn.addEventListener('click', () => {
  response.textContent = "Yay! You've made me the happiest! 🥰💕✨";
  response.classList.add('show');
  yesBtn.style.display = 'none';
  noBtn.style.display = 'none';
  
  setTimeout(() => {
    valentineQuestion.style.opacity = '0';
    valentineQuestion.style.transform = 'scale(0.9)';
    valentineQuestion.style.transition = 'all 0.5s ease';
    
    setTimeout(() => {
      valentineQuestion.classList.add('hidden');
      valentineQuestion.style.opacity = '1';
      valentineQuestion.style.transform = 'scale(1)';
      thankYouLetter.classList.remove('hidden');
    }, 500);
  }, 2000);
});

// Function to move No button to random position
function moveNoButtonRandomly() {
  const valentineBox = valentineQuestion.getBoundingClientRect();
  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;
  
  // Calculate safe boundaries (keep button inside the valentine question box)
  const maxX = valentineBox.width - btnWidth - 100;
  const maxY = valentineBox.height - btnHeight - 100;
  
  // Generate random position
  const randomX = Math.random() * maxX - (maxX / 2);
  const randomY = Math.random() * maxY - (maxY / 2);
  
  // Make button position absolute on first click
  if (noClickCount === 1) {
    noBtn.style.position = 'absolute';
  }
  
  // Move the button
  noBtn.style.left = `calc(50% + ${randomX}px)`;
  noBtn.style.top = `calc(50% + ${randomY}px)`;
  noBtn.style.transform = `translate(-50%, -50%) scale(${1 - (noClickCount * 0.05)})`;
}

// No button interaction - moves randomly unlimited
noBtn.addEventListener('click', (e) => {
  e.preventDefault();
  noClickCount++;
  
  // Grow Yes button
  yesBtnScale += 0.15;
  yesBtn.style.transform = `scale(${yesBtnScale})`;
  yesBtn.style.fontSize = `${20 + noClickCount * 2}px`;
  
  const noTexts = [
    'Are you sure? 🥺',
    'Really? 🥹',
    'Think again... 💭',
    'Please? 🙏',
    'Pretty please? 🥺✨',
    'Just click Yes! 💕',
    'No? Really? 😢',
    'Come on... 🥺',
    'Please say yes! 💕',
    'Why not? 😭',
    'One more chance? 🙏',
    'You know you want to! 😊',
    'Click Yes instead! 💖',
    'Just say yes! 🥰'
  ];
  
  // Cycle through texts or pick random after array length
  if (noClickCount <= noTexts.length) {
    noBtn.textContent = noTexts[noClickCount - 1];
  } else {
    noBtn.textContent = noTexts[Math.floor(Math.random() * noTexts.length)];
  }
  
  response.textContent = "The Yes button is looking pretty good right now... 👀";
  response.classList.add('show');
  
  setTimeout(() => {
    if (response.textContent.includes('good right now')) {
      response.classList.remove('show');
    }
  }, 2000);
  
  // Move No button to random position unlimited times
  moveNoButtonRandomly();
});

// Step 4: Thank you continue → Show categories
thankYouContinue.addEventListener('click', () => {
  thankYouLetter.style.opacity = '0';
  thankYouLetter.style.transform = 'scale(0.9)';
  thankYouLetter.style.transition = 'all 0.5s ease';
  
  setTimeout(() => {
    thankYouLetter.classList.add('hidden');
    thankYouLetter.style.opacity = '1';
    thankYouLetter.style.transform = 'scale(1)';
    surpriseCategories.classList.remove('hidden');
  }, 500);
});

// Categories
document.getElementById('category1').addEventListener('click', () => {
  surpriseCategories.classList.add('hidden');
  flowersSection.classList.remove('hidden');
});

document.getElementById('category2').addEventListener('click', () => {
  surpriseCategories.classList.add('hidden');
  photosSection.classList.remove('hidden');
});

document.getElementById('category3').addEventListener('click', () => {
  surpriseCategories.classList.add('hidden');
  songSection.classList.remove('hidden');
});

// Back buttons
document.getElementById('backFromFlowers').addEventListener('click', () => {
  flowersSection.classList.add('hidden');
  surpriseCategories.classList.remove('hidden');
});

document.getElementById('backFromPhotos').addEventListener('click', () => {
  photosSection.classList.add('hidden');
  surpriseCategories.classList.remove('hidden');
});

document.getElementById('backFromSong').addEventListener('click', () => {
  songSection.classList.add('hidden');
  surpriseCategories.classList.remove('hidden');
});