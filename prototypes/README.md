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
| _(tbd)_ `atelier-table.html` | The Atelier Table — fixed backdrop, silk pieces glide in/out on scroll | `.claude/plans/todo-01-atelier-table-prototype.md` |
