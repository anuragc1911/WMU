(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile menu
  const header = document.getElementById('header');
  const burger = header.querySelector('.burger');
  burger.addEventListener('click', () => {
    const open = header.classList.toggle('nav-open');
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  header.querySelectorAll('.mobile-panel a').forEach((a) =>
    a.addEventListener('click', () => {
      header.classList.remove('nav-open');
      burger.setAttribute('aria-expanded', 'false');
    })
  );

  // Reveal on scroll
  const items = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    items.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 70}ms`;
      io.observe(el);
    });
  } else {
    items.forEach((el) => el.classList.add('in'));
  }

  // Seamless marquee: duplicate the track once
  const track = document.getElementById('marquee');
  if (track) {
    [...track.children].forEach((n) => {
      const c = n.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      track.appendChild(c);
    });
  }

  // Carousel arrows
  const carousel = document.getElementById('carousel');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const step = () => (carousel.querySelector('.card')?.offsetWidth || 300) + 8;
  const sync = () => {
    prev.disabled = carousel.scrollLeft <= 2;
    next.disabled = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 2;
  };
  prev.addEventListener('click', () => carousel.scrollBy({ left: -step(), behavior: 'smooth' }));
  next.addEventListener('click', () => carousel.scrollBy({ left: step(), behavior: 'smooth' }));
  carousel.addEventListener('scroll', sync, { passive: true });
  window.addEventListener('resize', sync);
  sync();

  // Hero "Know More" typing loop through the asset classes
  const typed = document.getElementById('typed');
  const words = ['Equities', 'Fixed Income', 'Property', 'Commodities', 'Private Equity', 'Derivatives', 'Insurance'];
  if (typed && !reduce) {
    let w = 0, i = words[0].length, deleting = true;
    const tick = () => {
      const word = words[w];
      if (deleting) {
        i--;
        if (i <= 0) { deleting = false; w = (w + 1) % words.length; }
      } else {
        i++;
        if (i >= words[w].length) { deleting = true; typed.textContent = words[w]; return setTimeout(tick, 1800); }
      }
      typed.textContent = (deleting ? word : words[w]).slice(0, Math.max(i, 0));
      setTimeout(tick, deleting ? 45 : 80);
    };
    setTimeout(tick, 2200);
  }

  // Footer year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
