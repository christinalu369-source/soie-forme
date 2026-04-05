# Architecture

## What Soie & Forme Is

Soie & Forme is a **custom Shopify theme** — a collection of Liquid templates, CSS, and JavaScript that Shopify renders for each storefront request. We do not run a server. We do not own a database. Shopify handles all commerce data (products, collections, cart, checkout, orders).

Our job is to build a beautiful, elegant frontend that:
1. Presents the brand and fabric story (informational pages, editorial content)
2. Lets shoppers browse and purchase products (collections, product detail, cart)
3. Feels alive — smooth fade transitions, custom cursor, minimal but intentional animation

---

## Shopify Theme Folder Structure

```
assets/          # All static files: CSS, JS, images, fonts, SVGs
config/          # Theme settings schema + saved settings data
layout/          # theme.liquid — the HTML wrapper for every page
locales/         # Translation strings (en.default.json, etc.)
sections/        # Page-level Liquid blocks, each with its own schema
snippets/        # Small reusable Liquid partials (no schema)
templates/       # Page templates — define which sections appear on each page
```

### Key files

| File | Purpose |
|---|---|
| `layout/theme.liquid` | The outer HTML shell — `<html>`, `<head>`, `<body>`, global nav, footer, global JS |
| `templates/index.json` | Homepage — lists the sections that appear on the landing page |
| `templates/product.json` | Product detail page |
| `templates/collection.json` | Collection (category) listing page |
| `templates/page.json` | Generic content page |
| `templates/cart.json` | Cart page |
| `config/settings_schema.json` | Defines what the merchant can configure in the theme editor |
| `config/settings_data.json` | The current saved values of those settings |
| `assets/base.css` | Global CSS — custom properties (design tokens), resets, typography |
| `assets/global.js` | Global JavaScript — custom cursor, scroll listeners, utility functions |

---

## Liquid Rendering Pipeline

When a shopper visits a page:

```
Request → Shopify picks the template (e.g. templates/product.json)
         → template lists sections to render
         → each section renders its .liquid file
         → section can include snippets
         → everything is wrapped in layout/theme.liquid
         → HTML is sent to browser
```

Shopify injects data automatically. Inside any Liquid file you can access:
- `product` — the current product (on product pages)
- `collection` — the current collection (on collection pages)
- `cart` — the current cart (always available)
- `shop` — store-level info (name, currency, etc.)
- `settings` — values from `config/settings_data.json`

---

## Sections vs Snippets

| | Section | Snippet |
|---|---|---|
| Has schema? | Yes (customizable via theme editor) | No |
| Renders independently? | Yes | No — included via `{% render 'name' %}` |
| Use for | Hero, featured collection, text blocks, etc. | Product card, icon, form field, etc. |

### Including a snippet

```liquid
{% render 'product-card', product: product %}
```

### Section schema (minimal example)

```liquid
{% schema %}
{
  "name": "Hero",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": "Soie & Forme" }
  ],
  "presets": [{ "name": "Hero" }]
}
{% endschema %}
```

---

## How the Design Is Structured

The visual design system lives in `assets/base.css` as CSS custom properties:

```css
:root {
  --cream: #FAF8F3;
  --cream-mid: #EDE8DE;
  --cream-deep: #D4CFC4;
  --linen: #C8C2B6;
  --ink: #2C2C2A;
  --ink-soft: #4A4A48;
  --ink-faint: #8C8878;
  --olive: #708238;
  --olive-light: #8A9E45;

  --font-serif: 'Shippori Mincho', serif;
  --font-mono: 'DM Mono', monospace;
}
```

All component CSS files reference these variables — never hardcode a color or font-family in a component file.

---

## JavaScript Architecture

All JS is vanilla, loaded from `assets/`. There is no build step.

- `assets/global.js` — custom cursor, scroll behavior, shared utilities
- `assets/section-[name].js` — section-specific interactions (e.g. hero fade, modal open/close)
- `assets/component-[name].js` — reusable interactive components (e.g. cart drawer, mobile nav)

Scripts are loaded at the bottom of `layout/theme.liquid` or deferred inline in the section that needs them.

---

## GitHub ↔ Shopify Sync

The repo is connected to Shopify via GitHub integration:
- Pushing to `main` → Shopify syncs the theme files to the live store
- Shopify only syncs the theme directories (`assets/`, `config/`, `layout/`, etc.)
- Non-theme files (`.claude/`, `CLAUDE.md`, `.env.example`) are ignored by Shopify

See `.claude/rules/shopify-deployment.md` for deployment rules.
