# Plan: The Atelier Table — North Star

**Status:** todo
> This is the umbrella/vision plan. It is not built directly — it governs the prototype (`todo-01`) and the Liquid port (`todo-02`). Keep it as a living reference.

## Goal
Reimagine the Soie & Forme storefront as a **mobile-first, content-driven, immersive scroll experience** — a private-viewing feeling where silk pieces are "presented" to the visitor — with commerce embedded softly rather than front-and-center. The goal is a site people visit for the *content* (shareable on a phone), with a quiet, always-available path to buy.

## Context
Today's storefront is click-based and PC-oriented (modal nav, hover interactions, grid pages). The brand — silk scarves — sells on drape, styling, and story, not spec sheets. This is a strategic pivot toward an experience that travels on mobile.

Relevant reading before executing any child plan:
- `.claude/specs/design-spec.md` — palette, type, motion, cursor, noise texture (reuse these tokens)
- `.claude/specs/project-spec.md` — purpose, tech stack, routes, out-of-scope
- `.claude/specs/features.md` — feature pipeline
- `data/shopify-product-import.csv` — the 88-SKU catalog with the styling/story copy that feeds content
- Existing entry experience: `sections/section-entry.liquid` + `assets/section-entry.js` (the current animated landing to be superseded/absorbed)

## The Signature Interaction — "The Atelier Table"
A boutique associate lays pieces across a table in front of you, one at a time. That is the core metaphor.

- **Fixed backdrop ("the table").** A warm cream/linen surface stays largely static as you scroll — soft top-down light, faint tabletop grain, the brand's noise overlay. Only gentle parallax; the *pieces* move, the table mostly doesn't.
- **Pieces glide in and out.** As you scroll, a silk piece (large photo or looping video of fabric) slides in from the edge, settles center-stage, is "presented" (a short editorial caption + story fades in), then slides off as the next piece is laid down. Vertical scroll drives a horizontal presentation. New pieces overlap/stack slightly over old ones — like real cloth.
- **Presentation beat.** When a piece is at rest center-stage, it holds — this is the readable, screenshot-able, shareable moment.
- **Soft commerce.** At rest, a discreet `shop this piece ▸` tab slides up. Tapping slides in a quiet product panel (name, price, "ways to tie it" loop, add-to-cart). Never a hard sell; always dismissible.
- **Mobile-first & touch-native.** Full-bleed, swipe-friendly, thumb-reachable controls. `hover` is never required for any core interaction.

## How the three references blend
- **Immersive scrollytelling (HTML5UP Story / Tiffany)** → the fixed-backdrop, scroll-driven chapter *structure* — but more dynamic than either, because pieces physically glide across the table rather than just cross-fading.
- **Editorial magazine (Margot Priolet / LVMH Prize)** → the *content* layer: each piece carries a real editorial caption/story; an index/contents entry point; article-level depth for those who scroll in.
- **Modern product showcase (Allbirds)** → the *reveal mechanics*, reinterpreted for touch: scroll-triggered reveal + soft "shop this," replacing desktop hover-to-pop.

## Decisions Already Made
- **Commerce posture:** content-first, soft commerce. Story is the front door; buying is available but whispered. (Not a full store with a blog bolted on; not pure content with no cart.)
- **Primary direction:** immersive scrollytelling, with elements of magazine + showcase blended in.
- **More dynamic than the reference templates:** pieces flow *in and out* across a mostly-static backdrop — the "cloth slid across a table" feel, not simple fades.
- **Process:** hybrid. Prototype the risky interaction as static HTML first (`todo-01`), port the winner to Liquid + soft commerce (`todo-02`).
- **Tech constraints unchanged:** vanilla CSS + JS, no build pipeline, reuse existing design tokens, respect `prefers-reduced-motion`.

## Media Strategy (decided 2026-08-16)
Direction chosen: **photography-first, with a little video.** Model the background/media as **three layers**, each with a different job:

1. **Ambient canvas — keep it quiet (generative/CSS).** Cream/olive fields, film grain, the "table" surface, subtle sheen. This stays as-is; a near-empty background is a *feature* of quiet luxury. **Never put busy photo/video behind editorial text** — it kills legibility and reads less premium.
2. **Product media — photography (primary, the backbone).** Real stills fill the panels/lookbook/diptych/66%-extend: worn & styled, flat-lay, close-up weave and hand-rolled hem, one strong image per product. Consistent art direction (natural light, cream/olive world, restrained). This is ~80% of the media.
3. **Signature motion — video (sparingly, 1–3 spots only).** Use where the media *is* the content, not as a backdrop: (a) a hero "how silk moves" loop, (b) `scrubbable-film` (a tie/fall sequence or image sequence), (c) `scarf-transforms` (a tie-it demo). Specs: short (~6–12s) muted loop, `autoplay muted playsinline loop`, **poster-image fallback**, **paused under `prefers-reduced-motion`**, lazy-loaded, small/optimized with multiple resolutions. Prefer external/CDN hosting for hero loops (Shopify video has size limits).

**Build implication:** every section must expose a **media slot that accepts an image OR a video** (a snippet that renders `<video>`+poster when a video is set, else `<img>`). That lets us ship photo-first now and drop video into the 1–3 hero spots later without rebuilding. Always require `alt` text.

## Open Questions
- [ ] Is the entry page (`section-entry`) replaced by the Atelier Table, or does it remain as a "curtain" that opens into it?
- [ ] How many pieces per "table session" before it feels long on mobile? (Guess: 5–7 chapters.)
- [ ] Does soft commerce use the existing cart/AJAX from `section-product-main.js`, or a new lightweight cart affordance?
- [x] ~~Real video vs. photo for the "presentation"~~ → **Resolved: photo-first + 1–3 video moments. See Media Strategy above.**
- [ ] Which 3 spots get video, and can we source those clips? (Candidates: hero, scrubbable-film, scarf-transforms.)
- [ ] Does this become the homepage (`templates/index`) or a new dedicated route first (e.g. `/pages/atelier`) so it can ship without replacing the live home?

## Out of Scope
- Building any Liquid in this plan (that's `todo-02`).
- Producing final photography/video — placeholders only until direction is approved.
- Checkout/cart backend changes — Shopify handles commerce; we only add soft entry points.
- Customer accounts, wishlists, reviews (still out of scope per `project-spec.md`).

## Testing Plan
This plan has no build output of its own. It is "done" when:
- [ ] `todo-01` prototype is built and reviewed, and one direction is chosen.
- [ ] `todo-02` port is scoped against the chosen prototype.
- [ ] The open questions above are answered and recorded in the relevant child plan.
