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
| `silk-panels.html` | Silk Panels / Stack — layered vertical stack; the previous panel lingers on top as it exits while the next **slides up underneath it** from the bottom (soft shadow at the seam). Vertical scroll stays visible | `.claude/plans/in-progress-01-atelier-table-prototype.md` |
| `silk-story.html` | A Story in Silk — full-bleed slides that **cross-fade** on vertical scroll (no slide-in, so no diagonal illusion). Horizontally-divided composition (full image + horizontal caption band) = smooth "story panels." The "animated Tiffany" direction | `.claude/plans/in-progress-01-atelier-table-prototype.md` |

## How to view

Just open the file in a browser — no server needed:

```
open prototypes/atelier-table.html          # macOS
```

Then use the browser's device toolbar (mobile emulation, ~390px) to feel the intended mobile experience.
