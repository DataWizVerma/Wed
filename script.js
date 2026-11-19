/* ═══════════════════════════════════════════════
   WEDDING WEBSITE – SCRIPT.JS
   Komal & Ankur | 2 December 2026
═══════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────
   1. ENVELOPE OPEN ANIMATION
───────────────────────────────────────────── */
(function () {
  const envScreen  = document.getElementById('envelopeScreen');
  const mainSite   = document.getElementById('mainSite');
  const theEnvelope = document.getElementById('theEnvelope');
  const waxSeal    = document.getElementById('waxSeal');
  const musicWrap  = document.getElementById('musicWrap');

  let opened = false;

  function openEnvelope() {
    if (opened) return;
    opened = true;

    // Start music synchronously on user interaction (unblocks mobile browser autoplay)
    startMusic();
    if (musicWrap) musicWrap.style.display = 'flex';

    // 1. Open the flap
    theEnvelope.classList.add('opened');

    // 2. Slight scale on envelope
    theEnvelope.style.transform = 'scale(0.98)';

    // 3. After flap animation, fade out envelope screen & show main site
    setTimeout(() => {
      envScreen.style.transition = 'opacity .7s ease';
      envScreen.style.opacity = '0';
      envScreen.style.pointerEvents = 'none';

      mainSite.classList.remove('site-hidden');
      mainSite.style.opacity = '0';
      mainSite.style.transition = 'opacity .7s ease';

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          mainSite.style.opacity = '1';
        });
      });
    }, 950);

    // 4. Fully remove envelope screen after transition
    setTimeout(() => {
      envScreen.style.display = 'none';
      document.body.style.overflow = '';
    }, 1800);
  }

  // Tap seal or anywhere on envelope to open
  if (waxSeal)    waxSeal.addEventListener('click',    openEnvelope);
  if (theEnvelope) theEnvelope.addEventListener('click', openEnvelope);

  // Prevent scroll on envelope screen
  document.body.style.overflow = 'hidden';
})();


/* ─────────────────────────────────────────────
   2. COUNTDOWN TIMER
   Wedding: Wednesday, 2 December 2026
───────────────────────────────────────────── */
(function () {
  // ✏️ Change date/time here if needed
  const TARGET = new Date('2026-12-02T07:00:00+05:30');

  const $ = id => document.getElementById(id);
  const dEl = $('cDays'), hEl = $('cHours'), mEl = $('cMins'), sEl = $('cSecs');

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const diff = TARGET - Date.now();
    if (diff <= 0) {
      dEl.textContent = hEl.textContent = mEl.textContent = sEl.textContent = '00';
      return;
    }
    dEl.textContent = pad(Math.floor(diff / 86400000));
    hEl.textContent = pad(Math.floor(diff / 3600000) % 24);
    mEl.textContent = pad(Math.floor(diff / 60000)   % 60);
    sEl.textContent = pad(Math.floor(diff / 1000)    % 60);
  }

  tick();
  setInterval(tick, 1000);
})();


/* ─────────────────────────────────────────────
   3. NAVBAR — scroll shrink + hamburger
───────────────────────────────────────────── */
(function () {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');
  const navOverlay = document.getElementById('navOverlay');

  if (!navbar) return;

  // Scroll behaviour
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // Hamburger toggle
  function toggleMenu(open) {
    hamburger.classList.toggle('open', open);
    navMenu.classList.toggle('open', open);
    navOverlay.classList.toggle('show', open);
    hamburger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (hamburger) hamburger.addEventListener('click', () => {
    toggleMenu(!navMenu.classList.contains('open'));
  });
  if (navOverlay) navOverlay.addEventListener('click', () => toggleMenu(false));

  // Close on nav link click
  navMenu && navMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => toggleMenu(false))
  );

  // Global closeNav for inline onclick
  window.closeNav = () => toggleMenu(false);
})();


/* ─────────────────────────────────────────────
   4. FALLING PETALS (hero background)
───────────────────────────────────────────── */
(function () {
  const container = document.getElementById('petals');
  if (!container) return;

  // Respect reduced-motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const emojis = ['🌸', '🌺', '🌹', '✿', '❀', '🌷', '💮'];

  function spawnPetal() {
    const p = document.createElement('span');
    p.className = 'petal';
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    p.style.left     = (Math.random() * 102) + 'vw';
    p.style.fontSize = (.7 + Math.random() * .7) + 'rem';
    const dur = 7 + Math.random() * 9;
    p.style.animationDuration = dur + 's';
    p.style.animationDelay   = (Math.random() * 4) + 's';
    p.style.opacity = (.4 + Math.random() * .5).toString();
    container.appendChild(p);
    setTimeout(() => p.remove(), (dur + 5) * 1000);
  }

  // Initial burst
  for (let i = 0; i < 12; i++) spawnPetal();
  setInterval(spawnPetal, 900);
})();


/* ─────────────────────────────────────────────
   5. SCROLL REVEAL ANIMATIONS
───────────────────────────────────────────── */
(function () {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings slightly
        const delay = (Array.from(entry.target.parentElement.children)
          .indexOf(entry.target)) * 80;
        setTimeout(() => entry.target.classList.add('revealed'), delay);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => io.observe(el));
})();


/* ─────────────────────────────────────────────
   6. GALLERY — image load / lightbox
───────────────────────────────────────────── */
(function () {
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lbImg');
  const lbClose  = document.getElementById('lbClose');

  // Handle image load/error
  document.querySelectorAll('.gal-img').forEach(img => {
    function onLoad() {
      img.classList.add('loaded');
      const ph = img.nextElementSibling;
      if (ph && ph.classList.contains('gal-placeholder')) ph.style.display = 'none';
    }
    function onError() {
      img.style.display = 'none';
      const ph = img.nextElementSibling;
      if (ph) ph.style.display = 'flex';
    }
    if (img.complete && img.naturalWidth > 0) onLoad();
    else {
      img.addEventListener('load',  onLoad);
      img.addEventListener('error', onError);
    }
  });

  // Lightbox
  document.querySelectorAll('.gal-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const img = card.querySelector('.gal-img');
      if (!img || img.style.display === 'none') return;
      lbImg.src = img.src;
      lightbox.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLb() {
    lightbox.classList.remove('show');
    document.body.style.overflow = '';
    setTimeout(() => lbImg.src = '', 300);
  }

  if (lbClose) lbClose.addEventListener('click', closeLb);
  lightbox && lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLb();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.classList.contains('show')) closeLb();
  });
})();


/* ─────────────────────────────────────────────
   7. RSVP FORM
───────────────────────────────────────────── */
(function () {
  const form    = document.getElementById('rsvpForm');
  const success = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('submitBtn');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    // Basic validation
    const name  = form.querySelector('[name="name"]');
    const phone = form.querySelector('[name="phone"]');
    if (!name.value.trim())  { name.focus();  return; }
    if (!phone.value.trim()) { phone.focus(); return; }

    // ✏️ TO CONNECT A REAL BACKEND — replace the setTimeout below with:
    //
    //   const data = new FormData(form);
    //   fetch('https://formspree.io/f/YOUR_FORM_ID', { method:'POST', body:data })
    //     .then(() => showSuccess());
    //
    // Free options: formspree.io  |  netlify forms (add netlify attr to <form>)

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>&nbsp; Bhej rahe hain...';

    setTimeout(() => {
      success.style.display = 'block';
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      form.querySelectorAll('input,select,textarea').forEach(el => {
        if (el.type === 'radio') { el.checked = el.defaultChecked; }
        else if (el.type === 'checkbox') { el.checked = false; }
        else { el.value = ''; }
      });
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i>&nbsp; RSVP Bhejein';
    }, 1600);
  });
})();


/* ─────────────────────────────────────────────
   8. DUAL-ENGINE MUSIC PLAYER
   Engine 1: HTML5 Audio (Plays any MP3 e.g. music/song.mp3 or Kesariya)
   Engine 2: Pure Web Audio API Synthesizer (Instant, 100% offline, romantic acoustic harp & strings)
───────────────────────────────────────────── */

let musicPlaying = false;
let audioMode = 'synth'; // 'mp3' or 'synth'

// Web Audio API Synthesizer (Zero-dependency acoustic wedding melody)
const M = m => 440 * Math.pow(2, (m - 69) / 12);
let ac, out, wet, synthStep = 0, synthTimer = null;

function ensureAudio() {
  if (ac) return;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;
  ac = new AudioCtx();
  out = ac.createGain();
  out.gain.value = 0;
  out.connect(ac.destination);

  // Soft lush convolution reverb
  const len = Math.floor(ac.sampleRate * 2.5);
  const buf = ac.createBuffer(2, len, ac.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6);
    }
  }
  const conv = ac.createConvolver();
  conv.buffer = buf;
  wet = ac.createGain();
  wet.gain.value = 0.35;
  wet.connect(conv);
  conv.connect(out);
}

function voice(parts, t, env, lp) {
  if (!ac) return;
  const g = ac.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(env.v, t + env.a);
  if (env.hold) {
    g.gain.setValueAtTime(env.v, t + env.a + env.hold);
    g.gain.linearRampToValueAtTime(0.0001, t + env.a + env.hold + env.r);
  } else {
    g.gain.exponentialRampToValueAtTime(0.0001, t + env.a + env.d);
  }
  const f = ac.createBiquadFilter();
  f.type = "lowpass";
  f.frequency.value = lp;
  g.connect(f);
  f.connect(out);
  f.connect(wet);
  const end = t + env.a + (env.hold ? env.hold + env.r : env.d) + 0.1;
  parts.forEach(([type, freq, gain, det]) => {
    const o = ac.createOscillator(), og = ac.createGain();
    o.type = type;
    o.frequency.value = freq;
    if (det) o.detune.value = det;
    og.gain.value = gain;
    o.connect(og);
    og.connect(g);
    o.start(t);
    o.stop(end);
  });
}

const harp = (m, t, v = 0.1, d = 2.4) =>
  voice([["triangle", M(m), 1], ["sine", M(m) * 2, 0.25]], t, { a: 0.003, d, v }, 3200);

const strings = (m, t, len, v = 0.03) =>
  voice([["sawtooth", M(m), 0.6, -7], ["sawtooth", M(m), 0.6, 7], ["sine", M(m), 0.5]], t, { a: 0.9, hold: Math.max(0.1, len - 0.9), r: 1.4, v }, 1100);

const BEAT = 0.3;
const CH = [
  [43, 55, 59, 62], // G major
  [38, 50, 54, 57], // D major
  [40, 52, 55, 59], // E minor
  [36, 48, 52, 55]  // C major
];
const PAT = [0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 3, 4, 5, 4, 3];

function scheduleSynth() {
  if (!ac || !musicPlaying || audioMode !== 'synth') return;
  const t = ac.currentTime + 0.06;
  const bar = Math.floor(synthStep / 16) % 4;
  const i = synthStep % 16;
  const c = CH[bar];

  if (i === 0) {
    harp(c[0], t, 0.12, 3.4);
    [c[1], c[2], c[3]].forEach(n => strings(n + 12, t, 16 * BEAT));
  }
  const tones = [c[1], c[2], c[3], c[1] + 12, c[2] + 12, c[3] + 12, c[1] + 24];
  harp(tones[PAT[i]], t, 0.075, 2.2);

  if (i === 0 || i === 8) {
    const top = [[74, 71], [69, 66], [71, 67], [67, 64]][bar][i ? 1 : 0];
    harp(top + 12, t, 0.06, 3);
  }
  synthStep++;
  synthTimer = setTimeout(scheduleSynth, BEAT * 1000);
}

function updateMusicUI(isPlaying) {
  const musicBtn = document.getElementById('musicBtn');
  const musicIco = document.getElementById('musicIco');
  const musicLabel = document.getElementById('musicLabel');

  if (musicBtn) {
    musicBtn.classList.toggle('playing', isPlaying);
    musicBtn.setAttribute('aria-pressed', String(isPlaying));
  }
  if (musicIco) {
    musicIco.classList.toggle('fa-music', !isPlaying);
    musicIco.classList.toggle('fa-pause', isPlaying);
  }
  if (musicLabel) {
    musicLabel.classList.toggle('show', isPlaying);
  }
}

function startMusic() {
  musicPlaying = true;
  ensureAudio();
  if (ac && ac.state === 'suspended') {
    ac.resume();
  }

  const bgAudio = document.getElementById('bgAudio');

  // Try playing MP3 first if loaded and accessible
  if (bgAudio && bgAudio.src && !bgAudio.error) {
    const p = bgAudio.play();
    if (p !== undefined) {
      p.then(() => {
        audioMode = 'mp3';
        updateMusicUI(true);
      }).catch(() => {
        // Fallback to Web Audio synthesizer
        startSynth();
      });
      return;
    }
  }
  startSynth();
}

function startSynth() {
  audioMode = 'synth';
  try {
    ensureAudio();
    if (ac && ac.state === 'suspended') {
      ac.resume();
    }
    if (out) {
      out.gain.cancelScheduledValues(ac.currentTime);
      out.gain.setValueAtTime(out.gain.value, ac.currentTime);
      out.gain.linearRampToValueAtTime(0.85, ac.currentTime + 1.5);
    }
    clearTimeout(synthTimer);
    scheduleSynth();
    updateMusicUI(true);
  } catch (err) {
    console.warn("Synth audio error:", err);
  }
}

function stopMusic() {
  musicPlaying = false;
  const bgAudio = document.getElementById('bgAudio');
  if (bgAudio) {
    bgAudio.pause();
  }
  clearTimeout(synthTimer);
  if (ac && out) {
    try {
      out.gain.cancelScheduledValues(ac.currentTime);
      out.gain.setTargetAtTime(0, ac.currentTime, 0.2);
    } catch (e) {}
  }
  updateMusicUI(false);
}

(function () {
  const musicBtn = document.getElementById('musicBtn');
  if (!musicBtn) return;

  musicBtn.addEventListener('click', () => {
    if (musicPlaying) stopMusic();
    else startMusic();
  });
})();


/* ─────────────────────────────────────────────
   9. SMOOTH SCROLL FOR ANCHOR LINKS
───────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 60; // navbar height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ─────────────────────────────────────────────
   10. ACTIVE NAV LINK (scroll spy)
───────────────────────────────────────────── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-menu a');
  if (!sections.length || !links.length) return;

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    links.forEach(link => {
      const active = link.getAttribute('href') === '#' + current;
      link.style.color = active ? 'var(--gold)' : '';
    });
  }, { passive: true });
})();


console.log('💍 Komal & Ankur Wedding Website Ready!');
console.log('📸 Add engagement photos: images/photo1.jpg & images/photo2.jpg');
console.log('🎵 Music: Kesariya (ID: BddP6PYo2gs) — change SONG_ID in script.js to use another song');
