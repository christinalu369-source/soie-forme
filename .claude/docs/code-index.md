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
