(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('scrolled', scrollY > 8); onScroll(); addEventListener('scroll', onScroll, { passive: true });
  const burger = $('.burger');
  burger.addEventListener('click', () => { const o = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', o); });
  $$('.mmenu a').forEach((a) => a.addEventListener('click', () => nav.classList.remove('open')));
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  $$('.rv').forEach((el) => { const sib = [...el.parentElement.children].filter((c) => c.classList.contains('rv')).indexOf(el); el.style.transitionDelay = Math.min(sib, 5) * 70 + 'ms'; reduce ? el.classList.add('in') : io.observe(el); });
  const links = $$('.links a');
  const so = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) links.forEach((l) => l.classList.toggle('on', l.getAttribute('href') === '#' + e.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
  ['services', 'approach', 'mix', 'people', 'awards'].forEach((id) => { const s = document.getElementById(id); if (s) so.observe(s); });
  const swap = (els, fn) => { els.forEach((e) => e.style.opacity = 0); setTimeout(() => { fn(); els.forEach((e) => e.style.opacity = 1); }, 200); };
  // allocation
  const P = [['Conservative', 0, '100%'], ['Moderately conservative', 25, '70–80%'], ['Moderately aggressive', 50, '50%'], ['Aggressive', 70, '30%'], ['Very aggressive', 100, '0%']];
  const mix = $('[data-mix]');
  if (mix) {
    const r = $('input', mix), arc = $('[data-arc]', mix), C = 2 * Math.PI * 46;
    const upd = () => {
      const k = +r.value, p = P[k], risk = p[0] === 'Moderately conservative' ? '20–30%' : p[1] + '%';
      $('[data-risk]', mix).textContent = risk; $('[data-risk2]', mix).textContent = risk; $('[data-name]', mix).textContent = p[0]; $('[data-safe]', mix).textContent = p[2];
      arc.style.strokeDasharray = (p[1] / 100) * C + ' ' + C; r.style.setProperty('--p', (k / 4) * 100 + '%');
    };
    r.addEventListener('input', upd); upd();
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
  // founders
  const F = [['Jay Prakash Pai', '25 years in private banking. Headed HSBC Private Banking for Southern India; earlier at Deutsche Bank Private Wealth Management.', 'Founder & CEO', '../assets/people/jay.jpg'], ['Kavitha Jayaram', '13 years at HSBC across operations, compliance and HSBC Private Banking client services. Heads operations at WMU.', 'Co-founder & COO', '../assets/people/kavitha.jpg']];
  const fd = $('[data-founders]');
  if (fd) {
    const btns = $$('.seg button', fd), img = $('[data-fimg]', fd);
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
