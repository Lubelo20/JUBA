// Navbar scroll shadow
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// Mobile hamburger toggle
const hamburger = document.getElementById('hamburger');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navbar.classList.toggle('menu-open');
  });
}

// Close mobile menu on any link click inside it
document.querySelectorAll('.nav-mobile a').forEach(link => {
  link.addEventListener('click', () => navbar.classList.remove('menu-open'));
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
