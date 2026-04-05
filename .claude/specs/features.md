# Features Backlog

This is the master list of features — ideas, requests, and work in progress.

## Pipeline

```
idea → approved → in-progress → done
```

| Status | Meaning |
|---|---|
| `idea` | Suggested but not yet decided on |
| `approved` | Decided — ready to be turned into a plan |
| `in-progress` | A plan exists and work is actively underway |
| `done` | Shipped and on main |

When a feature moves to `approved`, Claude will write a plan for it in `.claude/plans/`.

---

## Who Updates This File

**The developer** can add rows with status `idea` any time — just a name and a one-line description is enough.

**Claude** updates statuses and adds plan links as features move through the pipeline.

---

## Features

### Foundation

| Feature | Status | Plan | Notes |
|---|---|---|---|
| Theme scaffolding | `done` | `done-theme-scaffolding.md` | Shopify folder structure, base CSS, global JS, both layouts, entry page section + modals, config, locales |
| Design system | `done` | `done-theme-scaffolding.md` | Included in scaffolding plan |
| Global layout | `done` | `done-theme-scaffolding.md` | `layout/theme.liquid` (nav + footer) and `layout/entry.liquid` (full-screen) both built |

### Navigation & Chrome

| Feature | Status | Plan | Notes |
|---|---|---|---|
| Navigation bar | `idea` | — | Fixed top nav: logo, links (Collections, About, Contact), cart icon; scrolled state with frosted glass background |
| Mobile navigation | `idea` | — | Hamburger menu → full-screen overlay with fade; closes on link click |
| Cart drawer | `idea` | — | Slide-in cart panel (right side); shows items, quantities, subtotal, checkout button; updates without page reload |
| Custom cursor | `idea` | — | Small olive dot + trailing ring; scales/changes on hover over links/buttons; JS in `assets/global.js` |
| Footer | `idea` | — | Brand tagline, navigation links, social links (if applicable), copyright |

### Landing / Entry Page

| Feature | Status | Plan | Notes |
|---|---|---|---|
| Entry page (Dimension-style) | `done` | `done-theme-scaffolding.md` | Full-screen background, animated structural diagram nav (stem → crossbar → drops → boxes), 3 modal panels (Story, Bespoke, Contact), Shop links to /collections; silky ~5s build animation |
| Featured collection section | `idea` | — | Curated product grid on the homepage — links to collection page |
| Editorial / material section | `idea` | — | Informational section about silk and fabrics — image + text, fade-in on scroll |

### Product Pages

| Feature | Status | Plan | Notes |
|---|---|---|---|
| Collection page | `idea` | — | Grid of product cards with hover states; filter/sort if needed |
| Product card snippet | `idea` | — | Reusable product card: image, title, price; hover reveals secondary image |
| Product detail page | `idea` | — | Product images, title, price, variant selector, add to cart; fabric details section |
| Product image gallery | `idea` | — | Smooth image switching / zoom on product detail page |

### Content Pages

| Feature | Status | Plan | Notes |
|---|---|---|---|
| About / brand story page | `idea` | — | Editorial long-form page — brand origin, fabric sourcing, philosophy |
| Contact page | `idea` | — | Simple contact form; Shopify handles form submission natively |

### Technical

| Feature | Status | Plan | Notes |
|---|---|---|---|
| Shopify CLI + GitHub setup | `idea` | — | Connect repo to Shopify, configure GitHub integration, document dev workflow |
| SEO foundations | `idea` | — | `<title>`, meta description, Open Graph tags, canonical URLs in `layout/theme.liquid` |
| Accessibility audit | `idea` | — | Focus states, ARIA labels, keyboard nav, color contrast check |
| Mobile responsiveness pass | `idea` | — | Full responsive QA across all pages at 375px, 768px, 1280px |

---

## How to Add a Feature Request

Add a row to the relevant table above with status `idea` and a brief description. That's it — don't build it yet.
