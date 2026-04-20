(function () {
  'use strict';

  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 12) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  document.querySelectorAll('[data-scroll]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('data-scroll');
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  const form = document.getElementById('contact-form');
  const done = document.getElementById('contact-done');
  const submitBtn = document.getElementById('submit-btn');
  const resetBtn = document.getElementById('reset-btn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const entity = (data.get('entity') || '').toString().trim();
    if (!name || !email || !entity) {
      form.reportValidity();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting…';
    submitBtn.style.cursor = 'wait';

    setTimeout(() => {
      document.getElementById('done-name').textContent = name.split(' ')[0] || 'there';
      document.getElementById('done-entity').textContent = entity;
      document.getElementById('done-email').textContent = email;
      document.getElementById('done-ref').textContent =
        'HG-' + Math.floor(Math.random() * 900000 + 100000);
      document.getElementById('done-date').textContent = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });

      form.classList.add('hidden');
      done.classList.remove('hidden');
    }, 900);
  });

  resetBtn.addEventListener('click', () => {
    form.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit enquiry →';
    submitBtn.style.cursor = 'pointer';
    done.classList.add('hidden');
    form.classList.remove('hidden');
  });
})();
