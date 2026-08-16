# Plan: The Atelier Table — Static Prototype

**Status:** todo
> Governed by `todo-00-atelier-table-northstar.md`. This plan produces a throwaway HTML/CSS/JS mockup in `prototypes/` — no Liquid, no Shopify.

## Goal
Build a self-contained static prototype of the "Atelier Table" scroll experience so we can *feel* the core interaction on a phone and iterate fast, before committing anything to Liquid.

## Context
- The risky, novel part of this whole effort is the interaction: **a mostly-static backdrop with silk pieces gliding in/out as you scroll.** Everything else (content, commerce) is comparatively low-risk. So we prototype the interaction in isolation.
- Lives in `prototypes/` — outside Shopify-synced dirs, safe by construction (see `prototypes/README.md`).
- Reuse the design tokens and motion language from `.claude/specs/design-spec.md` so it reads on-brand: cream/olive/ink palette, Shippori Mincho + DM Mono, noise overlay, `prefers-reduced-motion` support.

## Steps
1. **Scaffold `prototypes/atelier-table.html`** — a single self-contained file (inline `<style>`/`<script>`), mobile-first at 390px. Pull in Google Fonts (Shippori Mincho + DM Mono) and inline the core color/space/type CSS variables from `base.css` so it matches the real system.
2. **Build the fixed backdrop ("the table")** — a full-viewport `position: fixed` cream/linen surface with a soft radial top-light, faint grain, and the brand noise overlay. This layer stays put while content scrolls over it.
3. **Build the piece/chapter structure** — 5–7 stacked full-height scroll sections, each representing one silk "piece." Use scroll-snap for the settle-and-hold beat. Each section holds: a large media block (placeholder image or short looping `<video>` stub), an editorial caption (eyebrow + serif title + mono story line).
4. **Implement the glide-in/out mechanic** — as each section enters, its piece slides in from the edge and settles center-stage; as it leaves, it slides off while the next overlaps in. Drive transforms from scroll progress:
   - Primary: CSS scroll-driven animations (`animation-timeline: view()`) for buttery, JS-light motion.
   - Fallback: `IntersectionObserver` + a scroll-progress-to-CSS-custom-property (`--progress`) shim for browsers without scroll timelines.
   - Overlap/stack: new piece has higher z-index and slides over the outgoing one — the "cloth on cloth" feel.
5. **Add the presentation hold + soft commerce affordance** — when a piece is centered, a discreet `shop this piece ▸` tab slides up. Tapping slides in a quiet product panel (placeholder: name, price, a "ways to tie it" loop stub, a fake add-to-cart button). Fully dismissible. This is a *mock* — no real cart.
6. **Add an entry/contents beat** — a short opening panel (the "curtain") and an optional slim progress/index indicator so a long scroll feels navigable on mobile.
7. **Reduced-motion + touch pass** — verify `prefers-reduced-motion` collapses glides to simple fades; verify all interactions work by touch/swipe with no hover dependency; check thumb reach for the shop tab.
8. **(Optional) A/B variants** — if useful, fork one or two alternate treatments (e.g. horizontal-drag pieces vs. vertical-glide pieces) as `atelier-table-b.html` for side-by-side comparison. Log any variant so nothing is silently dropped.

## Decisions Already Made
- Static HTML/CSS/JS only; vanilla; no build; no frameworks.
- Mobile-first (design at 390px, then scale up).
- Placeholder media only — no final photography/video.
- On-brand tokens reused from the design system.

## Open Questions
- [ ] Scroll-snap per piece, or free-scroll with snap only at rest points? (Decide during step 3 by feel.)
- [ ] CSS scroll-driven animations alone (simpler) vs. JS scroll-progress (more control, wider support)? (Prototype both in step 4, keep whichever feels better.)
- [ ] How many pieces before mobile fatigue? Start at 6, tune.

## Out of Scope
- Any Liquid / Shopify integration (→ `todo-02`).
- Real cart, real checkout, real product data (mock panel only).
- Final assets.

## Testing Plan
Verification is visual, in a browser (primarily mobile viewport / device emulation).
- [ ] Open `prototypes/atelier-table.html` at 390px — pieces glide in, hold center-stage readably, glide out; backdrop stays fixed.
- [ ] Scroll feels like "pieces slid across a table," not simple cross-fades.
- [ ] `shop this piece ▸` tab appears at rest and opens/closes the soft panel by touch.
- [ ] No interaction requires hover; works by swipe/tap.
- [ ] `prefers-reduced-motion: reduce` collapses motion to fades with no broken layout.
- [ ] Scales gracefully from 390px up to desktop width.
- [ ] Reads on-brand (correct fonts, palette, noise, quiet-luxury restraint).
