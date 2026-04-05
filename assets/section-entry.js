/* ============================================================
   SECTION-ENTRY.JS — Modal interactions for the entry page
   Open / close / keyboard / focus-trap
   ============================================================ */

(function () {
  'use strict';

  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return; /* Not on the entry page */

  const modals  = document.querySelectorAll('.modal[data-modal-id]');
  let   current = null; /* Currently open modal */

  /* ── OPEN ── */
  function openModal(id) {
    const target = document.querySelector('.modal[data-modal-id="' + id + '"]');
    if (!target) return;

    /* Close any already-open modal without animation delay */
    if (current && current !== target) {
      current.classList.remove('is-open');
      current = null;
    }

    current = target;
    overlay.classList.add('is-open');
    target.classList.add('is-open');

    /* Prevent body scroll */
    document.body.style.overflow = 'hidden';

    /* Move focus into modal */
    const firstFocusable = target.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (firstFocusable) {
      setTimeout(function () { firstFocusable.focus(); }, 50);
    }
  }

  /* ── CLOSE ── */
  function closeModal() {
    if (!current) return;

    overlay.classList.remove('is-open');
    current.classList.remove('is-open');
    current = null;

    document.body.style.overflow = '';
  }

  /* ── NAV BUTTONS ── */
  document.querySelectorAll('[data-opens-modal]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openModal(btn.getAttribute('data-opens-modal'));
    });
  });

  /* ── CLOSE TRIGGERS ── */
  /* × button inside each modal */
  document.querySelectorAll('.modal-close').forEach(function (btn) {
    btn.addEventListener('click', closeModal);
  });

  /* Click on the overlay itself */
  overlay.addEventListener('click', closeModal);

  /* Escape key */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && current) {
      closeModal();
    }
  });

  /* ── FOCUS TRAP ── */
  /* Keep Tab and Shift+Tab cycling within the open modal */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab' || !current) return;

    const focusable = Array.from(
      current.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

})();
