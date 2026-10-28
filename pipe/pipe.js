(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // menu
  const burger = $('.burger');
  burger.addEventListener('click', () => { const o = document.body.classList.toggle('open'); burger.setAttribute('aria-expanded', o); });
  $$('.mmenu a').forEach((a) => a.addEventListener('click', () => document.body.classList.remove('open')));
  // reveal
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  $$('.rv').forEach((el, i) => { el.style.transitionDelay = (Math.min(i % 4, 3) * 70) + 'ms'; reduce ? el.classList.add('in') : io.observe(el); });
  // active nav link
  const links = $$('.links a');
  const so = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) links.forEach((l) => l.classList.toggle('on', l.getAttribute('href') === '#' + e.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
  ['services', 'approach', 'mix', 'people', 'awards'].forEach((id) => { const s = document.getElementById(id); if (s) so.observe(s); });
  // swap helper
  const swap = (els, fn) => { els.forEach((e) => e.style.opacity = 0); setTimeout(() => { fn(); els.forEach((e) => e.style.opacity = 1); }, 220); };
  // services
  const SV = [
    ['Private wealth management', 'Comprehensive asset management, centred on you.', 'A detailed financial plan, strategic and tactical allocation, investment selection, risk management and one clear report.', '../private-wealth-management.html'],
    ['Family office', 'Beyond traditional asset management.', 'For families with large corpuses and complex ownership — governance, succession, tax and consolidated reporting.', '../family-office.html'],
    ['Investment banking', 'Buy side and sell side.', 'Private equity, debt raising, capital market advisory, special situations and advisory services.', '../investment-banking.html'],
  ];
  const svc = $('[data-svc]');
  if (svc) {
    const cards = $$('.card', $('.stack', svc)), tabs = $$('.tabs button', svc);
    let cur = 0, hold = false;
    const set = (k) => {
      if (k === cur) return; cur = k;
      cards.forEach((c, i) => c.classList.toggle('on', i === k));
      tabs.forEach((t, i) => { t.classList.toggle('on', i === k); t.setAttribute('aria-selected', i === k); });
      $('[data-svc-count]', svc).textContent = '0' + (k + 1);
      swap([$('[data-svc-name]', svc), $('[data-svc-lead]', svc), $('[data-svc-desc]', svc)], () => {
        $('[data-svc-name]', svc).textContent = SV[k][0]; $('[data-svc-lead]', svc).textContent = SV[k][1]; $('[data-svc-desc]', svc).textContent = SV[k][2]; $('[data-svc-link]', svc).href = SV[k][3];
      });
    };
    tabs.forEach((t, i) => t.addEventListener('click', () => { hold = true; set(i); }));
    let vis = false; new IntersectionObserver(([e]) => vis = e.isIntersecting).observe(svc);
    if (!reduce) setInterval(() => { if (vis && !hold) set((cur + 1) % 3); }, 5000);
  }
  // ethos
  const ET = [['Sarve jana sukhino bhavanthu', 'May all the people in the world be happy'], ['Sarva Dharma Samanwaya', 'May all humans be treated equally'], ['Ahimso Paramo Dharma', 'Non-violence is the highest duty'], ['Satyameva Jayathe', 'Let the truth alone succeed'], ['Jana Seva, Janardhana Seva', 'Service of the masses is worship of the Lord']];
  const eth = $('[data-ethos]');
  if (eth) {
    const dots = $$('.dots button', eth); let cur = 0, hold = false;
    const set = (k) => { cur = k; dots.forEach((d, i) => d.classList.toggle('on', i === k)); swap([$('[data-eq]', eth), $('[data-et]', eth)], () => { $('[data-eq]', eth).textContent = '“' + ET[k][0] + '”'; $('[data-et]', eth).textContent = ET[k][1]; $('[data-en]', eth).textContent = '0' + (k + 1); }); };
    dots.forEach((d, i) => d.addEventListener('click', () => { hold = true; set(i); }));
    let vis = false; new IntersectionObserver(([e]) => vis = e.isIntersecting).observe(eth);
    if (!reduce) setInterval(() => { if (vis && !hold) set((cur + 1) % 5); }, 4500);
  }
  // allocation
  const P = [['Conservative', 0, '100%'], ['Moderately conservative', 25, '70–80%'], ['Moderately aggressive', 50, '50%'], ['Aggressive', 70, '30%'], ['Very aggressive', 100, '0%']];
  const mix = $('[data-mix]');
  if (mix) {
    const r = $('input', mix);
    const upd = () => { const p = P[+r.value]; $('[data-risk]', mix).textContent = (p[0] === 'Moderately conservative' ? '20–30' : p[1]) + '%'; $('[data-name]', mix).textContent = p[0]; $('[data-safe]', mix).textContent = p[2]; $('[data-riskbar]', mix).style.width = p[1] + '%'; $('[data-safebar]', mix).style.width = (100 - p[1]) + '%'; };
    r.addEventListener('input', upd); upd();
  }
  // founders
  const F = [['Jay Prakash Pai', '25 years in private banking. Headed HSBC Private Banking for Southern India; earlier at Deutsche Bank Private Wealth Management.', 'Founder & CEO', '../assets/people/jay.jpg'], ['Kavitha Jayaram', '13 years at HSBC across operations, compliance and HSBC Private Banking client services. Heads operations at WMU.', 'Co-founder & COO', '../assets/people/kavitha.jpg']];
  const fd = $('[data-founders]');
  if (fd) {
    const btns = $$('.ftabs button', fd), img = $('[data-fimg]');
    btns.forEach((b, k) => b.addEventListener('click', () => { btns.forEach((x, i) => x.classList.toggle('on', i === k)); swap([$('[data-fname]', fd), $('[data-fline]', fd), $('[data-frole]', fd), img], () => { $('[data-fname]', fd).textContent = F[k][0]; $('[data-fline]', fd).textContent = F[k][1]; $('[data-frole]', fd).textContent = F[k][2]; img.src = F[k][3]; img.alt = F[k][0]; }); }));
  }
  // form
  const f = $('#cf');
  f.addEventListener('submit', (e) => {
    e.preventDefault(); const st = $('.status', f);
    if (f.hp.value) return;
    if (!f.checkValidity()) { f.reportValidity(); st.textContent = 'Please fill in every field.'; return; }
    st.textContent = 'Opening your email app…';
    location.href = 'mailto:feedback@wmuindia.com?subject=' + encodeURIComponent('Website enquiry from ' + f.fname.value.trim()) + '&body=' + encodeURIComponent('Name: ' + f.fname.value.trim() + '\nEmail: ' + f.email.value.trim() + '\nPhone: ' + f.phone.value.trim());
  });
  $('#yr').textContent = new Date().getFullYear();
})();

/* refinements: keyboard tabs + pause autoplay on hover/focus */
(() => {
  const tabs = [...document.querySelectorAll('.tabs button')];
  tabs.forEach((t, i) => t.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const n = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
    n.focus(); n.click();
  }));
  const svc = document.querySelector('[data-svc]');
  if (svc) ['mouseenter', 'focusin'].forEach((ev) => svc.addEventListener(ev, () => { const t = tabs.find((x) => x.classList.contains('on')); if (t) t.click(); }, { once: true }));
})();
