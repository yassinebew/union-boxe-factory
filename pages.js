// pages.js — Script for inner pages (no scroll-based section tracking)

// Nav scroll shadow (same behaviour as main.js)
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.style.borderBottomColor = window.scrollY > 50
    ? 'rgba(139,26,26,0.4)'
    : 'rgba(139,26,26,0.22)';
});

// Set active link by filename
const currentFile = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__links a').forEach(a => {
  if (a.getAttribute('href') === currentFile) a.classList.add('active');
});

// Mobile burger (identical to main.js)
const burger = document.querySelector('.nav__burger');
const navLinksEl = document.querySelector('.nav__links');
let menuOpen = false;
burger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  if (menuOpen) {
    navLinksEl.style.cssText = `
      display:flex;flex-direction:column;
      position:fixed;top:62px;left:0;right:0;
      background:rgba(19,9,8,0.99);
      padding:28px 32px 36px;gap:22px;
      border-top:1px solid rgba(139,26,26,0.3);z-index:99;
    `;
    const s = burger.querySelectorAll('span');
    s[0].style.transform = 'rotate(45deg) translate(5px, 4.5px)';
    s[1].style.opacity = '0';
    s[2].style.transform = 'rotate(-45deg) translate(5px, -4.5px)';
  } else {
    navLinksEl.removeAttribute('style');
    burger.querySelectorAll('span').forEach(s => s.removeAttribute('style'));
  }
});
navLinksEl.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    if (!menuOpen) return;
    menuOpen = false;
    navLinksEl.removeAttribute('style');
    burger.querySelectorAll('span').forEach(s => s.removeAttribute('style'));
  });
});

// Fade-in (same as main.js)
const fadeEls = document.querySelectorAll('.values__item, .prog-card, .cta__text, .cta__actions, .quote-section blockquote');
fadeEls.forEach((el, i) => {
  el.dataset.fadeIndex = i;
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
});
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = (parseInt(entry.target.dataset.fadeIndex) % 4) * 80;
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, delay);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0, rootMargin: '0px 0px -40px 0px' });
fadeEls.forEach(el => fadeObserver.observe(el));
