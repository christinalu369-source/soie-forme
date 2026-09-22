/* ============================================================
   SECTION-SILK-STORY.JS — "A Story in Silk"
   Scroll-driven cross-fade between full-bleed scenes,
   filmstrip progress, and soft add-to-cart.
   ============================================================ */

(function () {
  'use strict';

  const story = document.querySelector('.silk-story');
  if (!story) return; /* Not on the story page */

  const scenes = Array.from(story.querySelectorAll('.silk-story__scene'));
  const ticks  = Array.from(story.querySelectorAll('.silk-story__tick'));
  const steps  = Array.from(story.querySelectorAll('.silk-story__step'));
  const toast  = story.querySelector('.silk-story__toast');

  if (scenes.length === 0) return;


  /* ── CROSS-FADE ENGINE ──
     `frac` is the scroll position measured in steps (a float). Scene i is
     fully opaque when frac === i and fades out over one step either side. */
  let ticking = false;

  function frame() {
    ticking = false;

    const stepHeight = window.innerHeight || document.documentElement.clientHeight;
    const frac       = window.scrollY / stepHeight;

    scenes.forEach(function (scene, i) {
      const distance = Math.min(1, Math.abs(i - frac)); /* 0 = centred, 1 = a full step away */
      const isNear   = distance < 0.5;

      scene.style.opacity = (1 - distance).toFixed(3);
      scene.style.zIndex  = isNear ? 3 : 2;
      /* A whisper of scale so the outgoing scene drifts rather than just fading */
      scene.style.setProperty('--scene-scale', (1 + distance * 0.03).toFixed(3));
      scene.classList.toggle('is-active', isNear);

      /* Only the scene on screen plays. Videos are preload="none", so nothing
         downloads until its scene is reached — four background videos would
         otherwise be a punishing mobile page load. */
      setScenePlayback(scene, isNear);

      /* Keep faded-out scenes out of the tab order and the accessibility tree.
         Without this, buttons in invisible scenes are still focusable. */
      if (isNear) {
        scene.removeAttribute('inert');
        scene.removeAttribute('aria-hidden');
      } else {
        scene.setAttribute('inert', '');
        scene.setAttribute('aria-hidden', 'true');
      }
    });

    const currentIndex = Math.round(frac);
    ticks.forEach(function (tick, i) {
      const active = i === currentIndex;
      tick.classList.toggle('is-active', active);
      if (active) {
        tick.setAttribute('aria-current', 'true');
      } else {
        tick.removeAttribute('aria-current');
      }
    });
  }

  /* Start or stop a scene's video. play() rejects when a browser blocks
     autoplay; the poster frame simply stays up, so the catch is quiet. */
  function setScenePlayback(scene, shouldPlay) {
    const video = scene.querySelector('.silk-story__video');
    if (!video) return;

    if (shouldPlay) {
      if (video.paused) {
        video.play().catch(function () { /* poster frame remains */ });
      }
    } else if (!video.paused) {
      video.pause();
    }
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(frame);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  frame();


  /* ── FILMSTRIP NAVIGATION ── */
  ticks.forEach(function (tick, i) {
    tick.addEventListener('click', function () {
      const step = steps[i];
      if (step) step.scrollIntoView({ behavior: 'smooth' });
    });
  });


  /* ── TOAST ── */
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('is-visible');
    toastTimer = setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 2600);
  }


  /* ── SOFT ADD TO CART ──
     Scenes whose product has a single available variant add straight to the
     cart. Everything else is rendered as a link to the product page in Liquid,
     so it never reaches this handler. */
  story.addEventListener('click', function (event) {
    const button = event.target.closest('.silk-story__shop[data-variant-id]');
    if (!button) return;

    const variantId = parseInt(button.getAttribute('data-variant-id'), 10);
    if (!variantId) return;

    const label = button.querySelector('.silk-story__shop-label');
    const originalText = label ? label.textContent : '';

    button.disabled = true;
    if (label) label.textContent = 'Adding…';

    fetch('/cart/add.js', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body:    JSON.stringify({ id: variantId, quantity: 1 })
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Cart error');
        return res.json();
      })
      .then(function () {
        showToast('Added — ' + (button.getAttribute('data-product-title') || 'your piece'));
        if (label) label.textContent = originalText;
        button.disabled = false;
        updateCartCount();
      })
      .catch(function () {
        showToast('Could not add that just now. Please try again.');
        if (label) label.textContent = originalText;
        button.disabled = false;
      });
  });


  /* Mirror the nav cart badge used elsewhere in the theme, when present */
  function updateCartCount() {
    fetch('/cart.js')
      .then(function (res) { return res.json(); })
      .then(function (cart) {
        const countEl = document.querySelector('.nav-cart__count');
        if (countEl && cart.item_count > 0) {
          countEl.textContent = cart.item_count;
        }
      })
      .catch(function () { /* badge is cosmetic — ignore failures */ });
  }

})();
