# Project Spec

## Purpose

Soie & Forme is a custom Shopify theme for an elegant fabric and textile store. The theme serves two intertwined purposes:

1. **Brand storytelling** — inform visitors about the fabrics, the brand's philosophy, and the materials through beautiful editorial content
2. **Commerce** — let shoppers browse collections and purchase products, powered by Shopify's backend

The user experience moves from a cinematic entry (full-screen, minimal, mood-setting) into a richer e-commerce environment — all within a single coherent aesthetic.

## Design Direction

- **Aesthetic**: Quiet luxury. Not loud, not cold. Warm creams, olive accents, ink typography. The brand of an atelier that takes craft seriously.
- **Motion**: Smooth, intentional fades and transitions — inspired by the HTML5UP Dimension template. Nothing bounces, nothing slides aggressively. Things *appear* and *dissolve*.
- **Typography**: Shippori Mincho (serif, editorial, slightly Japanese-influenced) for headings and display; DM Mono (clean monospace) for body text and labels. The contrast between these two is a signature brand detail.
- **Cursor**: Custom small olive dot + trailing ring. Confirms the site is intentional and craft-made.

## Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Theme language | Liquid | Shopify's native templating — required for GitHub integration |
| Styling | Plain CSS | CSS custom properties for design tokens; no preprocessor needed |
| JavaScript | Vanilla JS | No frameworks; custom cursor, modals, animations |
| Commerce backend | Shopify | Products, collections, cart, checkout, orders — all Shopify-managed |
| Version control | GitHub | Synced to Shopify via GitHub integration |
| Dev tooling | Shopify CLI | Local dev server with live reload |

## Pages / Routes

| Page | Shopify Template | Purpose |
|---|---|---|
| Home / Entry | `templates/index.json` | Cinematic landing — sets the brand mood, links into the store |
| Collections | `templates/list-collections.json` | Browse all fabric categories |
| Collection | `templates/collection.json` | Products within a category |
| Product | `templates/product.json` | Individual product detail + add to cart |
| About / Story | `templates/page.json` | Brand story, fabric philosophy, editorial content |
| Cart | `templates/cart.json` | Cart page (or cart drawer) |
| Search | `templates/search.json` | Search results |
| 404 | `templates/404.liquid` | Not found page |

## Out of Scope (v1)

- Customer accounts / login
- Wishlists
- Product reviews
- Loyalty / rewards
- Blog
- Multi-currency (Shopify handles currency conversion natively if needed)
- Subscriptions
