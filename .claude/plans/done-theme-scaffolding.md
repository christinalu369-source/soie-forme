# Plan: Theme Scaffolding + Dimension-Style Entry Page

**Status:** todo

## Goal

Build the Shopify theme from scratch — not porting the prototype, but creating the correct design:
a **Dimension-style full-screen entry page** with modal panels that fade in and out, leading into a separate shop. The prototype's design tokens (colors, fonts, cursor) are used, but the layout concept is completely different.

## What It Looks Like

**Entry page (homepage):**
- Full-screen background: a beautiful CSS silk-textile gradient with noise texture + an `image_picker` so the merchant can replace it with photography later
- Dark vignette overlay so text reads clearly
- Centered vertically + horizontally: brand logo, tagline, a thin rule, then 4 clickable text items
- Custom olive cursor throughout

```
┌──────────────────────────────────────────────┐
│     [silk-evocative full-screen background]  │
│                                              │
│              SOIE & FORME                    │
│         quietly refined silk                 │
│                                              │
│         ─────────────────────                │
│               S H O P  →                    │  (navigates to /collections)
│            OUR  STORY                        │  (opens modal)
│             B E S P O K E                    │  (opens modal)
│             C O N T A C T                    │  (opens modal)
│         ─────────────────────                │
└──────────────────────────────────────────────┘
```

**When a modal panel opens:**
- Background dims to a semi-transparent dark overlay
- Modal panel slides up gently + fades in from center
- Panel is cream/linen background, max-width ~540px
- Title (Shippori Mincho), body (DM Mono), optional CTA button
- Close: × button top-right, Escape key, or click outside
- Closing: reverse — modal fades + slides down, overlay fades out

**Four items:**
1. **Shop** → navigates directly to `/collections` (no modal)
2. **Our Story** → modal: brand story + link to full About page
3. **Bespoke** → modal: bespoke/made-to-order description + contact CTA
4. **Contact** → modal: contact email, social links, brief note

## Architecture Decision

The entry page is structurally different from every other page (no traditional nav, no footer — just full-screen). In Shopify, this is handled cleanly by using two layouts:

- `layout/entry.liquid` — used only for the homepage; minimal, full-screen, no nav/footer
- `layout/theme.liquid` — used for all other pages (shop, product, collections, etc.); has nav + footer
- `templates/index.liquid` — homepage template, declares `{% layout 'entry' %}` and renders `section-entry`

## Steps

### Step 1 — Create folder structure + delete placeholder
Create all required Shopify theme directories and stub files. Delete the root `index.html` placeholder from the GitHub init.

Files to create as stubs:
```
config/settings_schema.json
config/settings_data.json
locales/en.default.json
templates/index.liquid   ← NOT index.json (needs custom layout declaration)
templates/404.liquid
```

### Step 2 — Write `assets/base.css`
Global design tokens and shared CSS used across the entire theme:
- All CSS custom properties: colors (`--cream`, `--ink`, `--olive`, etc.), fonts (`--font-serif`, `--font-mono`), spacing
- Reset (`*, *::before, *::after`)
- Base `html` / `body` styles
- Custom cursor (`.cursor` dot, `.cursor-ring`)
- `@keyframes fadeUp` and scroll reveal (`.reveal`, `.reveal.visible`, `.reveal-d1–d4`)
- Text selection style (`::selection`)
- Slim olive scrollbar (`::-webkit-scrollbar`)
- `prefers-reduced-motion` block
- Noise texture overlay via `body::after`

### Step 3 — Write `assets/global.js`
Shared JavaScript for the whole theme:
- Custom cursor: dot tracks `mousemove` instantly; ring follows with lerp via `requestAnimationFrame`
- Cursor hover states: expands on `a, button` hover
- Scroll reveal: `IntersectionObserver` adds `.visible` to `.reveal` elements
- Guard all selectors (check element exists before attaching listeners)

### Step 4 — Write `layout/entry.liquid`
Minimal layout for the homepage only:
- `<html>`, `<head>` with charset, viewport, title (`{{ page_title }}`), Google Fonts preconnect + link, `{{ 'base.css' | asset_url | stylesheet_tag }}`, `{{ 'section-entry.css' | asset_url | stylesheet_tag }}`
- Cursor markup (`<div class="cursor">`, `<div class="cursor-ring">`)
- `<main>{{ content_for_layout }}</main>` — no nav, no footer
- `{{ 'global.js' | asset_url | script_tag }}` deferred
- `{{ 'section-entry.js' | asset_url | script_tag }}` deferred

### Step 5 — Write `layout/theme.liquid`
Standard layout for all non-homepage pages (shop, product, etc.). Built for later pages — minimal for now:
- Same `<head>` structure as entry layout
- Cursor markup
- Navigation bar (logo, links: Collections, About, Contact; cart icon with count)
- `<main>{{ content_for_layout }}</main>`
- Footer
- Global JS

### Step 6 — Write `assets/section-entry.css`
All CSS specific to the entry page:
- `.entry` wrapper: `position: fixed; inset: 0` full-screen
- Background: layered CSS gradients evoking silk (luminous cream-to-linen) + `background-image` for merchant's photo
- Vignette: `radial-gradient` overlay darkening edges so centered text pops
- `.entry-center`: absolutely centered flexbox column (logo, tagline, rule, nav items)
- `.entry-logo`: large Shippori Mincho, letter-spaced
- `.entry-tagline`: DM Mono, small, tracked, muted
- `.entry-rule`: thin 1px olive horizontal rule
- `.entry-nav`: list of nav items
- `.entry-nav-item`: uppercase DM Mono, tracked, with olive hover underline and arrow `→` for Shop
- Modal overlay (`.modal-overlay`): `position: fixed; inset: 0`, dark semi-transparent, hidden by default, fades in
- Modal panel (`.modal`): centered, cream background, padding, max-width 540px, hidden by default
- Modal open/close transitions: `opacity` + `transform: translateY(16px)` → `translateY(0)` at 0.45s ease
- Modal header, body, close button, CTA button styles

### Step 7 — Write `assets/section-entry.js`
Modal interaction JavaScript:
- `openModal(id)`: sets overlay + target modal to visible, triggers CSS transition, traps body scroll
- `closeModal()`: reverse transition, removes scroll trap
- Click on nav items → `openModal('story' | 'bespoke' | 'contact')`
- Click outside modal (on overlay) → `closeModal()`
- `Escape` key → `closeModal()`
- Focus trap inside open modal (tab key cycles within modal)
- Shop item → simple link, no modal

### Step 8 — Write `sections/section-entry.liquid`
The entry page section — the full Dimension-style experience:

**HTML structure:**
```html
<div class="entry" style="background-image: url('{{ section.settings.background_image | image_url: width: 2400 }}')">
  <div class="entry-center">
    <div class="entry-logo">Soie <span class="amp">&</span> Forme</div>
    <div class="entry-tagline">{{ section.settings.tagline }}</div>
    <div class="entry-rule"></div>
    <nav class="entry-nav">
      <a href="{{ routes.collections_url }}" class="entry-nav-item entry-nav-item--link">Shop →</a>
      <button class="entry-nav-item" data-modal="story">Our Story</button>
      <button class="entry-nav-item" data-modal="bespoke">Bespoke</button>
      <button class="entry-nav-item" data-modal="contact">Contact</button>
    </nav>
  </div>
  <!-- Overlay -->
  <div class="modal-overlay" id="modalOverlay"></div>
  <!-- Modal: Our Story -->
  <div class="modal" id="modal-story">
    <button class="modal-close">×</button>
    <h2 class="modal-title">{{ section.settings.story_title }}</h2>
    <div class="modal-body">{{ section.settings.story_body }}</div>
    <a href="/pages/about" class="modal-cta">{{ section.settings.story_cta }}</a>
  </div>
  <!-- Modal: Bespoke -->
  <div class="modal" id="modal-bespoke"> ... </div>
  <!-- Modal: Contact -->
  <div class="modal" id="modal-contact"> ... </div>
</div>
```

**Schema settings:**
- `image_picker` — background image
- `text` — tagline ("quietly refined silk")
- Story modal: `story_title`, `story_body` (richtext), `story_cta` label
- Bespoke modal: `bespoke_title`, `bespoke_body` (richtext), `bespoke_cta` label + url
- Contact modal: `contact_title`, `contact_body` (richtext), `contact_email`

Pre-populated default values matching the brand copy from the prototype.

### Step 9 — Write `templates/index.liquid`
```liquid
{% layout 'entry' %}
{% section 'section-entry' %}
```

### Step 10 — Write `templates/404.liquid`
Simple on-brand 404 using `layout/theme.liquid` implicitly:
- Centered minimal message: "404 — Page not found"
- Link back to homepage

### Step 11 — Write `config/settings_schema.json` + `settings_data.json`
Minimal global settings: store name, social links (Instagram, Pinterest), footer tagline.

### Step 12 — Write `locales/en.default.json`
Minimal locale file with required Shopify keys.

### Step 13 — Update `docs/code-index.md`
Add one-line entry for every file created.

## Decisions Already Made

- Homepage uses `layout/entry.liquid` (not `theme.liquid`) via `{% layout 'entry' %}` in `templates/index.liquid`
- Background is CSS gradient by default; merchant swaps in photography via theme editor `image_picker`
- Shop nav item links to `/collections` directly — no modal
- Other 3 items (Story, Bespoke, Contact) open modal panels
- No footer or traditional nav on the entry page — just full-screen immersion
- `soie-et-forme-v3.html` prototype provides design tokens (colors, fonts) but NOT the layout

## Out of Scope

- The actual `/collections` and product pages (next plans)
- Cart drawer
- Mobile hamburger menu (theme.liquid nav collapses on mobile — entry page is naturally responsive)
- Real Shopify product data hookup

## Testing Plan

- [ ] `shopify theme dev` starts without errors
- [ ] Homepage loads: full-screen background visible, logo + tagline + 4 nav items centered
- [ ] Custom cursor visible and tracking mouse
- [ ] Shop item is a link (not a button), navigates to /collections on click
- [ ] Clicking "Our Story" → overlay fades in, modal slides up smoothly
- [ ] Modal content (title, body, CTA) visible and correct
- [ ] Clicking × closes modal smoothly
- [ ] Clicking outside modal (on overlay) closes it
- [ ] Pressing Escape closes it
- [ ] Opening one modal while another is open: previous closes, new one opens
- [ ] Mobile (375px): centered layout still works, text is readable, modals fit screen
- [ ] Theme editor (Shopify Customize): section settings editable, background image picker works
