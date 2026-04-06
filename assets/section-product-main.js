/* ============================================================
   SECTION-PRODUCT-MAIN.JS — Product page interactions
   Gallery switching, variant selection, AJAX add to cart
   ============================================================ */

(function () {
  'use strict';

  const productPage = document.querySelector('[data-product-id]');
  if (!productPage) return;

  /* ── READ PRODUCT DATA ── */
  const productDataEl = document.getElementById('product-json');
  if (!productDataEl) return;
  const productData = JSON.parse(productDataEl.textContent);

  /* Build a variant lookup map: "value1 / value2 / value3" → variant object */
  const variantMap = {};
  productData.variants.forEach(function (v) {
    variantMap[v.id] = v;
  });

  /* ── GALLERY ── */
  const mainImage  = document.getElementById('product-main-image');
  const thumbs     = document.querySelectorAll('.product-gallery__thumb');

  thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      const src = thumb.getAttribute('data-image-src');
      const alt = thumb.getAttribute('data-image-alt');

      if (!mainImage || !src) return;

      /* Brief fade out, swap src, fade back in */
      mainImage.classList.add('is-switching');
      setTimeout(function () {
        mainImage.src = src;
        mainImage.alt = alt;
        mainImage.classList.remove('is-switching');
      }, 200);

      /* Update active thumb */
      thumbs.forEach(function (t) { t.classList.remove('is-active'); });
      thumb.classList.add('is-active');
    });
  });

  /* ── VARIANT SELECTION ── */
  const variantBtns  = document.querySelectorAll('.variant-btn');
  const variantInput = document.getElementById('variant-id');
  const priceEl      = document.getElementById('product-price');
  const atcBtn       = document.getElementById('atc-button');
  const atcBtnText   = atcBtn ? atcBtn.querySelector('.product-atc__btn-text') : null;

  /* Track currently selected option values */
  const selectedOptions = [];
  productData.options.forEach(function (_, i) {
    const firstBtn = document.querySelector('.variant-btn[data-option-index="' + i + '"]');
    selectedOptions[i] = firstBtn ? firstBtn.getAttribute('data-value') : '';
  });

  function findVariant(options) {
    return productData.variants.find(function (v) {
      return options.every(function (val, i) {
        return v['option' + (i + 1)] === val;
      });
    });
  }

  function updatePrice(variant) {
    if (!priceEl || !variant) return;
    if (variant.compare_at_price && variant.compare_at_price > variant.price) {
      priceEl.innerHTML =
        '<span class="product-info__price--compare">' + formatMoney(variant.compare_at_price) + '</span>' +
        '<span class="product-info__price--sale">'    + formatMoney(variant.price) + '</span>';
    } else {
      priceEl.innerHTML = '<span>' + formatMoney(variant.price) + '</span>';
    }
  }

  function formatMoney(cents) {
    return '$' + (cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function updateAtcBtn(variant) {
    if (!atcBtn || !atcBtnText) return;
    if (!variant || !variant.available) {
      atcBtn.disabled = true;
      atcBtn.setAttribute('aria-disabled', 'true');
      atcBtnText.textContent = 'Sold out';
    } else {
      atcBtn.disabled = false;
      atcBtn.removeAttribute('aria-disabled');
      atcBtnText.textContent = 'Add to cart';
    }
  }

  variantBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const optionIndex = parseInt(btn.getAttribute('data-option-index'), 10);
      const value       = btn.getAttribute('data-value');

      /* Update selected options array */
      selectedOptions[optionIndex] = value;

      /* Update button active states for this option group */
      document.querySelectorAll('.variant-btn[data-option-index="' + optionIndex + '"]')
        .forEach(function (b) {
          const isSelected = b.getAttribute('data-value') === value;
          b.classList.toggle('is-selected', isSelected);
          b.setAttribute('aria-pressed', isSelected);
        });

      /* Update selected label text */
      const labelEl = document.querySelector('.product-variants__selected[data-option-index="' + optionIndex + '"]');
      if (labelEl) labelEl.textContent = value;

      /* Find matching variant and update UI */
      const matched = findVariant(selectedOptions);
      if (matched) {
        if (variantInput) variantInput.value = matched.id;
        updatePrice(matched);
        updateAtcBtn(matched);
      }
    });
  });

  /* ── AJAX ADD TO CART ── */
  const productForm = document.getElementById('product-form');
  const confirmEl   = document.getElementById('atc-confirm');

  if (productForm) {
    productForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const id  = variantInput ? variantInput.value : null;
      if (!id) return;

      /* Disable button during request */
      if (atcBtn) {
        atcBtn.disabled = true;
        if (atcBtnText) atcBtnText.textContent = 'Adding…';
      }

      fetch('/cart/add.js', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body:    JSON.stringify({ id: parseInt(id, 10), quantity: 1 })
      })
        .then(function (res) {
          if (!res.ok) throw new Error('Cart error');
          return res.json();
        })
        .then(function () {
          /* Show confirmation */
          if (confirmEl) {
            confirmEl.hidden = false;
            setTimeout(function () { confirmEl.hidden = true; }, 4000);
          }

          /* Re-enable button */
          if (atcBtn && atcBtnText) {
            atcBtn.disabled = false;
            atcBtnText.textContent = 'Add to cart';
          }

          /* Update cart count in nav */
          updateCartCount();
        })
        .catch(function () {
          if (atcBtn && atcBtnText) {
            atcBtn.disabled = false;
            atcBtnText.textContent = 'Add to cart';
          }
        });
    });
  }

  function updateCartCount() {
    fetch('/cart.js')
      .then(function (res) { return res.json(); })
      .then(function (cart) {
        const countEl = document.querySelector('.nav-cart__count');
        if (cart.item_count > 0) {
          if (countEl) {
            countEl.textContent = cart.item_count;
          } else {
            /* Create count badge if it didn't exist yet */
            const cartLink = document.querySelector('.nav-cart');
            if (cartLink) {
              const badge = document.createElement('span');
              badge.className   = 'nav-cart__count';
              badge.textContent = cart.item_count;
              cartLink.appendChild(badge);
            }
          }
        }
      });
  }

  /* ── MATERIAL & CARE ACCORDION ── */
  const detailsToggle = document.querySelector('.product-details__toggle');
  const detailsBody   = document.getElementById('product-details-body');

  if (detailsToggle && detailsBody) {
    detailsToggle.addEventListener('click', function () {
      const isOpen = detailsToggle.getAttribute('aria-expanded') === 'true';
      detailsToggle.setAttribute('aria-expanded', !isOpen);
      detailsBody.hidden = isOpen;
    });
  }

})();
