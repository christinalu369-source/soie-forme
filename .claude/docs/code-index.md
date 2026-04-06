# Code Index

A living map of every source file in the project. Claude updates this after completing each plan.

**Format:** `path/to/file.js` — what it does — key exports or functions

---

## Theme Scaffolding + Entry Page (v1.0)

`assets/base.css` — Global design tokens (colors, fonts, spacing, easing incl. `--ease-silk`/`--ease-settle`), reset, cursor, noise texture, animations, scroll reveal, utility classes
`assets/global.js` — Custom cursor (dot + ring lerp), scroll reveal IntersectionObserver, nav scroll state
`assets/section-entry.css` — Entry page: full-screen silk-gradient bg, animated structural diagram nav (stem → crossbar → drops → boxes), modal overlay + panels, silky transitions, mobile fallback
`assets/section-entry.js` — Modal open/close, overlay click dismiss, Escape key, focus trap

`layout/entry.liquid` — Minimal full-screen layout for homepage only (no nav/footer); loads entry-specific CSS/JS
`layout/theme.liquid` — Standard layout for all other pages: nav bar, footer, global JS

`sections/section-entry.liquid` — Entry section: logo/tagline, animated diagram nav (Shop → /collections; Story/Bespoke/Contact → modals), 3 modal panels, full theme-editor schema

`templates/index.liquid` — Homepage template; declares `layout/entry`, renders `section-entry`
`templates/404.liquid` — On-brand not-found page with outlined numeral, links back to home

`config/settings_schema.json` — Global theme settings: brand tagline, social links
`config/settings_data.json` — Default values for global theme settings
`locales/en.default.json` — Minimal locale stub

`preview.html` — Standalone local preview of the entry page (no Shopify CLI needed); not synced to Shopify

## Collection + Product Pages (v1.1)

`snippets/product-card.liquid` — Reusable product card: primary/secondary image crossfade, vendor eyebrow, title, price (with sale support)
`assets/component-product-card.css` — Product card styles: 3:4 aspect ratio, image crossfade hover, underline reveal, sale price

`sections/section-collection.liquid` — Collection page: header (eyebrow + title + description), product grid via product-card snippet, empty state; schema for eyebrow + columns
`assets/section-collection.css` — Collection styles: centered header with flanking rules, CSS Grid (3–4 col desktop, 2 tablet, 1 mobile)
`templates/collection.json` — Collection template; renders section-collection

`sections/section-product-main.liquid` — Product detail: image gallery + thumbnail strip, vendor, title, price, variant button-group selector, AJAX add-to-cart form, description, material/care accordion
`assets/section-product-main.css` — Product page styles: two-column layout (gallery sticky left, info right), variant buttons, ATC button with olive fill, accordion
`assets/section-product-main.js` — Product page JS: thumbnail gallery switching, variant selection + price update, AJAX add to cart, cart count update, accordion toggle
`templates/product.json` — Product template; renders section-product-main

`assets/global-nav.css` — Fixed nav bar (logo, links, cart count badge, frosted-glass scroll state) and footer (dark ink background, 4-column grid, social links)
