# Plan: The Atelier Table — Liquid Port & Soft Commerce

**Status:** todo
> Governed by `todo-00-atelier-table-northstar.md`. Do not start until the `todo-01` prototype is built and a direction is approved. This is the "make it real on Shopify" plan.

## Goal
Port the approved Atelier Table prototype into the live Shopify theme as a real, editable section + page template, with the soft-commerce affordances wired to actual products and cart.

## Context
- Only start once `todo-01` is validated — this plan intentionally stays a skeleton until then, because the prototype will change the details.
- Must follow all theme conventions: `.claude/rules/coding-standards.md` (BEM CSS, tokens in `base.css`, vanilla JS, Web Components for interactive pieces, section `{% schema %}`), `.claude/rules/shopify-deployment.md` (dev theme first), `.claude/rules/git-workflow.md`.
- Reuse existing machinery where possible: cart/AJAX patterns from `assets/section-product-main.js`, product data via Liquid objects, the noise/cursor/motion from `assets/base.css` + `assets/global.js`.

## Steps (skeleton — refine after prototype approval)
1. **Create `sections/section-atelier-table.liquid`** with a `{% schema %}` exposing: backdrop image/settings, and a repeatable `piece` block (product picker, media image/video, eyebrow, title, story text, "shop this" toggle). Merchant-editable in the theme editor.
2. **Port CSS to `assets/section-atelier-table.css`** — move prototype styles in, replace all literals with design tokens from `base.css`, keep BEM naming (`.atelier`, `.atelier__piece`, `.atelier__table`, etc.).
3. **Port JS to `assets/section-atelier-table.js`** — the scroll/glide engine as a defensive, `prefers-reduced-motion`-aware module; the soft product panel as a focus-trapping Web Component (per coding standards for drawers/modals).
4. **Wire soft commerce to real products** — each `piece` block references a product; the `shop this` panel pulls real title/price/variants and adds to cart via the existing AJAX cart path. Keep it dismissible and non-blocking.
5. **Add a page template** — e.g. `templates/page.atelier.json` (ship on a dedicated route first so it can go live without replacing the homepage), pending the north-star open question about whether it eventually becomes `templates/index`.
6. **Accessibility + performance pass** — keyboard access, focus management, alt text from product/media, lazy-load media, reduced-motion, WCAG AA contrast (per coding standards).
7. **Dev-theme verification** — run `shopify theme dev`, verify on mobile device preview and in the theme editor, before any merge.

## Decisions Already Made
- Content-first, soft commerce (from north star).
- Real cart integration reuses existing AJAX cart, not a new backend.
- Ships to a dedicated route first, not a homepage takeover (reduces risk; revisit later).

## Open Questions
- [ ] Homepage takeover vs. dedicated `/pages/atelier` route for launch. (Default: dedicated route first.)
- [ ] Does the existing `section-entry` stay, get absorbed as the opening beat, or get retired?
- [ ] Video hosting — Shopify-hosted, external, or stills-with-motion for v1?
- [ ] Final content model: how many pieces, sourced from which products/collections?

## Out of Scope
- Prototyping (done in `todo-01`).
- New checkout/cart backend.
- Final media production (handled separately; this plan consumes whatever assets exist).

## Testing Plan
Per `.claude/rules/shopify-deployment.md` — visual verification on a dev theme, never the live theme.
- [ ] Section renders and is fully editable in the Shopify theme editor (blocks add/remove/reorder).
- [ ] Glide interaction matches the approved prototype on mobile device preview.
- [ ] `shop this` adds the correct real product/variant to cart without a page reload.
- [ ] Reduced-motion, keyboard nav, focus trap on the product panel, alt text present.
- [ ] Mobile (390px), tablet (768px), desktop (1280px) all hold up.
- [ ] No regressions to existing pages; nothing referenced in `settings_data.json` is broken.
