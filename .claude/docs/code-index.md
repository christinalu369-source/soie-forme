# Code Index

A living map of every source file in the project. Claude updates this after completing each plan.

**Format:** `path/to/file.js` — what it does — key exports or functions

---

## Theme Scaffolding + Entry Page (v1.0)

`assets/base.css` — Global design tokens (colors, fonts, spacing, easing incl. `--ease-silk`/`--ease-settle`), reset, cursor, noise texture, animations, scroll reveal, utility classes
`assets/global.js` — Custom cursor (dot + ring lerp), scroll reveal IntersectionObserver, nav scroll state
`assets/section-entry.css` — Entry page: full-screen silk-gradient bg, feathered cream scrim behind the logo + cream-filled nav boxes (legibility over photo backgrounds), animated structural diagram nav (stem → crossbar → drops → boxes), modal overlay + panels, numbered styling-methods list, silky transitions, mobile fallback
`assets/section-entry.js` — Modal open/close, overlay click dismiss, Escape key, focus trap

`layout/entry.liquid` — Minimal full-screen layout (no nav/footer); loads entry-specific CSS/JS. No longer the homepage as of v1.3 — kept for the entry section
`layout/theme.liquid` — Standard layout for all other pages: nav bar, footer, global JS

`sections/section-entry.liquid` — Entry section: logo/tagline, animated diagram nav (Shop → /collections; Story/Styling Inspo/Contact → modals), 3 modal panels (Styling Inspo renders 4 editable how-to methods), full theme-editor schema. Superseded as the homepage by Silk Story (v1.3) but kept intact — still referenced in `settings_data.json`

`templates/404.liquid` — On-brand not-found page with outlined numeral, links back to home

`config/settings_schema.json` — Global theme settings: brand tagline, social links
`config/settings_data.json` — Default values for global theme settings
`locales/en.default.json` — Minimal locale stub

`preview.html` — Standalone local preview of the entry page (no Shopify CLI needed); not synced to Shopify

## Homepage — A Story in Silk (v1.3)

`sections/section-silk-story.liquid` — Homepage story: `hero` (cinematic cover) + `scene` (chapter, headline, caption, video/photo, optional collage and product) + `card` blocks; fixed deck + invisible scroll track + filmstrip + collage lightboxes; full theme-editor schema
`assets/section-silk-story.css` — Story styles: fixed cross-fading deck, full-bleed media band with sheen, caption band, shop pill, filmstrip, toast; editorial split at 900px; reduced-motion handling
`assets/section-silk-story.js` — Scroll-driven cross-fade engine (opacity/scale from scroll position), filmstrip navigation, `inert` on faded scenes, per-scene video play/pause, photo-collage lightbox (scroll lock + focus trap), soft add-to-cart via `/cart/add.js`
`layout/story.liquid` — Immersive homepage layout (no nav/footer); scopes scroll-snap via `.story-scroll` on `<html>`
`templates/index.liquid` — Homepage; declares `layout/story`, renders `section-silk-story`

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

## Content Pages (v1.2)

`sections/section-page-about.liquid` — About page: hero with eyebrow + serif heading, intro (2-col text+image), philosophy band, values strip (Fibre / Craft / Ritual), closing CTA to Contact
`assets/section-page-about.css` — About page styles: editorial layout, responsive grid, olive accent rules, hover scale on image
`templates/page.about.json` — About template; renders section-page-about

`sections/section-page-contact.liquid` — Contact page: header intro, Shopify native contact form (name/email/subject/message), success/error states, aside info panel (email, response time, bespoke note)
`assets/section-page-contact.css` — Contact page styles: underline-border inputs with olive focus, olive slide-fill submit button, responsive stacked layout
`templates/page.contact.json` — Contact template; renders section-page-contact
