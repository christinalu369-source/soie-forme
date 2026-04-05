# Definitions

Domain-specific terms, brand language, and Shopify concepts used in this project.

---

## Brand

**Soie & Forme** (French: "Silk & Form")
The store name. Pronounced approximately "swah ay form." The `&` in the logo is styled in italic olive — a recurring brand motif. Tagline: "Silk Essentials" (or similar — confirm with client).

**Aesthetic direction**
Quiet luxury. Cream backgrounds, olive accents, ink typography. Shippori Mincho for headings (editorial, Japanese-influenced serif), DM Mono for body and labels (clean, architectural monospace). Minimal ornamentation — every detail is intentional. Think: a Parisian fabric atelier that also has a beautiful website.

**Olive**
The brand's accent color (`#708238`). Used sparingly for hover states, underlines, eyebrow labels, and the `&` in the logo. Never use as a background for large areas.

---

## Fabric Vocabulary

**Silk**
The hero fabric category. Lustrous, smooth, temperature-regulating. Subcategories include charmeuse, crepe de chine, dupioni, habotai, organza, satin-weave silk, and tussah.

**Linen**
Natural, textured, breathable. Slightly more casual than silk but equally elegant at quality levels. Complements the brand's earthy cream palette.

**Chiffon**
Sheer, lightweight, floaty. Usually silk or polyester. Used in layered and draped garments.

**Crepe**
Fabric with a crinkled or granular surface texture. Can be silk, wool, or synthetic. Drapes beautifully.

**Satin**
A weave structure (not a fiber) that produces a glossy face and dull back. Often silk satin or polyester satin.

**Velvet**
Cut-pile fabric with a soft, dense nap. Silk velvet is the luxury tier.

**Twill**
Diagonal rib weave. Produces durable, drapey fabric — silk twill (used in scarves) is the most recognizable luxury example.

**GSM** (grams per square meter)
Weight measurement for fabric. Lighter GSM = sheerer/floatier. Higher GSM = denser/heavier.

**Hand (or "hand feel")**
How a fabric feels to the touch — its softness, smoothness, drape, and weight. Central to the brand experience.

---

## Shopify Concepts

**Theme**
The collection of Liquid, CSS, and JS files that define the storefront's appearance and behavior. This repo is the theme.

**Section**
A reusable, customizable block that merchants can add, remove, and reorder on pages via the theme editor. Lives in `sections/`. Has a `{% schema %}` block defining its settings.

**Block**
A sub-unit within a section. A "featured products" section might have individual product blocks that merchants can add/reorder.

**Snippet**
A reusable Liquid partial included with `{% render 'snippet-name' %}`. Has no schema — not directly editable in the theme editor.

**Template**
Defines which sections appear on a given page type. Lives in `templates/` as JSON (e.g. `templates/index.json`, `templates/product.json`).

**Layout**
The outer HTML shell wrapping every page. `layout/theme.liquid` contains the `<html>`, `<head>`, global nav, footer, and global scripts.

**Metafield**
Custom data attached to Shopify objects (products, collections, etc.) via the Shopify admin. Used to store extra content like fabric composition, care instructions, or origin story.

**Collection**
A group of products (Shopify's term for a category). E.g., "Silk Fabrics", "Linen", "New Arrivals".

**Variant**
A specific version of a product — e.g., a silk scarf in "Ivory / 90cm×90cm". Products can have multiple variants with different prices, inventory, and options.

**Storefront API**
Shopify's read-only API for fetching product, collection, and cart data. Used for headless/custom storefronts. Not used in this project — we use Liquid objects instead.

**Theme Editor**
Shopify's drag-and-drop customization UI (Customize button in admin). Merchants use it to edit section content and reorder sections without touching code.

**Dev Theme**
A non-published theme used for testing. Created with `shopify theme dev`. Changes here don't affect the live store.

---

## Add more terms below
