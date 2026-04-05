# Pages Spec

What each page of the theme contains, its purpose, and what sections/templates are involved.

---

## Home / Landing (`templates/index.json`)

**Purpose:** The cinematic entry point. Sets the brand mood before inviting shoppers in.

**Design reference:** Inspired by HTML5UP Dimension — full-screen hero with modal-style content panels that fade in and out. The landing page is atmospheric first, commercial second.

**Sections:**
1. **Hero** (`section-hero.liquid`) — Full viewport. Large Shippori Mincho heading, olive eyebrow label, brief tagline, CTA button ("Explore" or "Enter"). Fade-in animation on load.
2. **Entry Modals / Panels** — Clickable panels (About, Materials, Collections) that fade in content overlays without navigating away. Dimension-style.
3. **Featured Collection** (`section-featured-collection.liquid`) — A curated 3–6 product grid below the hero. Transitions the page from mood to shop.
4. **Editorial / Material Story** (`section-material-story.liquid`) — Image + text block about the fabric story. Fade-in on scroll.
5. **Footer** (global, in `layout/theme.liquid`)

---

## Collections List (`templates/list-collections.json`)

**Purpose:** Browse all product categories.

**Sections:**
1. Page header — minimal heading ("Collections" or "Our Fabrics")
2. Collection grid — each collection as a card with image, name, product count

---

## Collection (`templates/collection.json`)

**Purpose:** Products within a single category (e.g., "Silk", "Linen", "New Arrivals").

**Sections:**
1. Collection header — collection image (banner or editorial), title, description
2. Product grid — responsive grid of product cards, with optional filter/sort

**Product card snippet** (`snippets/product-card.liquid`):
- Product image (hover: reveal second image if available)
- Product title
- Price (show compare-at price if on sale)
- Quick-add button (optional)

---

## Product Detail (`templates/product.json`)

**Purpose:** Individual product — the conversion page.

**Sections:**
1. Product main (`section-product-main.liquid`):
   - Image gallery (main image + thumbnail strip or swatch-style navigation)
   - Product title, price, vendor
   - Variant selector (size, color if applicable)
   - Add to cart button
   - Product description
2. Fabric details (`section-product-details.liquid`):
   - Composition, weight (GSM), care instructions — pulled from metafields
   - Shipping and returns note
3. Related products / You may also like (`section-related-products.liquid`)

---

## About / Brand Story (`templates/page.json` — assigned to About page)

**Purpose:** Editorial brand storytelling — not a product page. Fabric philosophy, origin, craft.

**Sections:**
1. Page hero — full-width image or text-only header
2. Body content — long-form richtext (merchant-editable in theme editor)
3. Material spotlight — image + text pairs for key fabrics
4. Values / process — brief editorial blocks

---

## Contact (`templates/page.json` — assigned to Contact page)

**Purpose:** Simple contact form.

**Sections:**
1. Page header
2. Contact form (`section-contact-form.liquid`) — email, name, message; Shopify handles submission

---

## Cart (`templates/cart.json`)

**Purpose:** Cart review before checkout.

**Sections:**
1. Cart main (`section-cart.liquid`) — line items, quantity controls, remove button, subtotal, checkout button
2. Optionally: shipping note, upsell section

**Also consider:** A cart *drawer* that slides in from the right without leaving the page — this is more modern and works better with the fade-transition aesthetic. The drawer can replace the full cart page or both can coexist.

---

## Search (`templates/search.json`)

**Purpose:** Search results.

**Sections:**
1. Search bar (pre-filled with query)
2. Results grid (products and/or pages)
3. No-results state

---

## 404 (`templates/404.liquid`)

**Purpose:** Not found page.

- Minimal message
- Link back to home and collections
- On-brand styling — not jarring

---

## Global Elements (in `layout/theme.liquid`)

These appear on every page:

- `<head>` — title tag, meta description, Open Graph, font loading, global CSS
- Navigation bar (`snippets/header.liquid` or inline)
- Cart drawer (if implemented as a drawer)
- Custom cursor markup
- Footer (`snippets/footer.liquid` or inline)
- Global JS (`assets/global.js`)
