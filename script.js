(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile menu
  const header = document.getElementById('header');
  const burger = header && header.querySelector('.burger');
  if (burger) {
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
  }

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

  // Seamless marquees: duplicate each track once
  document.querySelectorAll('.marquee-track').forEach((track) => {
    [...track.children].forEach((n) => {
      const c = n.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      track.appendChild(c);
    });
  });

  // Carousels with prev / next arrows
  document.querySelectorAll('[data-carousel]').forEach((wrap) => {
    const carousel = wrap.querySelector('.carousel');
    const prev = wrap.querySelector('[data-prev]');
    const next = wrap.querySelector('[data-next]');
    if (!carousel || !prev || !next) return;
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
  });

  // Hero "Know More" typing loop
  const typed = document.querySelector('[data-words]');
  if (typed && !reduce) {
    let words;
    try { words = JSON.parse(typed.dataset.words); } catch (e) { words = []; }
    if (words.length > 1) {
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
        setTimeout(tick, deleting ? 40 : 75);
      };
      setTimeout(tick, 2200);
    }
  }

  // Get in Touch form: opens the visitor's email app addressed to WMU
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
      const name = form.fname.value.trim();
      const email = form.email.value.trim();
      const phone = form.phone.value.trim();
      const subject = `Website enquiry from ${name}`;
      const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nSent from the Get in Touch form (${document.title}).`;
      status.classList.remove('error');
      status.textContent = 'Opening your email app with your details…';
      window.location.href = `mailto:feedback@wmuindia.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  // Footer year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
