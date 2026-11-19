/* ============================================================
   KOMAL & ANKUR WEDDING WEBSITE — script.js
   Winding Road Navigation with Ankur in Car, Short Impactful Cracker,
   Zero-start Real Blessings Counter, Mobile-Optimized
   ============================================================ */

'use strict';

/* ══════════════════════════════════════════
   1. GRAND FIREWORK (SINGLE SHORT BURST)
══════════════════════════════════════════ */
function launchFireworks() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;z-index:9995;pointer-events:none;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const COLORS = ['#FFD700', '#FFA500', '#FF4500', '#FFF', '#F0E68C', '#E6C280'];
  const centerX = canvas.width / 2;
  const centerY = canvas.height * 0.42;

  // Single grand burst
  const count = 90;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.2;
    const speed = 2.5 + Math.random() * 5.5;
    particles.push({
      x: centerX,
      y: centerY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1.0,
      alpha: 1,
      decay: 0.024 + Math.random() * 0.018, // short duration (~1.4s)
      gravity: 0.07,
      size: 2.5 + Math.random() * 3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    });
  }

  const startTime = Date.now();
  function animate() {
    if (Date.now() - startTime > 1500 || particles.length === 0) {
      canvas.remove();
      return;
    }
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x  += p.vx;
      p.y  += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.97;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 6;
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

    // Single grand short celebratory burst
    launchFireworks();

    // Start music in user-gesture context
    startMusic();
    if (musicWrap) musicWrap.style.display = 'flex';

    theEnv.classList.add('opened');

    setTimeout(() => {
      envScreen.style.transition = 'opacity .75s ease';
      envScreen.style.opacity    = '0';
      envScreen.style.pointerEvents = 'none';

      mainSite.classList.remove('site-hidden');
      mainSite.style.opacity    = '0';
      mainSite.style.transition = 'opacity .75s ease';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        mainSite.style.opacity = '1';
      }));
    }, 850);

    setTimeout(() => {
      envScreen.style.display = 'none';
      document.body.style.overflow = '';
    }, 1600);
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
  const navbar      = document.getElementById('navbar');
  const hamburger   = document.getElementById('navHamburger');
  const mobileMenu  = document.getElementById('navMobileMenu');
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
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
      vy: 0.4 + Math.random() * 0.7,
      sway: Math.random() * Math.PI * 2,
      swayS: 0.008 + Math.random() * 0.008,
      rot: Math.random() * Math.PI * 2,
      rotS: (Math.random() - 0.5) * 0.03,
      alpha: 0.5 + Math.random() * 0.4,
      size: 4 + Math.random() * 6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    };
  }

  for (let i = 0; i < 18; i++) {
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
    if (petals.length < 24 && Math.random() < 0.035) petals.push(newPetal());
    for (let i = petals.length - 1; i >= 0; i--) {
      const p = petals[i];
      p.sway += p.swayS;
      p.x += Math.sin(p.sway) * 0.5;
      p.y += p.vy;
      p.rot += p.rotS;
      drawPetal(p);
      if (p.y > H + 25) petals.splice(i, 1);
    }
  }
  animatePetals();
})();

/* ══════════════════════════════════════════
   7. WINDING CURVED ROAD NAVIGATION
   Car with Ankur's Face steering along the S-Curve!
══════════════════════════════════════════ */
(function () {
  const journeySection = document.getElementById('journey');
  const mainPath       = document.getElementById('roadMainPath');
  const progressTrail  = document.getElementById('roadProgressTrail');
  const travelerPin    = document.getElementById('svgTravelerPin') || document.getElementById('svgTravelerCar');
  const liveKmCounter  = document.getElementById('liveKmCounter');
  const svgKmTag       = document.getElementById('svgKmTag');

  const dotSitapur     = document.getElementById('svgDotSitapur');
  const dotLucknow     = document.getElementById('svgDotLucknow');
  const dotBachhrawan  = document.getElementById('svgDotBachhrawan');

  if (!journeySection || !mainPath || !travelerPin) return;

  const totalLength = mainPath.getTotalLength();
  if (progressTrail) {
    progressTrail.style.strokeDasharray = totalLength;
    progressTrail.style.strokeDashoffset = totalLength;
  }

  function updateWindingRoad() {
    const rect = journeySection.getBoundingClientRect();
    const windowH = window.innerHeight;

    // Scroll progress through the journey section
    const startY = windowH * 0.65;
    const totalDistance = rect.height;
    const currentScrolled = startY - rect.top;

    let progress = currentScrolled / totalDistance;
    progress = Math.max(0, Math.min(1, progress));

    const currentKm = Math.round(progress * 170);

    // Compute point along the curved path
    const distanceOnPath = progress * totalLength;
    const pt = mainPath.getPointAtLength(distanceOnPath);

    // Keep Ankur's face and pin ALWAYS UPRIGHT (No upside down flipping!)
    travelerPin.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);

    // Update trail stroke
    if (progressTrail) {
      progressTrail.style.strokeDashoffset = totalLength - distanceOnPath;
    }

    // Update KM tags
    if (liveKmCounter) liveKmCounter.textContent = currentKm;
    if (svgKmTag) svgKmTag.textContent = `${currentKm} KM`;

    // Milestones lighting up as car passes
    if (dotSitapur) {
      if (progress >= 0.28) {
        dotSitapur.setAttribute('fill', '#FFD700');
        dotSitapur.setAttribute('stroke', '#FF4500');
      } else {
        dotSitapur.setAttribute('fill', '#FFF');
        dotSitapur.setAttribute('stroke', '#C9A84C');
      }
    }
    if (dotLucknow) {
      if (progress >= 0.68) {
        dotLucknow.setAttribute('fill', '#FFD700');
        dotLucknow.setAttribute('stroke', '#FF4500');
      } else {
        dotLucknow.setAttribute('fill', '#FFF');
        dotLucknow.setAttribute('stroke', '#C9A84C');
      }
    }
    if (dotBachhrawan) {
      if (progress >= 0.95) {
        dotBachhrawan.setAttribute('fill', '#FFD700');
        dotBachhrawan.setAttribute('stroke', '#FF4500');
      } else {
        dotBachhrawan.setAttribute('fill', '#FFF');
        dotBachhrawan.setAttribute('stroke', '#C9A84C');
      }
    }
  }

  window.addEventListener('scroll', updateWindingRoad, { passive: true });
  window.addEventListener('resize', updateWindingRoad, { passive: true });
  updateWindingRoad();
})();

/* ══════════════════════════════════════════
   8. REEL GALLERY (CHERISHED MOMENTS)
   Smooth 60fps Swipe, Uncropped Photos
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

  // Touch Swipe
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

  // Mouse Drag (Desktop)
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

  // Heart button
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
      heartBtn.style.transform = 'scale(1.4)';
      setTimeout(() => { heartBtn.style.transform = ''; }, 220);
    });
  }

  // Slide click opens lightbox
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
const lbPhotos = [
  'images/photo1.jpg',
  'images/photo2.jpg',
  'images/photo3.jpg',
  'images/photo4.jpg',
  'images/photo5.jpg',
  'images/photo6.jpg',
  'images/photo7.jpg',
  'images/photo8.jpg'
];

let lbIndex = 0;

function openLightbox(idx) {
  lbIndex = idx;
  const lb  = document.getElementById('lightbox');
  const img = document.getElementById('lbImg');
  if (!lb || !img) return;
  img.src = lbPhotos[lbIndex];
  lb.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('show');
  document.body.style.overflow = '';
}

function lbNext() {
  lbIndex = (lbIndex + 1) % lbPhotos.length;
  const img = document.getElementById('lbImg');
  if (img) img.src = lbPhotos[lbIndex];
}
function lbPrev() {
  lbIndex = (lbIndex - 1 + lbPhotos.length) % lbPhotos.length;
  const img = document.getElementById('lbImg');
  if (img) img.src = lbPhotos[lbIndex];
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
══════════════════════════════════════════ */
(function () {
  const STORAGE_KEY = 'komal_ankur_blessings_count';
  let realCount = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
  if (isNaN(realCount) || realCount < 0) realCount = 0;

  const btn       = document.getElementById('blessBtn');
  const countEl   = document.getElementById('blessCountEl');
  const wishChips = document.querySelectorAll('.wish-chip');

  if (countEl) countEl.textContent = realCount.toLocaleString();

  function grantBlessing(customLabel) {
    realCount++;
    localStorage.setItem(STORAGE_KEY, realCount.toString());
    if (countEl) countEl.textContent = realCount.toLocaleString();

    // Floating heart/flower animation
    const symbols = ['🌸','🙏','✨','💖','🌺','🕉️','💐','❤️'];
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const span = document.createElement('span');
        span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        const rect = btn.getBoundingClientRect();
        const offsetX = (Math.random() - 0.5) * 50;
        span.style.cssText = `
          position: fixed;
          left: ${rect.left + rect.width / 2 + offsetX}px;
          top: ${rect.top}px;
          font-size: 1.8rem;
          pointer-events: none;
          z-index: 9999;
          animation: floatHeart 1.7s ease forwards;
        `;
        document.body.appendChild(span);
        setTimeout(() => span.remove(), 1800);
      }, i * 110);
    }

    if (customLabel) {
      showToast(`Blessing Sent: "${customLabel}" 🙏`);
    } else {
      showToast('Thank you for your warm blessings! 🙏');
    }

    if (btn) {
      btn.style.transform = 'scale(.95)';
      setTimeout(() => { btn.style.transform = ''; }, 200);
    }
  }

  if (btn) btn.addEventListener('click', () => grantBlessing());

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
  }, { threshold: 0.08 });
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
      title: 'Komal & Ankur Wedding 💍',
      text:  'Lakhimpur Kheri ➔ Bachhrawan (170 KM)\n2 December 2026 | Swayamwar Utsav Lawn, Bacchrawan\nYou are cordially invited! 🌸',
      url:   window.location.href
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        showToast('Invitation link copied! 📋');
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
  for (let i = 0; i < 90; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    const color = colors[Math.floor(Math.random() * colors.length)];
    const w = 5 + Math.random() * 7;
    const h = 7 + Math.random() * 12;
    p.style.cssText = `
      left:${Math.random() * 100}vw;
      width:${w}px; height:${h}px;
      background:${color};
      border-radius:${Math.random() > .5 ? '50%' : '2px'};
      transform:rotate(${Math.random() * 360}deg);
      --dur:${2 + Math.random() * 2}s;
      --delay:${Math.random() * 0.7}s;
    `;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 4200);
  }
}

(function () {
  const form    = document.getElementById('rsvpForm');
  const success = document.getElementById('rsvpSuccess');
  const nextUrl = document.getElementById('formNextUrl');
  const waBtn   = document.getElementById('waConfirmBtn');
  if (!form) return;

  if (nextUrl) {
    nextUrl.value = window.location.href.split('#')[0] + '#rsvpSuccess';
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.rsvp-submit');
    const originalText = btn ? btn.textContent : '💌 Confirm Attendance';

    if (btn) {
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
      btn.disabled = true;
    }

    const guestName  = (form.querySelector('input[name="Guest Name"]')?.value || form.querySelector('#rName')?.value || '').trim();
    const guestPhone = (form.querySelector('input[name="Mobile Number"]')?.value || form.querySelector('#rPhone')?.value || '').trim();
    const guestCount = form.querySelector('select[name="Number of Guests"]')?.value || '2';
    const guestEvent = form.querySelector('select[name="Attending Event"]')?.value || 'All Celebrations';
    const guestMsg   = (form.querySelector('textarea[name="Message"]')?.value || form.querySelector('#rMsg')?.value || '').trim();

    // Prepare WhatsApp text link
    if (waBtn) {
      const waMsg = encodeURIComponent(
        `Namaste! RSVP Confirmation for Komal & Ankur Wedding:\n` +
        `• Name: ${guestName}\n` +
        `• Mobile: ${guestPhone}\n` +
        `• Guests: ${guestCount}\n` +
        `• Event: ${guestEvent}\n` +
        (guestMsg ? `• Message: ${guestMsg}` : '')
      );
      waBtn.href = `https://wa.me/916388408011?text=${waMsg}`;
    }

    try {
      // Direct Real-time Email submission via FormSubmit AJAX API
      const res = await fetch("https://formsubmit.co/ajax/kumarverma2002@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          "_subject": `💍 New RSVP: ${guestName} (${guestCount} Guests) - Komal & Ankur Wedding`,
          "_template": "table",
          "_captcha": "false",
          "Guest Name": guestName,
          "Mobile Number": guestPhone,
          "Number of Guests": guestCount,
          "Attending Events": guestEvent,
          "Wishes / Message": guestMsg || "Best wishes to the couple!"
        })
      });

      const data = await res.json();

      form.style.display = 'none';
      if (success) success.style.display = 'block';
      launchConfetti();

      if (data && data.success === "false" && data.message && data.message.toLowerCase().includes("activation")) {
        showToast('Gmail dekhein: "Activate Form" button par click karein! 📧');
      } else {
        showToast('RSVP sent to kumarverma2002@gmail.com! 📧');
      }
    } catch (err) {
      // In case of local file restriction or offline, trigger form submit or show success
      try {
        form.submit();
      } catch (submitErr) {
        form.style.display = 'none';
        if (success) success.style.display = 'block';
        launchConfetti();
      }
    }
  });
})();

/* ══════════════════════════════════════════
   15. TOAST NOTIFICATION
══════════════════════════════════════════ */
function showToast(msg) {
  const t = document.createElement('div');
  t.style.cssText = `
    position:fixed; bottom:80px; left:50%; transform:translateX(-50%);
    background:rgba(55,15,10,.94); backdrop-filter:blur(10px);
    color:#fff; padding:10px 20px; border-radius:50px;
    font-size:.8rem; z-index:9998;
    border:1px solid rgba(201,168,76,.4);
    box-shadow: 0 6px 20px rgba(0,0,0,.3);
    white-space:nowrap;
  `;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transition = 'opacity .4s';
    setTimeout(() => t.remove(), 400);
  }, 2500);
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
    text:     'Komal & Ankur Wedding 💍',
    dates:    '20261202T013000Z/20261202T073000Z',
    details:  'Wedding Ceremony | Swayamwar Utsav Lawn, Bacchrawan, Raebareli 229301\nLakhimpur to Bachhrawan (170 KM)\nWith the blessings of Smt. Geeta Ji',
    location: 'Swayamwar Utsav Lawn, Bacchrawan, Raebareli, Uttar Pradesh 229301'
  });
  calLink.href = 'https://calendar.google.com/calendar/render?' + params.toString();
})();
