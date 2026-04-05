# Design Spec

The visual design system for Soie & Forme. All design decisions are documented here. When in doubt, refer back to the existing `soie-et-forme-v3.html` prototype for reference.

---

## Color Tokens

Defined in `assets/base.css` as CSS custom properties:

```css
:root {
  --cream:      #FAF8F3;  /* page background — warm off-white */
  --cream-mid:  #EDE8DE;  /* slightly deeper cream — section alternates */
  --cream-deep: #D4CFC4;  /* deeper section background */
  --linen:      #C8C2B6;  /* borders, dividers, subtle UI elements */
  --ink:        #2C2C2A;  /* primary text — near-black, warm */
  --ink-soft:   #4A4A48;  /* secondary text */
  --ink-faint:  #8C8878;  /* tertiary text, labels, placeholders */
  --olive:      #708238;  /* brand accent — used sparingly */
  --olive-light:#8A9E45;  /* lighter olive for hover states */
  --olive-dim:  rgba(112, 130, 56, 0.10);  /* olive tint for backgrounds */
}
```

**Usage rules:**
- `--cream` is the default page background — never use pure white
- `--olive` is an accent only — never use it for large background areas
- The dark section (`--ink` as background, `--cream` as text) is used sparingly for high-contrast moments
- Never hardcode hex values in component CSS — always use the variable

---

## Typography

### Fonts

| Role | Font | Weight | Notes |
|---|---|---|---|
| Headings / display | Shippori Mincho | 400–800 | Editorial, slightly Japanese-influenced serif |
| Body / labels / mono | DM Mono | 300, 400 | Clean monospace — the brand's signature detail |

Load via Google Fonts in `layout/theme.liquid`:
```html
<link href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap" rel="stylesheet">
```

### Type Scale (CSS variables)

```css
:root {
  --font-serif: 'Shippori Mincho', serif;
  --font-mono:  'DM Mono', monospace;

  /* Display */
  --text-display:  clamp(48px, 8vw, 96px);
  --text-heading:  clamp(28px, 4vw, 48px);
  --text-subhead:  clamp(18px, 2.5vw, 24px);

  /* Body */
  --text-body:     16px;
  --text-small:    14px;
  --text-label:    10px;   /* eyebrow labels, nav links — always uppercase + tracked */
}
```

### Typographic Details

- **Eyebrow labels**: `font-size: var(--text-label)`, `letter-spacing: 0.32–0.42em`, `text-transform: uppercase`, `font-weight: 300`, color `var(--olive)`. Often preceded by a short `var(--olive)` horizontal rule.
- **Nav links**: `font-size: var(--text-label)`, `letter-spacing: 0.28em`, `font-weight: 300`, color `var(--ink-faint)` → `var(--ink)` on hover.
- **Body text**: `var(--font-mono)`, `var(--text-body)`, `font-weight: 300`, `line-height: 1.7`.
- **Headings**: `var(--font-serif)`. Use `font-weight: 700` for hero display, `500–600` for section headings.

---

## Spacing Scale

```css
:root {
  --space-xs:  8px;
  --space-sm:  16px;
  --space-md:  28px;
  --space-lg:  48px;
  --space-xl:  80px;
  --space-2xl: 120px;
  --space-3xl: 180px;
}
```

Sections have generous vertical padding — typically `var(--space-xl)` to `var(--space-3xl)` top and bottom.
Page-level horizontal padding: `60px` on desktop, reducing on mobile.

---

## Animation & Transitions

### Fade-in on load

Hero elements fade up from `opacity: 0` + `translateY(20px)` with staggered delays:

```css
@keyframes fadeUp {
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-up {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 1s ease forwards;
}
```

### Hover transitions

- Links: `color` transitions at `0.3s ease`
- Underline reveals: `width` from `0` to `100%` at `0.35s ease`
- Card/image scale: subtle `scale(1.02)` at `0.5s ease` — never more aggressive than this

### Fade-in on scroll

Elements below the fold use an `IntersectionObserver` to add an `is-visible` class:

```css
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.reveal.is-visible {
  opacity: 1;
  transform: none;
}
```

### Modal / overlay transitions

Modals fade in (`opacity: 0 → 1`) with a slight content fade-up (`translateY(16px) → 0`). Duration: `0.4s ease`.

### Navigation scroll state

Nav transitions from transparent/full-padding to frosted glass / compact-padding on scroll:
```css
nav.scrolled {
  padding: 16px 60px;
  background: rgba(250, 248, 243, 0.88);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(112, 130, 56, 0.12);
}
```

### Reduced motion

All animations must be suppressed for users who prefer reduced motion:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Custom Cursor

A signature brand detail. Two elements:

```html
<div class="cursor"></div>
<div class="cursor-ring"></div>
```

- `.cursor` — small olive dot (8×8px), `mix-blend-mode: multiply`
- `.cursor-ring` — larger transparent ring (36×36px, 1px olive border), follows with lag via JS

Hide native cursor: `body { cursor: none; }` — only when JS is confirmed loaded.

JS behavior:
- Both elements track `mousemove`
- Ring follows with eased delay (`requestAnimationFrame` lerp)
- On hover over links/buttons: dot expands, ring collapses to dot size
- Disappears at the body edge

---

## Noise Texture Overlay

A subtle film-grain effect applied as a fixed full-screen overlay:

```css
body::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* SVG fractal noise */
  pointer-events: none;
  z-index: 9000;
  opacity: 0.3;
}
```

This adds tactility without visible texture — if you can clearly see it, it's too strong.

---

## Section Backgrounds

Pages alternate between background values for depth:

```
--cream       ← default
--cream-mid   ← alternate
--cream-deep  ← deeper alternate
--linen       ← used for borders / dividers, occasionally for callout backgrounds
--ink         ← used sparingly for high-contrast dark sections
```
