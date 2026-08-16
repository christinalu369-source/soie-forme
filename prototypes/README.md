# Prototypes

Throwaway static HTML/CSS/JS mockups for exploring UI directions **before** committing them to Liquid.

## Why this folder exists

- **Fast iteration** — no Shopify/Liquid overhead, no theme editor round-trips. Open the file in a browser and reload.
- **Safe** — this folder is **not** in the Shopify-synced theme directories (`assets/ config/ layout/ locales/ sections/ snippets/ templates/`), so nothing here can ever touch the live store.
- **Disposable** — prototypes are meant to be argued with and thrown away. The winner gets ported to Liquid; the rest are reference.

Precedent: the design system was originally prototyped in `soie-et-forme-v3.html` (referenced in `.claude/specs/design-spec.md`).

## Conventions

- Pull design tokens from the real system where practical (cream/olive/ink palette, Shippori Mincho + DM Mono) so mockups read as on-brand.
- Use obvious placeholders for media (`placeholder-*.jpg`, solid-color blocks, or short looping `<video>` stubs). Do not commit large binary assets here — reference them or use tiny placeholders.
- One self-contained file per direction where possible (inline `<style>`/`<script>`), or a shared `prototype-shared.css` if several directions converge.
- Mobile-first: design and test at 390px width first, then scale up.

## Current explorations

| File | Direction | Plan |
|---|---|---|
| `atelier-table.html` | The Atelier Table — fixed backdrop, silk pieces glide in from the side / rest / exit on scroll, soft "shop this" sheet | `.claude/plans/in-progress-01-atelier-table-prototype.md` |
| `silk-panels.html` | Silk Panels / Editorial — Tiffany-style editorial scroll: normal-flow sections of varied size (incl. **two panels on one screen**). Each panel **slides/fades in once as it enters, then settles and holds** in place (no continuous scroll-linking) | `.claude/plans/in-progress-01-atelier-table-prototype.md` |
| `silk-panels-2.html` | Silk Panels II / Extend — same reveal-and-hold animation, but each panel is a **~66% full-bleed image that extends in from one edge** (alternating sides) with the copy in the remaining **~34%, fading in**. Follows the Tiffany image-block layout; includes a video play affordance | `.claude/plans/in-progress-01-atelier-table-prototype.md` |
| `lookbook-swipe.html` | Lookbook Swipe — full-screen pieces you **swipe sideways** through (Instagram/TikTok Stories paradigm); slim story progress bars, tap zones + arrow keys | `.claude/plans/in-progress-01-atelier-table-prototype.md` |
| `scrubbable-film.html` | Scrubbable Film — a pinned "player"; **scroll scrubs a continuous silk shot frame-by-frame** (Apple-style); frame counter + captions. Placeholder for real video | `.claude/plans/in-progress-01-atelier-table-prototype.md` |
| `scarf-transforms.html` | Scarf Transforms — one **pinned scarf morphs through tied states** (Square → Fold → Knot → Drape) as you scroll; state ticks | `.claude/plans/in-progress-01-atelier-table-prototype.md` |
| `kinetic-type.html` | Kinetic Type — big **scroll-driven marquee word-bands** parallaxing between silk image panels; fashion-editorial rhythm | `.claude/plans/in-progress-01-atelier-table-prototype.md` |
| `zoom-matchcut.html` | Zoom / Match-Cut — scroll drives a **continuous cinematic push-in** through nested silk scenes (scarf → motif → weave → thread); poetic captions | `.claude/plans/in-progress-01-atelier-table-prototype.md` |
| `card-deck.html` | Card-Flick Deck — products as a **stack of cards you flick away** with your thumb (drag/arrows), spring-back, back/next, in-card shop. Single-screen | `.claude/plans/in-progress-01-atelier-table-prototype.md` |
| `hero-options.html` | Hero Treatments — **three first-screen directions with a top switcher**: A Cinematic (full-bleed silk motion + type over scrim), B Split (image + cream type panel), C Mosaic (editorial tile grid + title overlay) | `.claude/plans/todo-00-atelier-table-northstar.md` |
| `silk-story.html` | A Story in Silk — full-bleed slides that **cross-fade** on vertical scroll (no slide-in, so no diagonal illusion). Horizontally-divided composition (full image + horizontal caption band) = smooth "story panels." The "animated Tiffany" direction | `.claude/plans/in-progress-01-atelier-table-prototype.md` |

## How to view

Just open the file in a browser — no server needed:

```
open prototypes/atelier-table.html          # macOS
```

Then use the browser's device toolbar (mobile emulation, ~390px) to feel the intended mobile experience.
