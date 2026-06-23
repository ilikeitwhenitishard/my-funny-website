(function () {
  'use strict';

  const ROMANTIC_LINES = [
    'Varun, you are my favorite player in this game called life...',
    'Every BOOYAH feels empty without you in my squad...',
    'You revived my heart when I thought I was knocked down...',
    'CJP Varun — the legend my heart always chooses...'
  ];

  let lineIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let loveLevel = 0;

  // Loader
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('loader').classList.add('hidden');
    }, 1800);
  });

  // Typewriter
  const typeEl = document.getElementById('typewriter');

  function typeWriter() {
    const current = ROMANTIC_LINES[lineIndex];
    if (!isDeleting) {
      typeEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(typeWriter, 2500);
        return;
      }
    } else {
      typeEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        lineIndex = (lineIndex + 1) % ROMANTIC_LINES.length;
      }
    }
    setTimeout(typeWriter, isDeleting ? 40 : 80);
  }

  typeWriter();

  // Particles (ember effect)
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Ember {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + 10;
      this.size = Math.random() * 3 + 1;
      this.speedY = Math.random() * 1.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.8;
      this.opacity = Math.random() * 0.5 + 0.3;
      this.hue = Math.random() > 0.5 ? 25 : 45;
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      this.opacity -= 0.003;
      if (this.y < -10 || this.opacity <= 0) this.reset();
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 100%, 55%, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 60; i++) {
    const e = new Ember();
    e.y = Math.random() * canvas.height;
    particles.push(e);
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }

  animateParticles();

  // Heart button & love meter
  const heartBtn = document.getElementById('heartBtn');
  const loveFill = document.getElementById('loveFill');
  const lovePercent = document.getElementById('lovePercent');
  const floatingHearts = document.getElementById('floatingHearts');

  const heartEmojis = ['❤️', '💕', '💖', '💗', '🔥', '💝'];

  heartBtn.addEventListener('click', () => {
    loveLevel = Math.min(loveLevel + 8, 100);
    loveFill.style.width = loveLevel + '%';
    lovePercent.textContent = loveLevel + '%';

    for (let i = 0; i < 5; i++) {
      setTimeout(() => spawnHeart(), i * 80);
    }

    if (loveLevel >= 100) {
      lovePercent.textContent = 'MAX ♾️';
      spawnConfetti(40);
    }
  });

  function spawnHeart() {
    const heart = document.createElement('span');
    heart.className = 'heart-pop';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = 30 + Math.random() * 40 + '%';
    heart.style.bottom = '30%';
    floatingHearts.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
  }

  // Quote carousel
  const quoteCards = document.querySelectorAll('.quote-card');
  const quoteDotsEl = document.getElementById('quoteDots');
  let quoteIndex = 0;

  quoteCards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'quote-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Quote ' + (i + 1));
    dot.addEventListener('click', () => goToQuote(i));
    quoteDotsEl.appendChild(dot);
  });

  const quoteDots = quoteDotsEl.querySelectorAll('.quote-dot');

  function goToQuote(index) {
    quoteCards[quoteIndex].classList.remove('active');
    quoteDots[quoteIndex].classList.remove('active');
    quoteIndex = index;
    quoteCards[quoteIndex].classList.add('active');
    quoteDots[quoteIndex].classList.add('active');
  }

  setInterval(() => {
    goToQuote((quoteIndex + 1) % quoteCards.length);
  }, 4500);

  // Quiz
  const quizContainer = document.getElementById('quizContainer');
  const quizResult = document.getElementById('quizResult');
  const quizProgress = document.getElementById('quizProgress');
  const questions = document.querySelectorAll('.quiz-question');
  const replayBtn = document.getElementById('replayQuiz');

  let currentQ = 0;
  let score = 0;
  const totalQ = questions.length;

  function updateProgress() {
    quizProgress.style.width = ((currentQ / totalQ) * 100) + '%';
  }

  updateProgress();

  questions.forEach((q) => {
    q.querySelectorAll('.quiz-opt').forEach((btn) => {
      btn.addEventListener('click', () => handleAnswer(btn, q));
    });
  });

  function handleAnswer(btn, questionEl) {
    const opts = questionEl.querySelectorAll('.quiz-opt');
    opts.forEach((o) => (o.disabled = true));

    const isCorrect = btn.hasAttribute('data-correct');
    if (isCorrect) {
      btn.classList.add('correct');
      score++;
    } else {
      btn.classList.add('wrong');
      questionEl.querySelector('[data-correct]').classList.add('correct');
    }

    setTimeout(() => {
      questionEl.classList.remove('active');
      currentQ++;

      if (currentQ < totalQ) {
        questions[currentQ].classList.add('active');
        updateProgress();
      } else {
        quizProgress.style.width = '100%';
        quizContainer.style.display = 'none';
        quizResult.classList.remove('hidden');
        spawnConfetti(80);
      }
    }, 900);
  }

  replayBtn.addEventListener('click', () => {
    currentQ = 0;
    score = 0;
    quizResult.classList.add('hidden');
    quizContainer.style.display = 'block';
    questions.forEach((q, i) => {
      q.classList.toggle('active', i === 0);
      q.querySelectorAll('.quiz-opt').forEach((o) => {
        o.disabled = false;
        o.classList.remove('correct', 'wrong');
      });
    });
    updateProgress();
  });

  // Confetti
  function spawnConfetti(count) {
    const colors = ['#ff6b00', '#ffd700', '#e94560', '#ff4500', '#ffb4c8'];
    for (let i = 0; i < count; i++) {
      const c = document.createElement('div');
      c.className = 'confetti';
      c.style.left = Math.random() * 100 + 'vw';
      c.style.background = colors[Math.floor(Math.random() * colors.length)];
      c.style.animationDuration = 2 + Math.random() * 2 + 's';
      c.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 4000);
    }
  }
})();
