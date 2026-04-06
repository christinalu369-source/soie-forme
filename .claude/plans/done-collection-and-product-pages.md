# Plan: Collection + Product Pages

**Status:** todo

## Goal

Build the two core shopping pages — collection (product grid) and product detail (buy page) — so customers can browse and purchase products from `soieandforme.com`.

## Context

- 4 test products exist in Shopify already
- `layout/theme.liquid` exists but is minimal — nav and footer may need fleshing out as part of this plan
- Design tokens (colors, fonts, spacing, easing) are all defined in `assets/base.css`
- Scroll reveal (`.reveal` + `IntersectionObserver`) is already in `assets/global.js`
- Shopify handles cart and checkout natively — we just need an "Add to cart" form

---

## Steps

### Step 1 — Create the feature branch
```
git checkout main && git pull origin main
git checkout -b feature/collection-and-product-pages
```

### Step 2 — Build `snippets/product-card.liquid`
Reusable product card used in the collection grid and anywhere else products appear.

**HTML structure:**
```html
<div class="product-card reveal">
  <a href="{{ product.url }}" class="product-card__image-wrap">
    <img primary image />
    <img secondary image (if exists) class="product-card__image--hover" />
  </a>
  <div class="product-card__info">
    <p class="product-card__vendor">{{ product.vendor }}</p>
    <h3 class="product-card__title">{{ product.title }}</h3>
    <p class="product-card__price">{{ product.price | money }}</p>
  </div>
</div>
```

**Behavior:**
- Hover: primary image crossfades to secondary image (if a second image exists; otherwise no hover image change)
- Hover: title underline reveals
- Image: `object-fit: cover`, fixed aspect ratio (3:4 portrait — suits fabric/textile photography)

### Step 3 — Build `assets/component-product-card.css`
CSS for the product card snippet:
- `.product-card` — position relative, overflow hidden
- `.product-card__image-wrap` — block, aspect-ratio 3/4, overflow hidden
- `.product-card__image` — `object-fit: cover`, `width: 100%`, `height: 100%`, transition opacity
- `.product-card__image--hover` — absolute inset 0, opacity 0; on `.product-card:hover` → opacity 1
- `.product-card__info` — padding top, font styles
- `.product-card__vendor` — DM Mono eyebrow label, olive, tracked uppercase, small
- `.product-card__title` — Shippori Mincho, ink, hover underline reveal
- `.product-card__price` — DM Mono, ink-soft

### Step 4 — Build `sections/section-collection.liquid`
The main collection page section.

**HTML structure:**
- Collection header: eyebrow ("Our Fabrics" or collection title), large serif heading, optional description
- Product grid: `{% for product in collection.products %}` → render `product-card` snippet
- Empty state: graceful message if collection has no products

**Schema settings:**
- `text` — eyebrow label (default: "Collection")
- `select` — products per row on desktop (3 or 4, default 3)
- `checkbox` — show vendor name on cards (default: true)

### Step 5 — Build `assets/section-collection.css`
CSS for the collection section:
- `.collection-header` — centered, generous padding, fade-in on load
- `.collection-grid` — CSS Grid, 3 columns desktop, 2 tablet, 1 mobile; gap `var(--space-md)`
- Responsive breakpoints: `@media (max-width: 900px)` → 2 cols; `@media (max-width: 560px)` → 1 col

### Step 6 — Create `templates/collection.json`
Shopify template file that renders `section-collection`:
```json
{
  "sections": {
    "main": {
      "type": "section-collection",
      "settings": {}
    }
  },
  "order": ["main"]
}
```

### Step 7 — Build `sections/section-product-main.liquid`
The product detail page section.

**HTML structure:**
```
[image gallery]          [product info]
  main image               eyebrow (vendor)
  thumbnail strip          title (h1)
                           price
                           variant selector (if variants exist)
                           add to cart form
                           description
                           fabric details (composition, care)
```

**Key Liquid:**
- `{{ product.selected_or_first_available_variant }}` for variant state
- `{% form 'product', product %}` for the add to cart form
- `{{ product.description }}` for the description richtext
- Images: iterate `product.images` for gallery

**Schema settings:**
- Section has no user-editable settings — all content comes from the product itself

### Step 8 — Build `assets/section-product-main.css`
CSS for the product detail layout:
- Two-column grid on desktop (images left, info right), single column on mobile
- Image gallery: main image large, thumbnails below as a horizontal strip
- Active thumbnail: olive border indicator
- Variant selector: styled `<select>` or button-group if few variants
- Add to cart button: full-width, ink background, olive hover fill (same pattern as modal CTA)
- Price: Shippori Mincho, larger than body

### Step 9 — Build `assets/section-product-main.js`
Minimal JS for the product page:
- Thumbnail click → swap main image (no page reload)
- Variant selector change → update price + availability display
- Add to cart: submit form via fetch (AJAX) → show brief confirmation, update cart count in nav

### Step 10 — Create `templates/product.json`
```json
{
  "sections": {
    "main": {
      "type": "section-product-main",
      "settings": {}
    }
  },
  "order": ["main"]
}
```

### Step 11 — Update `layout/theme.liquid`
Flesh out the nav and footer that appear on all shopping pages:
- Nav: logo (links to `/`), links (Collections, About, Contact), cart icon with item count
- Footer: brand tagline, minimal links, copyright
- Cart count: `{{ cart.item_count }}` — updates after AJAX add to cart

### Step 12 — Add CSS/JS references to `layout/theme.liquid`
Ensure `component-product-card.css`, `section-collection.css`, and `section-product-main.css` are loaded on the right pages (load all in theme.liquid for simplicity at this stage).

### Step 13 — Update `config/settings_schema.json` if needed
Add any global settings surfaced during build (e.g. products per row default).

### Step 14 — Update docs
- `.claude/docs/code-index.md` — add entries for all new files
- `.claude/specs/features.md` — mark Collection page, Product card, Product detail page as `done`

---

## Decisions Already Made

- Product card aspect ratio: 3:4 portrait (suits textile/fabric photography)
- Grid: 3 columns desktop, 2 tablet, 1 mobile
- Add to cart: AJAX (fetch) so page doesn't reload — updates cart count in nav
- No quick-add modal for now — click card → go to product page
- Variant selector: standard `<select>` element, styled to match the aesthetic
- No metafields for fabric details in v1 — use the product description field for now

## Out of Scope

- Cart drawer (next plan)
- Related products section
- Product image zoom
- Filter/sort on collection page
- Review stars / ratings
- Inventory / stock display

## Testing Plan

- [ ] `/collections` (or a specific collection URL) renders the product grid with all 4 test products
- [ ] Product cards show image, title, price
- [ ] Hovering a card reveals the second image (if product has one)
- [ ] Clicking a card navigates to the product detail page
- [ ] Product detail page shows images, title, price, description
- [ ] Thumbnail strip switches main image on click
- [ ] If product has variants, selector appears and updates price
- [ ] Add to cart button adds product to cart; cart count in nav updates
- [ ] Mobile (375px): collection grid is 1 column, product page stacks image above info
- [ ] Nav links work: logo → home, Collections → /collections
