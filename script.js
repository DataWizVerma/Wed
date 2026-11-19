/* ============================================================
   KOMAL & ANKUR WEDDING WEBSITE — script.js
   Full rewrite — 170 KM Interactive Scroll, Butter-smooth Gallery,
   Zero-start Real Blessings Counter, Royal Animations
   ============================================================ */

'use strict';

/* ══════════════════════════════════════════
   1. FIREWORKS
══════════════════════════════════════════ */
function launchFireworks() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;z-index:9995;pointer-events:none;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const COLORS = ['#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#ff6bdb','#C9A84C','#ff9f43','#ffc0cb','#a29bfe','#fd79a8'];

  function burst(x, y, color) {
    const count = 65 + Math.floor(Math.random() * 45);
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = 1.5 + Math.random() * 4.5;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        alpha: 1,
        decay: 0.012 + Math.random() * 0.012,
        gravity: 0.055,
        size: 2 + Math.random() * 3,
        color
      });
    }
  }

  const times = [80, 280, 580, 950, 1350, 1750, 2150, 2550, 2950, 3350];
  times.forEach(t => {
    setTimeout(() => {
      const c1 = COLORS[Math.floor(Math.random() * COLORS.length)];
      burst(60 + Math.random() * (canvas.width - 120), 50 + Math.random() * (canvas.height * 0.42), c1);
      if (Math.random() > 0.4) {
        setTimeout(() => {
          const c2 = COLORS[Math.floor(Math.random() * COLORS.length)];
          burst(60 + Math.random() * (canvas.width - 120), 50 + Math.random() * (canvas.height * 0.42), c2);
        }, 140);
      }
    }, t);
  });

  const startTime = Date.now();
  function animate() {
    if (Date.now() - startTime > 5200) { canvas.remove(); return; }
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x  += p.vx; p.y  += p.vy;
      p.vy += p.gravity; p.vx *= 0.98;
      p.alpha -= p.decay;
      if (p.alpha <= 0) { particles.splice(i, 1); continue; }
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 5;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
  animate();
}

/* ══════════════════════════════════════════
   2. MUSIC PLAYER
══════════════════════════════════════════ */
const audio     = document.getElementById('bgAudio');
const musicWrap = document.getElementById('musicPlayer');
const toggleBtn = document.getElementById('musicToggle');
const waveEl    = document.getElementById('musicWave');

function startMusic() {
  if (!audio) return;
  audio.volume = 0.65;
  const promise = audio.play();
  if (promise !== undefined) {
    promise.then(() => {
      if (waveEl) waveEl.classList.remove('paused');
      if (toggleBtn) toggleBtn.textContent = '⏸';
    }).catch(() => {
      if (toggleBtn) toggleBtn.textContent = '▶';
    });
  }
}

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      toggleBtn.textContent = '⏸';
      if (waveEl) waveEl.classList.remove('paused');
    } else {
      audio.pause();
      toggleBtn.textContent = '▶';
      if (waveEl) waveEl.classList.add('paused');
    }
  });
}

/* ══════════════════════════════════════════
   3. ENVELOPE OPEN
══════════════════════════════════════════ */
(function () {
  const envScreen = document.getElementById('envScreen');
  const mainSite  = document.getElementById('mainSite');
  const theEnv    = document.getElementById('theEnvelope');
  const waxSeal   = document.getElementById('waxSeal');
  if (!envScreen || !mainSite || !theEnv) return;

  document.body.style.overflow = 'hidden';
  let opened = false;

  function openEnvelope() {
    if (opened) return;
    opened = true;

    // Launch crackers immediately
    launchFireworks();

    // Start music within gesture context
    startMusic();
    if (musicWrap) musicWrap.style.display = 'flex';

    theEnv.classList.add('opened');

    setTimeout(() => {
      envScreen.style.transition = 'opacity .8s ease';
      envScreen.style.opacity    = '0';
      envScreen.style.pointerEvents = 'none';

      mainSite.classList.remove('site-hidden');
      mainSite.style.opacity    = '0';
      mainSite.style.transition = 'opacity .8s ease';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        mainSite.style.opacity = '1';
      }));
    }, 900);

    setTimeout(() => {
      envScreen.style.display = 'none';
      document.body.style.overflow = '';
    }, 1800);
  }

  if (waxSeal) waxSeal.addEventListener('click', openEnvelope);
  theEnv.addEventListener('click', openEnvelope);
})();

/* ══════════════════════════════════════════
   4. COUNTDOWN
══════════════════════════════════════════ */
(function () {
  const target = new Date('2026-12-02T07:00:00+05:30').getTime();
  const dEl = document.getElementById('cdDays');
  const hEl = document.getElementById('cdHours');
  const mEl = document.getElementById('cdMins');
  const sEl = document.getElementById('cdSecs');
  if (!dEl) return;

  function update() {
    const diff = target - Date.now();
    if (diff <= 0) {
      dEl.textContent = hEl.textContent = mEl.textContent = sEl.textContent = '00';
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    dEl.textContent = String(d).padStart(2, '0');
    hEl.textContent = String(h).padStart(2, '0');
    mEl.textContent = String(m).padStart(2, '0');
    sEl.textContent = String(s).padStart(2, '0');
  }
  update();
  setInterval(update, 1000);
})();

/* ══════════════════════════════════════════
   5. NAVBAR
══════════════════════════════════════════ */
(function () {
  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('navMobileMenu');
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }, { passive: true });

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileLinks.forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

/* ══════════════════════════════════════════
   6. PETAL CANVAS ANIMATION
══════════════════════════════════════════ */
(function () {
  const canvas = document.getElementById('petalCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const COLORS = ['#EDB8C0','#F2C9CF','#D8BF8A','#CFC4E4','#F4CDB0','#E8D5A3'];
  const petals = [];
  let W, H;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  function newPetal() {
    return {
      x: Math.random() * W, y: -20,
      vy: 0.4 + Math.random() * 0.8,
      sway: Math.random() * Math.PI * 2,
      swayS: 0.008 + Math.random() * 0.008,
      rot: Math.random() * Math.PI * 2,
      rotS: (Math.random() - 0.5) * 0.03,
      alpha: 0.5 + Math.random() * 0.4,
      size: 5 + Math.random() * 7,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    };
  }

  for (let i = 0; i < 20; i++) {
    const p = newPetal();
    p.y = Math.random() * H;
    petals.push(p);
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(p.size, -p.size * 0.5, p.size * 1.5, p.size, 0, p.size * 2);
    ctx.bezierCurveTo(-p.size * 1.5, p.size, -p.size, -p.size * 0.5, 0, 0);
    ctx.fill();
    ctx.restore();
  }

  function animatePetals() {
    requestAnimationFrame(animatePetals);
    ctx.clearRect(0, 0, W, H);
    if (petals.length < 28 && Math.random() < 0.04) petals.push(newPetal());
    for (let i = petals.length - 1; i >= 0; i--) {
      const p = petals[i];
      p.sway += p.swayS;
      p.x += Math.sin(p.sway) * 0.6;
      p.y += p.vy;
      p.rot += p.rotS;
      drawPetal(p);
      if (p.y > H + 30) petals.splice(i, 1);
    }
  }
  animatePetals();
})();

/* ══════════════════════════════════════════
   7. INTERACTIVE 170 KM SCROLL JOURNEY
   Lakhimpur (0 KM) ➔ Bachhrawan (170 KM)
══════════════════════════════════════════ */
(function () {
  const journeySection = document.getElementById('journey');
  const roadTraveler   = document.getElementById('roadTraveler');
  const roadProgress   = document.getElementById('roadProgressFill');
  const liveKmCounter  = document.getElementById('liveKmCounter');
  const travelerKmTag  = document.getElementById('travelerKmTag');

  const dotSitapur     = document.getElementById('dotSitapur');
  const dotLucknow     = document.getElementById('dotLucknow');
  const dotBachhrawan  = document.getElementById('dotBachhrawan');

  if (!journeySection || !roadTraveler || !roadProgress) return;

  function updateJourneyProgress() {
    const rect = journeySection.getBoundingClientRect();
    const windowH = window.innerHeight;

    // Start advancing when top of section is 40% from top of viewport
    const startY = windowH * 0.6;
    const endY   = windowH * 0.15;

    const totalDistance = rect.height;
    const currentScrolled = startY - rect.top;

    let progress = currentScrolled / totalDistance;
    progress = Math.max(0, Math.min(1, progress));

    const currentKm = Math.round(progress * 170);

    // Smooth movement down the road
    roadTraveler.style.top = `${progress * 100}%`;
    roadProgress.style.height = `${progress * 100}%`;

    if (liveKmCounter) liveKmCounter.textContent = currentKm;
    if (travelerKmTag) travelerKmTag.textContent = `${currentKm} KM`;

    // Milestone checkpoints activation
    if (dotSitapur) {
      if (progress >= 0.30) dotSitapur.classList.add('active');
      else dotSitapur.classList.remove('active');
    }
    if (dotLucknow) {
      if (progress >= 0.65) dotLucknow.classList.add('active');
      else dotLucknow.classList.remove('active');
    }
    if (dotBachhrawan) {
      if (progress >= 0.95) dotBachhrawan.classList.add('active');
      else dotBachhrawan.classList.remove('active');
    }
  }

  window.addEventListener('scroll', updateJourneyProgress, { passive: true });
  window.addEventListener('resize', updateJourneyProgress, { passive: true });
  updateJourneyProgress();
})();

/* ══════════════════════════════════════════
   8. REEL GALLERY (HUMARI YADEIN)
   60fps Smooth Hardware-Accelerated Swiping
   Uncropped full view
══════════════════════════════════════════ */
(function () {
  const track     = document.getElementById('reelTrack');
  if (!track) return;

  const slides    = track.querySelectorAll('.reel-slide');
  const total     = slides.length;
  const dotsEl    = document.getElementById('reelDots');
  const currentEl = document.getElementById('reelCurrent');
  const totalEl   = document.getElementById('reelTotal');
  const prevBtn   = document.getElementById('reelPrev');
  const nextBtn   = document.getElementById('reelNext');
  const heartBtn  = document.getElementById('reelHeartBtn');
  const likesEl   = document.getElementById('reelLikes');

  if (totalEl) totalEl.textContent = total;

  let current   = 0;
  let autoTimer;
  let startX    = 0;
  let currentX  = 0;
  let isDragging = false;
  const liked   = new Set();
  const likes   = [12, 18, 15, 24, 19, 14, 22, 16];

  // Dots
  const dots = [];
  if (dotsEl) {
    slides.forEach((_, i) => {
      const d = document.createElement('span');
      d.style.width = '5px';
      d.addEventListener('click', () => { goTo(i); resetAuto(); });
      dotsEl.appendChild(d);
      dots.push(d);
    });
  }

  function updateUI() {
    track.style.transform = `translate3d(-${current * 100}%, 0, 0)`;
    if (currentEl) currentEl.textContent = current + 1;
    dots.forEach((d, i) => {
      d.style.width      = i === current ? '22px' : '5px';
      d.style.background = i === current ? 'rgba(255,255,255,.95)' : 'rgba(255,255,255,.35)';
    });
    if (heartBtn) {
      if (liked.has(current)) heartBtn.classList.add('liked');
      else heartBtn.classList.remove('liked');
    }
    if (likesEl) likesEl.textContent = `❤️ ${likes[current]}`;
  }

  function goTo(idx) { current = (idx + total) % total; updateUI(); }
  function next()    { goTo(current + 1); }
  function prev()    { goTo(current - 1); }

  function startAuto() { autoTimer = setInterval(next, 4000); }
  function resetAuto() { clearInterval(autoTimer); startAuto(); }

  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetAuto(); });

  // Touch Swipe (Passive & Highly Responsive)
  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    currentX = startX;
    clearInterval(autoTimer);
    isDragging = true;
  }, { passive: true });

  track.addEventListener('touchmove', e => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', e => {
    if (!isDragging) return;
    isDragging = false;
    const diff = currentX - startX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) next();
      else prev();
    }
    startAuto();
  }, { passive: true });

  // Mouse Drag for Desktop
  track.addEventListener('mousedown', e => {
    startX = e.clientX;
    currentX = startX;
    isDragging = true;
    clearInterval(autoTimer);
  });

  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    currentX = e.clientX;
  });

  window.addEventListener('mouseup', e => {
    if (!isDragging) return;
    isDragging = false;
    const diff = currentX - startX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) next();
      else prev();
    }
    startAuto();
  });

  // Heart like button
  if (heartBtn) {
    heartBtn.addEventListener('click', e => {
      e.stopPropagation();
      if (liked.has(current)) {
        liked.delete(current);
        likes[current]--;
        heartBtn.classList.remove('liked');
      } else {
        liked.add(current);
        likes[current]++;
        heartBtn.classList.add('liked');
      }
      if (likesEl) likesEl.textContent = `❤️ ${likes[current]}`;
      heartBtn.style.transform = 'scale(1.5)';
      setTimeout(() => { heartBtn.style.transform = ''; }, 220);
    });
  }

  // Click on slide opens lightbox (ignores drag)
  slides.forEach((slide, i) => {
    slide.addEventListener('click', e => {
      if (Math.abs(currentX - startX) > 10) return;
      openLightbox(i);
    });
  });

  startAuto();
  updateUI();
})();

/* ══════════════════════════════════════════
   9. LIGHTBOX
══════════════════════════════════════════ */
const lbImages = [
  { src: 'images/photo1.jpg', caption: 'Shubh Shuruat · Ankur & Komal ❤️' },
  { src: 'images/photo2.jpg', caption: 'Do Parivaaron ka Vishwas aur Prem 💫' },
  { src: 'images/photo3.jpg', caption: 'Pavitra Bandhan ki Meethi Yaadein 🌸' },
  { src: 'images/photo4.jpg', caption: 'Buzurgo ke Aashirvaad se Juda Rishta 🕊️' },
  { src: 'images/photo5.jpg', caption: 'Ek Naye Safar ki Shubh Aahat 🌅' },
  { src: 'images/photo6.jpg', caption: 'Komal aur Ankur ka Saath 🌺' },
  { src: 'images/photo7.jpg', caption: 'Khushiyon ka Rang, Har Pal Sang 🎊' },
  { src: 'images/photo8.jpg', caption: 'Hamesha ke Liye Bandhe Ek Dor Mein 💍' }
];

let lbCurrent = 0;

function openLightbox(idx) {
  lbCurrent = idx;
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lbImg');
  const cap = document.getElementById('lbCaption');
  if (!lb || !img) return;
  img.src = lbImages[lbCurrent].src;
  if (cap) cap.textContent = lbImages[lbCurrent].caption;
  lb.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('show');
  document.body.style.overflow = '';
}

function lbNext() {
  lbCurrent = (lbCurrent + 1) % lbImages.length;
  const img = document.getElementById('lbImg');
  const cap = document.getElementById('lbCaption');
  if (img) img.src = lbImages[lbCurrent].src;
  if (cap) cap.textContent = lbImages[lbCurrent].caption;
}
function lbPrev() {
  lbCurrent = (lbCurrent - 1 + lbImages.length) % lbImages.length;
  const img = document.getElementById('lbImg');
  const cap = document.getElementById('lbCaption');
  if (img) img.src = lbImages[lbCurrent].src;
  if (cap) cap.textContent = lbImages[lbCurrent].caption;
}

(function () {
  const lb     = document.getElementById('lightbox');
  const closeB = document.getElementById('lbClose');
  const prevB  = document.getElementById('lbPrev');
  const nextB  = document.getElementById('lbNext');
  if (!lb) return;

  if (closeB) closeB.addEventListener('click', closeLightbox);
  if (prevB)  prevB.addEventListener('click', lbPrev);
  if (nextB)  nextB.addEventListener('click', lbNext);

  lb.addEventListener('click', e => {
    if (e.target === lb) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('show')) return;
    if (e.key === 'ArrowRight') lbNext();
    if (e.key === 'ArrowLeft')  lbPrev();
    if (e.key === 'Escape')     closeLightbox();
  });
})();

/* ══════════════════════════════════════════
   10. REAL BLESSINGS COUNTER (STARTS FROM 0)
   Stored in localStorage, Real updates
══════════════════════════════════════════ */
(function () {
  const STORAGE_KEY = 'komal_ankur_blessings_count';
  let realCount = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
  if (isNaN(realCount) || realCount < 0) realCount = 0;

  const btn     = document.getElementById('blessBtn');
  const countEl = document.getElementById('blessCountEl');
  const wishChips = document.querySelectorAll('.wish-chip');

  if (countEl) countEl.textContent = realCount.toLocaleString();

  function grantBlessing(customLabel) {
    realCount++;
    localStorage.setItem(STORAGE_KEY, realCount.toString());
    if (countEl) countEl.textContent = realCount.toLocaleString();

    // Floating animation
    const symbols = ['🌸','🙏','✨','💖','🌺','🕉️','💐','❤️'];
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const span = document.createElement('span');
        span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        const rect = btn.getBoundingClientRect();
        const offsetX = (Math.random() - 0.5) * 60;
        span.style.cssText = `
          position: fixed;
          left: ${rect.left + rect.width / 2 + offsetX}px;
          top: ${rect.top}px;
          font-size: 2rem;
          pointer-events: none;
          z-index: 9999;
          animation: floatHeart 1.8s ease forwards;
        `;
        document.body.appendChild(span);
        setTimeout(() => span.remove(), 1900);
      }, i * 120);
    }

    if (customLabel) {
      showToast(`Ashirvaad Bheja Gaya: "${customLabel}" 🙏`);
    } else {
      showToast('Aapka shubh ashirvaad prapt hua! Dhanyavaad 🙏');
    }

    if (btn) {
      btn.style.transform = 'scale(.94)';
      setTimeout(() => { btn.style.transform = ''; }, 200);
    }
  }

  if (btn) {
    btn.addEventListener('click', () => grantBlessing());
  }

  wishChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const wish = chip.getAttribute('data-wish') || chip.textContent;
      grantBlessing(wish);
    });
  });
})();

/* ══════════════════════════════════════════
   11. SCROLL REVEAL
══════════════════════════════════════════ */
(function () {
  const els = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('revealed')); return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));
})();

/* ══════════════════════════════════════════
   12. SHARE BUTTON
══════════════════════════════════════════ */
(function () {
  const btn = document.getElementById('shareBtn');
  if (!btn) return;
  btn.addEventListener('click', async () => {
    const data = {
      title: 'Komal & Ankur Shubh Vivah 💍',
      text:  'Lakhimpur Kheri ➔ Bachhrawan (170 KM)\n2 December 2026 | Swayamwar Utsav Lawn, Bacchrawan\nAap sadar aamantrit hain! 🌸',
      url:   window.location.href
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        showToast('Nimantran link copy ho gaya! 📋');
      }
    } catch (e) {}
  });
})();

/* ══════════════════════════════════════════
   13. CURSOR SPARKLE (Desktop)
══════════════════════════════════════════ */
(function () {
  const isTouch = !window.matchMedia('(pointer: fine)').matches;
  if (isTouch) return;

  const symbols = ['✦','✧','✿','❀','❋','✵'];
  let last = 0;
  document.addEventListener('mousemove', e => {
    if (Date.now() - last < 70) return;
    last = Date.now();
    const s = document.createElement('span');
    s.className = 'cursor-sparkle';
    s.style.left = e.clientX + 'px';
    s.style.top  = e.clientY + 'px';
    s.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1000);
  });
})();

/* ══════════════════════════════════════════
   14. CONFETTI & RSVP
══════════════════════════════════════════ */
function launchConfetti() {
  const colors = ['#C9A84C','#7B1818','#ff6b9d','#fff','#ffd700','#ff9f43','#a29bfe'];
  for (let i = 0; i < 110; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    const color = colors[Math.floor(Math.random() * colors.length)];
    const w = 5  + Math.random() * 8;
    const h = 8  + Math.random() * 14;
    p.style.cssText = `
      left:${Math.random() * 100}vw;
      width:${w}px; height:${h}px;
      background:${color};
      border-radius:${Math.random() > .5 ? '50%' : '2px'};
      transform:rotate(${Math.random() * 360}deg);
      --dur:${2 + Math.random() * 2.5}s;
      --delay:${Math.random() * 0.8}s;
    `;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 4500);
  }
}

(function () {
  const form    = document.getElementById('rsvpForm');
  const success = document.getElementById('rsvpSuccess');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.rsvp-submit');
    if (btn) { btn.textContent = 'Bhej rahe hain...'; btn.disabled = true; }

    setTimeout(() => {
      form.style.display = 'none';
      if (success) success.style.display = 'block';
      launchConfetti();
    }, 700);
  });
})();

/* ══════════════════════════════════════════
   15. TOAST NOTIFICATION
══════════════════════════════════════════ */
function showToast(msg) {
  const t = document.createElement('div');
  t.style.cssText = `
    position:fixed; bottom:85px; left:50%; transform:translateX(-50%);
    background:rgba(60,18,10,.95); backdrop-filter:blur(12px);
    color:#fff; padding:12px 24px; border-radius:50px;
    font-size:.82rem; z-index:9998;
    border:1px solid rgba(201,168,76,.4);
    box-shadow: 0 8px 24px rgba(0,0,0,.3);
    white-space:nowrap;
  `;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transition = 'opacity .4s';
    setTimeout(() => t.remove(), 400);
  }, 2600);
}

/* ══════════════════════════════════════════
   16. VIEW EVENTS BUTTON
══════════════════════════════════════════ */
(function () {
  const btn = document.getElementById('viewEventsBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const target = document.getElementById('events');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
})();

/* ══════════════════════════════════════════
   17. GOOGLE CALENDAR LINK
══════════════════════════════════════════ */
(function () {
  const calLink = document.getElementById('calendarLink');
  if (!calLink) return;
  const params = new URLSearchParams({
    action:   'TEMPLATE',
    text:     'Komal & Ankur Shubh Vivah 💍',
    dates:    '20261202T013000Z/20261202T073000Z',
    details:  'Shubh Vivah Ceremony | Swayamwar Utsav Lawn, Bacchrawan, Raebareli 229301\nLakhimpur se Bachhrawan (170 KM)\nSmt. Geeta Ji ke aashirvaad se',
    location: 'Swayamwar Utsav Lawn, Bacchrawan, Raebareli, Uttar Pradesh 229301'
  });
  calLink.href = 'https://calendar.google.com/calendar/render?' + params.toString();
})();
