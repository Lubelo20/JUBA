// Navbar scroll shadow
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// Mobile hamburger toggle
const hamburger = document.getElementById('hamburger');
if (hamburger && navbar) {
  hamburger.addEventListener('click', () => {
    const open = navbar.classList.toggle('menu-open');
    hamburger.setAttribute('aria-expanded', String(open));
  });
}

// Close mobile menu on any link click inside it
document.querySelectorAll('.nav-mobile a').forEach(link => {
  link.addEventListener('click', () => {
    if (!navbar) return;
    navbar.classList.remove('menu-open');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Active nav link — match current filename
const currentFile = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentFile || (href === 'index.html' && currentFile === '')) {
    link.classList.add('active');
  }
});

// Fade-up IntersectionObserver
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

// Contact enquiry form (progressive enhancement over a Formspree action)
const form = document.getElementById('enquiry-form');
if (form) {
  const status = document.getElementById('form-status');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = '';
    status.className = 'form-status';
    const data = new FormData(form);
    if (!data.get('name') || !data.get('email') || !data.get('message')) {
      status.textContent = 'Please complete all required fields.';
      status.classList.add('err');
      return;
    }
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        form.reset();
        status.textContent = 'Thank you — we\'ll get back to you within one business day.';
        status.classList.add('ok');
      } else {
        status.textContent = 'Something went wrong. Please email us directly at skhathi@jubasda.co.za.';
        status.classList.add('err');
      }
    } catch (err) {
      status.textContent = 'Something went wrong. Please email us directly at skhathi@jubasda.co.za.';
      status.classList.add('err');
    }
  });
}
