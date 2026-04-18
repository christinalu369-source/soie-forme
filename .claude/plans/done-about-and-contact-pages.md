# Plan: About & Contact Pages

**Status:** in-progress

## Goal
Build styled About and Contact page templates so that `/pages/about` and `/pages/contact` no longer 404. Both pages should match the Soie & Forme quiet-luxury aesthetic.

## Context
Nav links in `layout/theme.liquid` already point to `/pages/about` and `/pages/contact`. We need Shopify page templates (`templates/page.about.json`, `templates/page.contact.json`) that render custom sections. The user will also need to create the actual Shopify pages in Admin (handle: "about" and "contact") for the URLs to resolve.

## Steps

1. Write plan file (this file) and create feature branch
2. Build `sections/section-page-about.liquid` — editorial brand story: full-width hero band, 2-col text+image layout, values strip
3. Build `assets/section-page-about.css` — styles for About section
4. Build `sections/section-page-contact.liquid` — contact intro + Shopify native contact form
5. Build `assets/section-page-contact.css` — styles for Contact section
6. Create `templates/page.about.json` and `templates/page.contact.json`
7. Add CSS refs for both new stylesheets to `layout/theme.liquid`
8. Post-merge cleanup: update features.md, code-index.md, rename plan to done-

## Decisions Already Made

- Use Shopify's native `{% form 'contact' %}` for the contact form — no third-party service
- Design matches quiet-luxury: cream bg, ink text, olive accents, serif headings, mono body
- About page: static brand story text (editable via schema settings where sensible)
- No JS needed for either page

## Out of Scope

- Setting up the actual Shopify pages in Admin (user must do that manually)
- Email handling configuration (Shopify handles this natively)

## Testing Plan

- [ ] `/pages/about` renders without errors when Shopify page with handle "about" exists
- [ ] `/pages/contact` renders without errors when Shopify page with handle "contact" exists
- [ ] Contact form submits successfully (Shopify handles it)
- [ ] Both pages look correct on mobile (375px)
- [ ] No console errors
