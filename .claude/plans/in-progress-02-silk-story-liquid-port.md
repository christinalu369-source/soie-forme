# Plan: A Story in Silk — Liquid Port

**Status:** in-progress
> Supersedes `todo-02-atelier-table-liquid-port.md`. The approved direction is
> `prototypes/silk-story.html` ("A Story in Silk"), not the Atelier Table.
> Decision: it replaces the homepage.

## Goal
Port the approved "A Story in Silk" prototype into the live Shopify theme as the
homepage — a real, theme-editable section with the shop affordances wired to
actual products and the cart.

## What was built
1. **`sections/section-silk-story.liquid`** — scenes rendered server-side from
   three block types: `hero` (cinematic cover screen, treatment A from
   `prototypes/hero-options.html`), `card` (closing beat) and `scene` (chapter,
   line, caption, photo, optional product). Full `{% schema %}`, `max_blocks: 12`.
2. **`assets/section-silk-story.css`** — prototype styles with literals replaced
   by `base.css` tokens, BEM naming, reduced-motion handling, editorial split at
   900px. New type-scale tokens (`--text-display` etc.) added to `base.css`.
3. **`assets/section-silk-story.js`** — scroll-driven cross-fade engine,
   filmstrip navigation, soft add-to-cart reusing the `/cart/add.js` pattern
   from `section-product-main.js`. Faded scenes get `inert` so hidden controls
   leave the tab order.
4. **`layout/story.liquid`** — immersive layout (no nav/footer), modelled on
   `layout/entry.liquid`. Scopes scroll-snap to this template via `.story-scroll`.
5. **`templates/index.liquid`** — now renders the story on the story layout.
6. **`config/settings_data.json`** — seeded with the six story beats.

## Decisions Made
- Homepage takeover (not a dedicated route) — the user's call.
- `sections/section-entry.liquid` is kept, not deleted: still referenced in
  `settings_data.json`, and it is the way back if the story is reverted.
- Single-variant products add straight to cart; multi-variant and sold-out
  products link to the product page so the customer picks the variant.
- Scenes fall back to a two-colour wash when no photo is set.
- The cover screen is the Cinematic hero, not a plain title card — drifting
  silk under a scrim with cream type over it.

## Story structure (set 2026-09-22)
| # | Scene | Copy | Media the user is supplying |
|---|---|---|---|
| 1 | Cover | "A story, in silk" — CTA scrolls to scene 2 | Cover photo or film |
| 2 | Ways to wear | "A hundred ways to wear it." | Short video (1-2 ways in motion) + up to 6 stills for the collage lightbox |
| 3 | History | "It travelled further than we did." | Short video: silk history + Silk Road |
| 4 | 绫罗绸缎 | The four classical weaves | Short video: the differences between them |
| 5 | Lifestyle | "It moves the way you do." | Short video: silk moving in the air |
| 6 | Closing | "Now, your turn." — shop + links | — |

Any scene can also open a photo-collage lightbox from its caption band
(`gallery_label` + up to six `gallery_N` images with captions). Used on scene 2:
the video carries a couple of ways in motion, the collage carries the rest.
The lightbox pins the body while open — scroll position drives the deck, so the
engine is held via the `openGallery` guard in frame().

Scene videos are silent, looping, `preload="none"`, and play only while their
scene is on screen (`setScenePlayback` in the JS). Each scene still has an
optional product picker if a "Shop this piece" pill is wanted on any of them.

## Open / Follow-up
- [ ] **Media.** The user is supplying one cover still/film plus four short
      videos. Until then every scene is a colour wash.
- [ ] **Products.** Handles were dropped in the content rewrite; scenes are
      editorial now. Add a product per scene in the theme editor if a shop
      pill is wanted.
- [ ] **No global nav on the homepage.** By design (immersive), but the only
      ways out are the shop pills and the closing card's links. Revisit if
      analytics show people getting stuck.

## Testing Plan
- [x] Section markup renders; schema is valid JSON.
- [x] Cross-fade engine verified numerically (scroll one step → scene 0 fades
      out, scene 1 in).
- [x] Stacked layout: caption band clears the filmstrip.
- [x] Wide layout (>=900px): editorial split, pill hugs its content.
- [x] No-JS / pre-JS: opening scene is painted rather than a blank page.
- [ ] **Dev theme verification** — `shopify theme dev`, real device, theme
      editor block add/remove/reorder. Not yet done; required before merge.
- [ ] Add to cart against a real product adds the right variant.
- [ ] Reduced-motion and keyboard pass on a real browser.
