# Coding Standards

## Code Index

After completing every plan, update `.claude/docs/code-index.md` with an entry for each file created or significantly changed. One line per file:

```
path/to/file.liquid — what it does — key sections or variables
```

Do this at the end of the plan, not after each individual file.

---

## General

- Write clean, readable code — clarity over cleverness. Add a comment whenever something isn't immediately obvious.
- No build pipeline. All CSS and JS are plain files served directly from `assets/`. No TypeScript, no SCSS compilation, no bundlers.
- All files in `assets/` are flat — no subdirectories. Name them descriptively: `section-hero.css`, `component-product-card.js`, etc.

---

## Liquid

- Use Liquid's built-in filters and objects — don't reinvent what Shopify already provides.
- Keep logic out of templates. If a template is getting complex, extract a snippet.
- Snippets (`snippets/`) are for small, reusable partials. Sections (`sections/`) are for full page blocks with their own schema.
- Every section that is customizable via the theme editor must have a `{% schema %}` block at the bottom.
- Use `{{ 'file.css' | asset_url | stylesheet_tag }}` to load CSS — never hardcode asset paths.
- Use `{{ 'file.js' | asset_url | script_tag }}` to load JS — or prefer `<script src="{{ 'file.js' | asset_url }}" defer></script>` for deferred loading.
- Avoid `{% liquid %}` blocks unless you have multiple tags and it genuinely improves readability.
- Comment non-obvious Liquid logic: `{% comment %} explanation {% endcomment %}`.

---

## CSS

- Use CSS custom properties (variables) for all design tokens — colors, spacing, typography. Define them in `:root` in `assets/base.css`.
- Never hardcode color values or font sizes in component files — always reference a variable.
- Mobile-first: base styles are for small screens, then `@media (min-width: ...)` for larger.
- Naming: use BEM-style class names for components — `.product-card`, `.product-card__title`, `.product-card--featured`.
- Animations and transitions must respect `prefers-reduced-motion`:
  ```css
  @media (prefers-reduced-motion: reduce) {
    * { animation: none !important; transition: none !important; }
  }
  ```
- The custom cursor is JS-driven. Never use `cursor: none` in CSS without ensuring the JS cursor fallback is in place.

---

## JavaScript

- Vanilla JS only — no frameworks, no npm packages.
- Use `document.addEventListener('DOMContentLoaded', ...)` or defer attribute to ensure DOM is ready.
- Custom elements / Web Components are preferred for interactive UI pieces (modals, drawers, tabs).
- Never use `document.write()`.
- Prefer `const` over `let`; never use `var`.
- All event listeners should be added defensively — check that the element exists before calling `.addEventListener`.

---

## File Naming

- Sections: `section-[name].liquid` (e.g. `section-hero.liquid`, `section-featured-collection.liquid`)
- Snippets: `[name].liquid` (e.g. `product-card.liquid`, `icon-cart.liquid`)
- Templates: follow Shopify convention — `index.json`, `product.json`, `collection.json`, `page.json`, etc.
- CSS: `[scope]-[name].css` (e.g. `section-hero.css`, `component-modal.css`, `base.css`)
- JS: `[scope]-[name].js` (e.g. `section-hero.js`, `component-cart-drawer.js`, `global.js`)

---

## Section Schemas

Every customizable section needs a schema. Keep schemas clean and well-labeled:

```liquid
{% schema %}
{
  "name": "Hero",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Soie & Forme"
    }
  ],
  "presets": [
    {
      "name": "Hero"
    }
  ]
}
{% endschema %}
```

- Always provide a `"default"` for text/richtext/select settings so the section looks reasonable out of the box.
- Group related settings with `"type": "header"` dividers.
- Use `"type": "image_picker"` for any image — never hardcode image paths.

---

## Accessibility

- All images must have meaningful `alt` attributes — use Liquid to pull from product/media alt text where available.
- Interactive elements (buttons, links) must be keyboard-accessible.
- Modal and drawer components must trap focus while open and restore focus on close.
- Color contrast must meet WCAG AA for body text on background.
