(() => {
  const data = window.SALES_DATA;
  const faq = document.querySelector('#faq-list');
  data.faq.forEach(([question, answer], index) => {
    const item = document.createElement('details');
    item.className = 'faq-item reveal';
    item.innerHTML = `<summary><span>${question}</span><b aria-hidden="true">+</b></summary><div class="faq-answer"><p>${answer}</p></div>`;
    item.addEventListener('toggle', () => {
      item.querySelector('summary b').textContent = item.open ? '−' : '+';
    });
    faq.append(item);
  });

  document.querySelectorAll('[data-checkout]').forEach(link => {
    link.href = data.checkout;
    link.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('mjv:initiate-checkout', { detail: { source: link.textContent.trim() } }));
      if (typeof window.fbq === 'function') window.fbq('track', 'InitiateCheckout');
    });
  });

  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .12, rootMargin: '0px 0px -5% 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }
})();
