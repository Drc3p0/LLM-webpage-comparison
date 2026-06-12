(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initCardKeyboard() {
    const cards = document.querySelectorAll('.gallery-card');
    cards.forEach(function (card) {
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });
  }

  function initGalleryModal() {
    const overlay = document.createElement('div');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Image viewer');
    overlay.setAttribute('tabindex', '-1');
    overlay.id = 'lightbox-overlay';

    const overlayStyle = overlay.style;
    overlayStyle.cssText = [
      'display:none',
      'position:fixed',
      'inset:0',
      'z-index:9999',
      'background:rgba(10,10,18,0.96)',
      'align-items:center',
      'justify-content:center',
      'padding:1.5rem',
      'cursor:zoom-out',
    ].join(';');

    const imgEl = document.createElement('img');
    imgEl.id = 'lightbox-img';
    imgEl.alt = '';
    imgEl.style.cssText = [
      'max-width:90vw',
      'max-height:88vh',
      'object-fit:contain',
      'border:1px solid #2a1f4a',
      'display:block',
    ].join(';');

    const caption = document.createElement('p');
    caption.id = 'lightbox-caption';
    caption.style.cssText = [
      'position:absolute',
      'bottom:1.5rem',
      'left:50%',
      'transform:translateX(-50%)',
      'font-family:Courier New,Courier,monospace',
      'font-size:0.72rem',
      'letter-spacing:0.1em',
      'color:#8a7aab',
      'text-align:center',
      'pointer-events:none',
      'white-space:nowrap',
    ].join(';');

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'CLOSE [ESC]';
    closeBtn.setAttribute('aria-label', 'Close image viewer');
    closeBtn.style.cssText = [
      'position:absolute',
      'top:1.2rem',
      'right:1.5rem',
      'background:transparent',
      'border:1px solid #5a3fa0',
      'color:#b57bee',
      'font-family:Courier New,Courier,monospace',
      'font-size:0.7rem',
      'letter-spacing:0.12em',
      'padding:0.4rem 0.9rem',
      'cursor:pointer',
    ].join(';');

    overlay.appendChild(imgEl);
    overlay.appendChild(caption);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);

    let lastFocused = null;

    function openLightbox(src, alt, title) {
      if (!src) return;
      lastFocused = document.activeElement;
      imgEl.src = src;
      imgEl.alt = alt || '';
      caption.textContent = title || '';
      overlay.style.display = 'flex';
      overlay.focus();
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      overlay.style.display = 'none';
      imgEl.src = '';
      document.body.style.overflow = '';
      if (lastFocused) { lastFocused.focus(); }
    }

    const cards = document.querySelectorAll('.gallery-card');
    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        const img = card.querySelector('.card-img');
        if (!img || img.style.display === 'none') return;
        const title = card.querySelector('.card-title');
        openLightbox(img.src, img.alt, title ? title.textContent : '');
      });
    });

    closeBtn.addEventListener('click', closeLightbox);

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) { closeLightbox(); }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.style.display !== 'none') {
        closeLightbox();
      }
    });
  }

  function initScanLineFlicker() {
    if (prefersReducedMotion) return;
    const scanLine = document.querySelector('.scan-line');
    if (!scanLine) return;
  }

  function initCardEntrance() {
    if (prefersReducedMotion) return;
    if (!('IntersectionObserver' in window)) return;

    const cards = document.querySelectorAll('.gallery-card');
    cards.forEach(function (card) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.45s ease, transform 0.45s ease, border-color 0.2s ease, background 0.2s ease';
    });

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    cards.forEach(function (card) { observer.observe(card); });
  }

  function init() {
    initCardKeyboard();
    initGalleryModal();
    initScanLineFlicker();
    initCardEntrance();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
