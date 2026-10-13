(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- nav: solid once scrolled ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => nav && nav.classList.toggle('scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- mobile menu ---------- */
  const burger = document.querySelector('.burger');
  if (burger) {
    burger.addEventListener('click', () => {
      const open = document.body.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    document.querySelectorAll('.mobile a').forEach((a) => a.addEventListener('click', () => {
      document.body.classList.remove('menu-open');
      burger.setAttribute('aria-expanded', 'false');
    }));
  }

  /* ---------- reveal on scroll ---------- */
  const items = document.querySelectorAll('[data-r]');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach((el) => {
      const sib = el.parentElement ? [...el.parentElement.children].filter((c) => c.hasAttribute('data-r')).indexOf(el) : 0;
      el.style.transitionDelay = `${Math.max(0, sib) * 80}ms`;
      io.observe(el);
    });
  } else {
    items.forEach((el) => el.classList.add('in'));
  }

  /* ---------- statement: words light up as you scroll ---------- */
  document.querySelectorAll('[data-words]').forEach((p) => {
    const words = p.textContent.trim().split(/\s+/);
    p.innerHTML = words.map((w) => `<span class="dim">${w}</span>`).join(' ');
    const spans = [...p.children];
    const paint = () => {
      const r = p.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
      const lit = Math.round(progress * spans.length);
      spans.forEach((s, i) => s.classList.toggle('dim', i >= lit));
    };
    if (reduce) { spans.forEach((s) => s.classList.remove('dim')); return; }
    paint();
    window.addEventListener('scroll', paint, { passive: true });
    window.addEventListener('resize', paint);
  });

  /* ---------- boomerang video background ----------
     Play once while capturing every frame to offscreen canvases (≤960px wide),
     then ping-pong those frames on a display canvas at 30fps, forever. */
  const initBoomerang = (root) => {
    const video = root.querySelector('video');
    const canvas = root.querySelector('canvas');
    if (!video || !canvas) return;
    const ctx = canvas.getContext('2d');
    const start = () => { const p = video.play(); if (p && p.catch) p.catch(() => {}); };

    if (reduce) {
      video.addEventListener('loadeddata', () => { try { video.currentTime = Math.min(5, (video.duration || 10) / 2); } catch (e) {} }, { once: true });
      return;
    }
    const lowMemory = 'deviceMemory' in navigator && navigator.deviceMemory < 4;
    if (lowMemory) { video.loop = true; start(); return; }

    const capWidth = window.innerWidth < 768 ? 640 : 960;
    const hasRVFC = 'requestVideoFrameCallback' in HTMLVideoElement.prototype;
    const frames = [];
    let lastTime = -1, capturing = true, w = 0, h = 0, visible = true;

    const schedule = () => { hasRVFC ? video.requestVideoFrameCallback(capture) : requestAnimationFrame(capture); };
    const capture = () => {
      if (!capturing) return;
      if (video.readyState >= 2 && video.videoWidth && video.currentTime !== lastTime) {
        lastTime = video.currentTime;
        if (!w) { w = Math.min(capWidth, video.videoWidth); h = Math.round(video.videoHeight * (w / video.videoWidth)); }
        const c = document.createElement('canvas');
        c.width = w; c.height = h;
        c.getContext('2d').drawImage(video, 0, 0, w, h);
        frames.push(c);
      }
      schedule();
    };

    video.addEventListener('play', () => { if (capturing) schedule(); }, { once: true });
    video.addEventListener('ended', () => {
      capturing = false;
      if (frames.length < 2) { video.loop = true; start(); return; }
      canvas.width = w; canvas.height = h;
      const interval = 1000 / 30;
      let i = frames.length - 1, dir = -1, last = 0;
      ctx.drawImage(frames[i], 0, 0);
      video.style.display = 'none';
      canvas.style.display = 'block';
      const tick = (ts) => {
        requestAnimationFrame(tick);
        if (!visible || ts - last < interval) return;
        last = ts;
        ctx.drawImage(frames[i], 0, 0);
        if (i <= 0) dir = 1; else if (i >= frames.length - 1) dir = -1;
        i += dir;
      };
      requestAnimationFrame(tick);
    });
    if ('IntersectionObserver' in window) new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(root);
    start();
  };
  document.querySelectorAll('[data-boomerang]').forEach(initBoomerang);

  /* ---------- Get in Touch form: opens the visitor's email app ---------- */
  const form = document.getElementById('contact-form');
  if (form) {
    const status = form.querySelector('.form-status');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (form.hp && form.hp.value) return;
      if (!form.checkValidity()) {
        form.reportValidity();
        status.textContent = 'Please fill in the fields marked with an *.';
        status.classList.add('error');
        return;
      }
      const name = form.fname.value.trim(), email = form.email.value.trim(), phone = form.phone.value.trim();
      const subject = `Website enquiry from ${name}`;
      const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nSent from the Get in Touch form (${document.title}).`;
      status.classList.remove('error');
      status.textContent = 'Opening your email app with your details…';
      window.location.href = `mailto:feedback@wmuindia.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
