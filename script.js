(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- nav: hide on scroll down, theme from the chapter beneath ---------- */
  const nav = $('#nav');
  const themed = $$('[data-theme]');
  let lastY = scrollY, ticking = false;
  const navUpdate = () => {
    const y = scrollY;
    nav.classList.toggle('solid', y > 24);
    if (!document.body.classList.contains('menu-open') && !nav.querySelector('.ni.open')) {
      if (y > 160 && y - lastY > 6) nav.classList.add('hide');
      else if (lastY - y > 6 || y < 160) nav.classList.remove('hide');
    }
    lastY = y;
    const probe = 36;
    let theme = 'light';
    for (const s of themed) { const r = s.getBoundingClientRect(); if (r.top <= probe && r.bottom > probe) { theme = s.dataset.theme; } }
    nav.dataset.theme = theme;
    const prog = $('.progress');
    if (prog) { const h = document.documentElement.scrollHeight - innerHeight; prog.style.transform = `scaleX(${h > 0 ? Math.min(1, y / h) : 0})`; }
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(navUpdate); } }, { passive: true });
  navUpdate();

  /* dropdowns: hover on fine pointers, click everywhere, Esc to close */
  $$('.ni.has').forEach((ni) => {
    const btn = ni.querySelector('button');
    let t;
    const open = (v) => { ni.classList.toggle('open', v); btn.setAttribute('aria-expanded', String(v)); };
    btn.addEventListener('click', () => open(!ni.classList.contains('open')));
    if (matchMedia('(hover: hover)').matches) {
      ni.addEventListener('mouseenter', () => { clearTimeout(t); $$('.ni.open').forEach((o) => o !== ni && o.classList.remove('open')); open(true); });
      ni.addEventListener('mouseleave', () => { t = setTimeout(() => open(false), 140); });
    }
    ni.addEventListener('keydown', (e) => { if (e.key === 'Escape') { open(false); btn.focus(); } });
  });
  document.addEventListener('click', (e) => { $$('.ni.open').forEach((ni) => { if (!ni.contains(e.target)) ni.classList.remove('open'); }); });

  /* mobile menu */
  const burger = $('.burger');
  if (burger) {
    burger.addEventListener('click', () => {
      const o = document.body.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded', String(o));
      burger.setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
    });
    $$('.mnav a').forEach((a) => a.addEventListener('click', () => document.body.classList.remove('menu-open')));
    addEventListener('keydown', (e) => { if (e.key === 'Escape') document.body.classList.remove('menu-open'); });
  }

  /* ---------- reveals (staggered per group) ---------- */
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -12% 0px', threshold: 0.1 });
  $$('[data-r]').forEach((el) => {
    const sibs = [...el.parentElement.children].filter((c) => c.hasAttribute('data-r'));
    el.style.setProperty('--rd', `${Math.min(sibs.indexOf(el), 6) * 75}ms`);
    if (reduce) el.classList.add('in'); else io.observe(el);
  });
  $$('.shot.reveal').forEach((el) => reduce ? el.classList.add('in') : io.observe(el));

  /* ---------- motion graphics: start when visible, pause loops off-screen ---------- */
  const restart = (el) => { el.classList.remove('on'); void el.getBoundingClientRect(); el.classList.add('on'); };
  const mgio = new IntersectionObserver((es) => es.forEach((e) => {
    const el = e.target;
    if (e.isIntersecting) { if (!el.classList.contains('on')) el.classList.add('on'); el.classList.remove('paused'); }
    else el.classList.add('paused');
  }), { threshold: 0.2 });
  $$('[data-mg]').forEach((el) => mgio.observe(el));

  /* ---------- count-up numbers ---------- */
  const cio = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target; cio.unobserve(el);
    const to = +el.dataset.count, from = +(el.dataset.from || 0);
    if (reduce) { el.textContent = to; return; }
    const t0 = performance.now(), dur = 1400;
    const step = (t) => { const p = Math.min(1, (t - t0) / dur); const v = from + (to - from) * (1 - Math.pow(1 - p, 4)); el.textContent = Math.round(v); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }), { threshold: 0.6 });
  $$('[data-count]').forEach((el) => cio.observe(el));

  /* ---------- statement: words light up with scroll ---------- */
  $$('[data-words]').forEach((p) => {
    p.innerHTML = p.textContent.trim().split(/\s+/).map((w) => `<span class="w">${w}</span>`).join(' ');
    const ws = [...p.children];
    const paint = () => {
      const r = p.getBoundingClientRect();
      const prog = Math.min(1, Math.max(0, (innerHeight * 0.8 - r.top) / (r.height + innerHeight * 0.3)));
      const n = Math.round(prog * ws.length);
      ws.forEach((w, i) => w.classList.toggle('on', i < n));
    };
    if (reduce) { ws.forEach((w) => w.classList.add('on')); return; }
    paint(); addEventListener('scroll', paint, { passive: true });
  });

  /* ---------- wealth cycle ---------- */
  $$('[data-cycle]').forEach((root) => {
    const btns = $$('.stages button', root), nodes = $$('.node', root), lbls = $$('.lbl', root);
    const prog = $('.prog', root), center = $('.center', root.querySelector('.orbit'));
    const cb = $('b', center), cs = $('span', center);
    let i = 0, timer, hold = 0;
    const set = (n) => {
      i = n;
      btns.forEach((b, k) => b.classList.toggle('on', k === n));
      nodes.forEach((d, k) => d.classList.toggle('on', k <= n));
      lbls.forEach((d, k) => d.classList.toggle('on', k === n));
      prog.style.strokeDashoffset = String(1 - (n + 1) / btns.length);
      center.classList.add('swap');
      setTimeout(() => { cb.textContent = btns[n].dataset.name; cs.textContent = btns[n].dataset.line; center.classList.remove('swap'); }, 200);
    };
    btns.forEach((b, k) => { b.addEventListener('click', () => { hold = Date.now() + 9000; set(k); }); b.addEventListener('mouseenter', () => { hold = Date.now() + 9000; set(k); }); });
    set(0);
    if (!reduce) {
      let vis = false;
      new IntersectionObserver(([e]) => { vis = e.isIntersecting; }).observe(root);
      timer = setInterval(() => { if (vis && Date.now() > hold) set((i + 1) % btns.length); }, 2600);
    }
  });

  /* ---------- index with preview ---------- */
  $$('[data-ix]').forEach((ix) => {
    const rows = $$('.ix-row', ix), pvs = $$('.ix-prev .pv', ix);
    const activate = (n) => {
      rows.forEach((r, k) => r.classList.toggle('on', k === n));
      pvs.forEach((p, k) => { const on = k === n; p.classList.toggle('on', on); const mg = $('.mg', p); if (mg && on) restart(mg); });
    };
    rows.forEach((r, k) => {
      r.addEventListener('mouseenter', () => { ix.classList.add('hovering'); activate(k); });
      r.addEventListener('focus', () => activate(k));
    });
    ix.querySelector('.ix-list').addEventListener('mouseleave', () => ix.classList.remove('hovering'));
    activate(0);
  });

  /* ---------- accordions ---------- */
  $$('.acc-head').forEach((h) => {
    h.addEventListener('click', () => {
      const item = h.closest('.acc');
      const group = h.closest('[data-acc-group]');
      const open = !item.classList.contains('open');
      if (group && open) $$('.acc.open', group).forEach((o) => { if (o !== item) { o.classList.remove('open'); $('.acc-head', o).setAttribute('aria-expanded', 'false'); } });
      item.classList.toggle('open', open);
      h.setAttribute('aria-expanded', String(open));
      const mg = item.querySelector('.ix-mobile-mg .mg'); if (mg && open) restart(mg);
    });
  });

  /* ---------- pinned story: active step drives the graphic ---------- */
  $$('[data-story]').forEach((st) => {
    const steps = $$('.step', st), pvs = $$('.gfx .pv', st), line = $('.gfx [data-progress]', st);
    const set = (n) => {
      steps.forEach((s, k) => s.classList.toggle('on', k === n));
      if (pvs.length > 1) pvs.forEach((p, k) => { const on = k === n; if (on && !p.classList.contains('on')) { const mg = $('.mg', p); if (mg) restart(mg); } p.classList.toggle('on', on); });
      if (line) line.style.strokeDashoffset = String(1 - (n + 1) / steps.length);
      $$('[data-grow]', st).forEach((g) => g.classList.toggle('lit', +g.dataset.grow <= n));
    };
    const sio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) set(steps.indexOf(e.target)); }), { rootMargin: '-45% 0px -45% 0px' });
    steps.forEach((s) => sio.observe(s));
    set(0);
  });

  /* ---------- drag rows ---------- */
  $$('.drag').forEach((d) => {
    let down = false, sx = 0, sl = 0, moved = false;
    d.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = d.scrollLeft; d.classList.add('grabbing'); });
    addEventListener('pointermove', (e) => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 3) moved = true; d.scrollLeft = sl - dx; });
    addEventListener('pointerup', () => { if (!down) return; down = false; d.classList.remove('grabbing'); });
    d.addEventListener('click', (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
    const wrap = d.closest('section');
    $$('[data-drag]', wrap).forEach((b) => b.addEventListener('click', () => d.scrollBy({ left: (+b.dataset.drag) * Math.min(360, d.clientWidth * 0.8), behavior: 'smooth' })));
  });

  /* ---------- allocation explorer ---------- */
  $$('[data-alloc]').forEach((a) => {
    const P = JSON.parse(a.dataset.alloc);
    const input = $('input', a), risk = $('.risk', a), name = $('.mid b', a);
    const safeEl = $('[data-safe]', a), riskEl = $('[data-riskv]', a), desc = $('[data-desc]', a), ticks = $$('.ticks button', a);
    const C = 2 * Math.PI * 80;
    const set = (n) => {
      const p = P[n];
      input.value = n; input.style.setProperty('--p', `${(n / (P.length - 1)) * 100}%`);
      risk.style.strokeDasharray = `${(p.r / 100) * C} ${C}`;
      name.textContent = p.name; safeEl.textContent = p.sl; riskEl.textContent = p.rl; desc.textContent = p.d;
      ticks.forEach((t, k) => t.classList.toggle('on', k === n));
    };
    input.addEventListener('input', () => set(+input.value));
    ticks.forEach((t, k) => t.addEventListener('click', () => set(k)));
    set(+input.value);
  });

  /* ---------- team filter ---------- */
  $$('[data-filter]').forEach((wrap) => {
    const btns = $$('.filters button', wrap), ms = $$('.member', wrap);
    btns.forEach((b) => b.addEventListener('click', () => {
      const f = b.dataset.f;
      btns.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      ms.forEach((m) => { const show = f === 'all' || m.dataset.cat.split(' ').includes(f); if (!show) { m.classList.add('out'); setTimeout(() => m.classList.add('gone'), 220); } });
      setTimeout(() => {
        let k = 0;
        ms.forEach((m) => { const show = f === 'all' || m.dataset.cat.split(' ').includes(f); if (show) { m.classList.remove('gone'); const d = k++ * 40; setTimeout(() => m.classList.remove('out'), 20 + d); } });
      }, 230);
    }));
  });

  /* ---------- boomerang video background ---------- */
  const boom = (root) => {
    const video = $('video', root), canvas = $('canvas', root);
    if (!video || !canvas) return;
    const ctx = canvas.getContext('2d');
    const start = () => { const p = video.play(); if (p && p.catch) p.catch(() => {}); };
    if (reduce) { video.addEventListener('loadeddata', () => { try { video.currentTime = Math.min(5, (video.duration || 10) / 2); } catch (e) {} }, { once: true }); return; }
    if ('deviceMemory' in navigator && navigator.deviceMemory < 4) { video.loop = true; start(); return; }
    const capW = innerWidth < 768 ? 640 : 960, rvfc = 'requestVideoFrameCallback' in HTMLVideoElement.prototype;
    const frames = []; let last = -1, cap = true, w = 0, h = 0, vis = true;
    const sched = () => { rvfc ? video.requestVideoFrameCallback(grab) : requestAnimationFrame(grab); };
    const grab = () => {
      if (!cap) return;
      if (video.readyState >= 2 && video.videoWidth && video.currentTime !== last) {
        last = video.currentTime;
        if (!w) { w = Math.min(capW, video.videoWidth); h = Math.round(video.videoHeight * (w / video.videoWidth)); }
        const c = document.createElement('canvas'); c.width = w; c.height = h; c.getContext('2d').drawImage(video, 0, 0, w, h); frames.push(c);
      }
      sched();
    };
    video.addEventListener('play', () => { if (cap) sched(); }, { once: true });
    video.addEventListener('ended', () => {
      cap = false;
      if (frames.length < 2) { video.loop = true; start(); return; }
      canvas.width = w; canvas.height = h;
      let i = frames.length - 1, dir = -1, t0 = 0;
      ctx.drawImage(frames[i], 0, 0); video.style.display = 'none'; canvas.style.display = 'block';
      const tick = (ts) => { requestAnimationFrame(tick); if (!vis || ts - t0 < 1000 / 30) return; t0 = ts; ctx.drawImage(frames[i], 0, 0); if (i <= 0) dir = 1; else if (i >= frames.length - 1) dir = -1; i += dir; };
      requestAnimationFrame(tick);
    });
    new IntersectionObserver(([e]) => { vis = e.isIntersecting; }).observe(root);
    start();
  };
  $$('[data-boomerang]').forEach(boom);

  /* ---------- Get in touch form: opens the visitor's email app ---------- */
  const form = $('#contact-form');
  if (form) {
    const status = $('.form-status', form);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (form.hp && form.hp.value) return;
      if (!form.checkValidity()) { form.reportValidity(); status.textContent = 'Please fill in the required fields.'; status.classList.add('error'); return; }
      const n = form.fname.value.trim(), em = form.email.value.trim(), ph = form.phone.value.trim();
      status.classList.remove('error'); status.textContent = 'Opening your email app…';
      location.href = `mailto:feedback@wmuindia.com?subject=${encodeURIComponent('Website enquiry from ' + n)}&body=${encodeURIComponent(`Name: ${n}\nEmail: ${em}\nPhone: ${ph}\n\nSent from ${document.title}`)}`;
    });
  }
  const yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();
})();

/* ---------- ethos: pinned, scroll-driven ---------- */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-ethos]').forEach((root) => {
    const track = root.querySelector('.eth-track');
    const items = [...root.querySelectorAll('.eth-item')], btns = [...root.querySelectorAll('.eth-nav button')];
    const pts = [...root.querySelectorAll('.pt')], dts = [...root.querySelectorAll('.dt')];
    const rot = root.querySelector('.eth-rot'), cnt = root.querySelector('[data-eth-count]');
    const N = items.length; let cur = -1, ticking = false;
    const set = (i) => {
      if (i === cur) return; cur = i;
      items.forEach((it, k) => { it.classList.toggle('on', k === i); it.classList.toggle('out', k < i); it.setAttribute('aria-hidden', String(k !== i)); });
      btns.forEach((b, k) => { b.classList.toggle('on', k === i); b.setAttribute('aria-current', k === i ? 'step' : 'false'); });
      [pts, dts].forEach((arr) => arr.forEach((p, k) => { p.classList.toggle('on', k === i); p.classList.toggle('past', k < i); }));
      if (cnt) cnt.textContent = String(i + 1).padStart(2, '0');
    };
    const upd = () => {
      ticking = false;
      const r = track.getBoundingClientRect(), span = r.height - innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0, f = p * N;
      set(Math.min(N - 1, Math.floor(f)));
      btns.forEach((b, k) => b.style.setProperty('--f', String(Math.min(1, Math.max(0, f - k)))));
      if (rot && !reduce) rot.style.transform = `rotate(${(p * 288).toFixed(2)}deg)`;
    };
    btns.forEach((b, k) => b.addEventListener('click', () => {
      const r = track.getBoundingClientRect(), span = r.height - innerHeight;
      scrollTo({ top: scrollY + r.top + span * (k + 0.5) / N, behavior: reduce ? 'auto' : 'smooth' });
    }));
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
    addEventListener('resize', upd);
    upd();
  });
})();

/* ---------- phone micro icons: draw in once when visible ---------- */
(() => {
  const els = document.querySelectorAll('.mi');
  if (!els.length) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('on')); return; }
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } }), { threshold: 0.6 });
  els.forEach((e) => io.observe(e));
})();

/* ---------- hero shader: swirl + chroma flow + fluted glass + grain ---------- */
(() => {
  const host = document.querySelector('[data-shader]');
  if (!host) return;
  const cv = host.querySelector('canvas');
  const gl = cv.getContext('webgl', { antialias: false, premultipliedAlpha: false, alpha: false });
  if (!gl) { host.classList.add('fallback'); return; }
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const N = 24;
  const VS = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
  const FS = `precision highp float;
uniform vec2 R;uniform float T;uniform vec4 P[${N}];
const vec3 RED=vec3(.843,.098,.125);const vec3 BLUE=vec3(.235,.325,.639);
float hash(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
float swirl(vec2 q,float t){for(int i=0;i<3;i++){q+=.35*vec2(sin(q.y*2.2+t),cos(q.x*1.9-t*.8));}return .5+.5*sin(q.x*1.7+q.y*1.2);}
vec3 field(vec2 uv,float asp){
  vec2 p=vec2(uv.x*asp,uv.y);float t=T*.15;
  vec3 col=mix(vec3(.925),vec3(1.),swirl(p*1.1,t));
  vec2 a1=vec2(asp*(.72+.12*sin(t*1.2)),.70+.10*cos(t*1.0));
  vec2 a2=vec2(asp*(.92+.06*cos(t*.8)),.30+.12*sin(t*1.3));
  float sh=.55*exp(-dot(p-a1,p-a1)/.09)+.40*exp(-dot(p-a2,p-a2)/.07);
  for(int i=0;i<${N};i++){vec4 q=P[i];if(q.z<.004)continue;vec2 c=vec2(q.x*asp,q.y);sh+=q.z*.6*exp(-dot(p-c,p-c)/.02);}
  return mix(col,vec3(.80),(1.-exp(-sh*1.4))*.55);
}
void main(){
  vec2 uv=gl_FragCoord.xy/R;float asp=R.x/R.y;
  float ang=radians(31.);vec2 dir=vec2(cos(ang),sin(ang));
  float fl=dot(vec2(uv.x*asp,uv.y),dir)*8./asp;
  float pr=(fract(fl)-.5)*2.;
  float bend=pr*sqrt(max(0.,1.-pr*pr*.9));
  vec2 off=(dir/vec2(asp,1.))*bend*.03;
  vec3 A=field(uv+off,asp);vec3 B=field(uv+off*1.22,asp);
  vec3 c=vec3(B.r,A.g,A.b);
  c+=.14*smoothstep(.82,1.,1.-abs(pr-.35));
  c*=1.-.05*pow(abs(pr),6.);
  c+=(hash(gl_FragCoord.xy+fract(T)*97.)-.5)*.05;
  gl_FragColor=vec4(c,1.);
}`;
  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; };
  const vs = sh(gl.VERTEX_SHADER, VS), fs = sh(gl.FRAGMENT_SHADER, FS);
  if (!vs || !fs) { host.classList.add('fallback'); return; }
  const pg = gl.createProgram(); gl.attachShader(pg, vs); gl.attachShader(pg, fs); gl.linkProgram(pg);
  if (!gl.getProgramParameter(pg, gl.LINK_STATUS)) { host.classList.add('fallback'); return; }
  gl.useProgram(pg);
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(pg, 'a'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const uR = gl.getUniformLocation(pg, 'R'), uT = gl.getUniformLocation(pg, 'T'), uP = gl.getUniformLocation(pg, 'P');
  const pts = new Float32Array(N * 4); let head = 0;
  const small = innerWidth < 768;
  const resize = () => {
    const sc = small ? 0.55 : 0.75;
    const w = Math.max(1, Math.round(host.clientWidth * sc)), h = Math.max(1, Math.round(host.clientHeight * sc));
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; gl.viewport(0, 0, w, h); gl.uniform2f(uR, w, h); }
  };
  resize(); addEventListener('resize', resize);
  const draw = (t) => { gl.uniform1f(uT, t); gl.uniform4fv(uP, pts); gl.drawArrays(gl.TRIANGLES, 0, 3); };
  if (reduce) { draw(8); return; }
  let tx = -1, ty = -1, px = -1, py = -1, vis = true, raf = 0, last = 0;
  const feed = (cx, cy) => {
    const r = host.getBoundingClientRect();
    const x = (cx - r.left) / r.width, y = 1 - (cy - r.top) / r.height;
    if (x < 0 || x > 1 || y < 0 || y > 1) return;
    tx = x; ty = y; if (px < 0) { px = x; py = y; }
  };
  addEventListener('pointermove', (e) => feed(e.clientX, e.clientY), { passive: true });
  addEventListener('touchmove', (e) => { const t = e.touches[0]; if (t) feed(t.clientX, t.clientY); }, { passive: true });
  const t0 = performance.now();
  const frame = (now) => {
    raf = requestAnimationFrame(frame);
    if (!vis || document.hidden) return;
    if (small && now - last < 32) return;
    last = now;
    for (let i = 0; i < N; i++) pts[i * 4 + 2] *= 0.975;
    if (tx >= 0) {
      const nx = px + (tx - px) * 0.18, ny = py + (ty - py) * 0.18;
      const dx = nx - px, dy = ny - py, sp = Math.hypot(dx, dy);
      if (sp > 0.0008) {
        const o = head * 4; pts[o] = nx; pts[o + 1] = ny; pts[o + 2] = Math.min(0.9, sp * 40); pts[o + 3] = Math.abs(dy) / (Math.abs(dx) + Math.abs(dy) + 1e-5);
        head = (head + 1) % N;
      }
      px = nx; py = ny;
    }
    draw((now - t0) / 1000);
  };
  new IntersectionObserver(([e]) => { vis = e.isIntersecting; }).observe(host);
  raf = requestAnimationFrame(frame);
})();
