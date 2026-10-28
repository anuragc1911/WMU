/* Subtle wireframe decorations: globe, cube, perspective grid. Pause off-screen. */
(() => {
  const GLOBE = "<svg viewBox=\"-120 -120 240 240\"><g class=\"tilt\"><circle cx=\"0\" cy=\"0\" r=\"100\"/><ellipse cx=\"0\" cy=\"-75\" rx=\"66.1\" ry=\"9.3\"/><ellipse cx=\"0\" cy=\"-50\" rx=\"86.6\" ry=\"12.1\"/><ellipse cx=\"0\" cy=\"-25\" rx=\"96.8\" ry=\"13.6\"/><ellipse cx=\"0\" cy=\"0\" rx=\"100.0\" ry=\"14.0\"/><ellipse cx=\"0\" cy=\"25\" rx=\"96.8\" ry=\"13.6\"/><ellipse cx=\"0\" cy=\"50\" rx=\"86.6\" ry=\"12.1\"/><ellipse cx=\"0\" cy=\"75\" rx=\"66.1\" ry=\"9.3\"/><ellipse class=\"mer\" cx=\"0\" cy=\"0\" rx=\"100\" ry=\"100\" style=\"animation-delay:0.00s\"/><ellipse class=\"mer\" cx=\"0\" cy=\"0\" rx=\"100\" ry=\"100\" style=\"animation-delay:-2.44s\"/><ellipse class=\"mer\" cx=\"0\" cy=\"0\" rx=\"100\" ry=\"100\" style=\"animation-delay:-4.89s\"/><ellipse class=\"mer\" cx=\"0\" cy=\"0\" rx=\"100\" ry=\"100\" style=\"animation-delay:-7.33s\"/><ellipse class=\"mer\" cx=\"0\" cy=\"0\" rx=\"100\" ry=\"100\" style=\"animation-delay:-9.78s\"/><ellipse class=\"mer\" cx=\"0\" cy=\"0\" rx=\"100\" ry=\"100\" style=\"animation-delay:-12.22s\"/><ellipse class=\"mer\" cx=\"0\" cy=\"0\" rx=\"100\" ry=\"100\" style=\"animation-delay:-14.67s\"/><ellipse class=\"mer\" cx=\"0\" cy=\"0\" rx=\"100\" ry=\"100\" style=\"animation-delay:-17.11s\"/><ellipse class=\"mer\" cx=\"0\" cy=\"0\" rx=\"100\" ry=\"100\" style=\"animation-delay:-19.56s\"/></g><ellipse class=\"orbit\" cx=\"0\" cy=\"0\" rx=\"116\" ry=\"116\"/></svg>";
  const CUBE = "<div class=\"cube\"><i></i><i></i><i></i><i></i><i></i><i></i></div><div class=\"cube inner\"><i></i><i></i><i></i><i></i><i></i><i></i></div>";
  const seen = new Set();
  const mk = (cls, html) => { const d = document.createElement('div'); d.className = 'wf ' + cls; d.setAttribute('aria-hidden', 'true'); d.innerHTML = html; return d; };
  const add = (sec, cls, html) => { if (!sec || seen.has(sec)) return; seen.add(sec); sec.classList.add('wf-host'); sec.prepend(mk(cls, html)); };
  const $$ = (s) => [...document.querySelectorAll(s)];
  $$('.statement').forEach((el) => add(el.closest('section'), 'wf-globe', GLOBE));
  $$('section.t-red').forEach((s) => add(s, 'wf-globe wf-light', GLOBE));
  $$('section.t-blue').forEach((s) => add(s, 'wf-grid', '<div class="wf-plane"></div>'));
  ['#services', '#approach', '#advantages', '#founders'].forEach((id) => { const s = document.querySelector('section' + id); if (s && !s.classList.contains('svc')) add(s, 'wf-cube', CUBE); });
  const pipeStats = document.querySelector('section.stats'); if (pipeStats) add(pipeStats, 'wf-globe', GLOBE);
  const banner = document.querySelector('.banner'); if (banner) { banner.style.position = 'relative'; banner.style.overflow = 'hidden'; banner.appendChild(mk('wf-grid', '<div class="wf-plane"></div>')); }
  const stage = document.querySelector('.svc .stage'); if (stage) { stage.style.position = 'relative'; stage.appendChild(mk('wf-cube wf-light sm', CUBE)); }
  const contact = document.querySelector('section#contact'); if (contact) add(contact, 'wf-cube sm', CUBE);
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle('paused', !e.isIntersecting)), { rootMargin: '100px' });
    document.querySelectorAll('.wf').forEach((w) => io.observe(w));
  }
})();
