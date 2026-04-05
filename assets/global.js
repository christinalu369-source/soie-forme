/* ============================================================
   GLOBAL.JS — Shared behaviours across all pages
   Soie & Forme Shopify Theme
   ============================================================ */

(function () {
  'use strict';

  /* ── CUSTOM CURSOR ── */
  const cursor     = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursor-ring');

  if (cursor && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;
    let rafId  = null;

    /* Dot tracks mouse immediately */
    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';

      /* Make visible on first mouse move */
      if (!document.body.classList.contains('cursor-visible')) {
        document.body.classList.add('cursor-visible');
      }
    });

    /* Ring follows with lerp */
    function animateRing() {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top  = ringY + 'px';
      rafId = requestAnimationFrame(animateRing);
    }
    animateRing();

    /* Hover state on interactive elements */
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest('a, button, [role="button"], input, textarea, select, label')) {
        document.body.classList.add('cursor-hover');
      }
    });

    document.addEventListener('mouseout', function (e) {
      if (e.target.closest('a, button, [role="button"], input, textarea, select, label')) {
        document.body.classList.remove('cursor-hover');
      }
    });

    /* Hide cursor when mouse leaves window */
    document.addEventListener('mouseleave', function () {
      document.body.classList.remove('cursor-visible');
    });

    document.addEventListener('mouseenter', function () {
      document.body.classList.add('cursor-visible');
    });
  }


  /* ── SCROLL REVEAL ── */
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    /* Fallback: just show everything */
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }


  /* ── NAV SCROLL STATE ── */
  /* Applied to pages that have a #site-nav element */
  const siteNav = document.getElementById('site-nav');

  if (siteNav) {
    function updateNav() {
      siteNav.classList.toggle('scrolled', window.scrollY > 60);
    }
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

})();
