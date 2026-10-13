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
      { rootMargin: '0px 0px -6% 0px', threshold: 0.06 }
    );
    items.forEach((el, i) => { el.style.transitionDelay = `${(i % 3) * 60}ms`; io.observe(el); });
  } else {
    items.forEach((el) => el.classList.add('in'));
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

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
