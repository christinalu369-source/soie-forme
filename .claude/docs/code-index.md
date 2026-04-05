# Code Index

A living map of every source file in the project. Claude updates this after completing each plan.

**Format:** `path/to/file.js` — what it does — key exports or functions

---

## Theme Scaffolding + Entry Page (v1.0)

`assets/base.css` — Global design tokens, reset, cursor, noise texture, animations, scroll reveal, utility classes
`assets/global.js` — Custom cursor (dot + ring lerp), scroll reveal IntersectionObserver, nav scroll state
`assets/section-entry.css` — Entry page: full-screen layout, silk gradient bg, centered nav items, modal overlay + panels, transitions, mobile styles
`assets/section-entry.js` — Modal open/close, overlay click dismiss, Escape key, focus trap

`layout/entry.liquid` — Minimal full-screen layout for homepage only (no nav/footer); loads entry-specific CSS/JS
`layout/theme.liquid` — Standard layout for all other pages: nav bar, footer, global JS

`sections/section-entry.liquid` — Dimension-style entry section with logo, tagline, 4 nav items (Shop links out; Story/Bespoke/Contact open modals); full theme-editor schema

`templates/index.liquid` — Homepage template; declares `layout/entry`, renders `section-entry`
`templates/404.liquid` — On-brand not-found page with outlined numeral, links back to home

`config/settings_schema.json` — Global theme settings: brand tagline, social links
`config/settings_data.json` — Default values for global theme settings
`locales/en.default.json` — Minimal locale stub
