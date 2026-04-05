# Liquid Spec

How to use Liquid templating in this theme — section schemas, Shopify objects, and patterns to follow.

---

## Section Schema Pattern

Every customizable section ends with a `{% schema %}` block. Always include `"name"`, `"settings"`, and `"presets"`.

```liquid
{% schema %}
{
  "name": "Section Name",
  "tag": "section",
  "class": "section-name",
  "settings": [
    {
      "type": "header",
      "content": "Content"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Default heading text"
    },
    {
      "type": "richtext",
      "id": "body",
      "label": "Body text"
    },
    {
      "type": "image_picker",
      "id": "image",
      "label": "Image"
    },
    {
      "type": "url",
      "id": "button_url",
      "label": "Button link"
    },
    {
      "type": "text",
      "id": "button_label",
      "label": "Button label",
      "default": "Shop now"
    }
  ],
  "presets": [
    {
      "name": "Section Name"
    }
  ]
}
{% endschema %}
```

### Accessing settings in Liquid

```liquid
{{ section.settings.heading }}
{{ section.settings.body }}
{{ section.settings.image | image_url: width: 1200 | image_tag: loading: 'lazy', alt: section.settings.image.alt }}
```

---

## Blocks

Blocks let merchants add/remove/reorder sub-items within a section (e.g., multiple product cards, FAQ items).

```liquid
{% schema %}
{
  "name": "Featured Products",
  "blocks": [
    {
      "type": "product",
      "name": "Product",
      "settings": [
        {
          "type": "product",
          "id": "product",
          "label": "Product"
        }
      ]
    }
  ],
  "max_blocks": 6,
  "presets": [{ "name": "Featured Products" }]
}
{% endschema %}
```

Iterating over blocks in the template:
```liquid
{% for block in section.blocks %}
  {% assign product = block.settings.product %}
  {% render 'product-card', product: product %}
{% endfor %}
```

---

## Shopify Objects Reference

### Product

```liquid
{{ product.title }}
{{ product.description }}
{{ product.price | money }}
{{ product.compare_at_price | money }}
{{ product.featured_image | image_url: width: 800 | image_tag }}
{{ product.url }}

{% for variant in product.variants %}
  {{ variant.title }}
  {{ variant.price | money }}
  {{ variant.available }}
{% endfor %}
```

### Collection

```liquid
{{ collection.title }}
{{ collection.description }}
{{ collection.image | image_url: width: 1200 | image_tag }}

{% for product in collection.products %}
  {% render 'product-card', product: product %}
{% endfor %}
```

### Cart

```liquid
{{ cart.item_count }}
{{ cart.total_price | money }}

{% for item in cart.items %}
  {{ item.product.title }}
  {{ item.variant.title }}
  {{ item.quantity }}
  {{ item.price | money }}
  {{ item.image | image_url: width: 200 | image_tag }}
{% endfor %}
```

### Shop / Global

```liquid
{{ shop.name }}
{{ shop.currency }}
{{ shop.email }}
{{ settings.header_logo }}  {# from config/settings_schema.json #}
```

---

## Rendering Snippets

Always pass required variables explicitly:

```liquid
{% render 'product-card', product: product, show_vendor: true %}
{% render 'icon-cart' %}
{% render 'modal', id: 'about-modal', content: section.settings.body %}
```

Inside the snippet, access passed variables directly:
```liquid
{# snippets/product-card.liquid #}
<div class="product-card">
  <a href="{{ product.url }}">
    {{ product.featured_image | image_url: width: 600 | image_tag: alt: product.featured_image.alt, loading: 'lazy' }}
    <h3 class="product-card__title">{{ product.title }}</h3>
    <p class="product-card__price">{{ product.price | money }}</p>
  </a>
</div>
```

---

## Template JSON Structure

Templates in `templates/` are JSON files that list sections:

```json
{
  "sections": {
    "hero": {
      "type": "section-hero",
      "settings": {
        "heading": "Soie & Forme"
      }
    },
    "featured-collection": {
      "type": "section-featured-collection",
      "settings": {}
    }
  },
  "order": ["hero", "featured-collection"]
}
```

---

## Metafields

For custom product data (fabric composition, care instructions, origin), use Shopify metafields:

```liquid
{{ product.metafields.custom.fabric_composition }}
{{ product.metafields.custom.care_instructions }}
```

Metafields must be defined in Shopify admin → Settings → Custom data before they appear.

---

## Forms

### Add to cart

```liquid
{% form 'product', product %}
  <select name="id">
    {% for variant in product.variants %}
      <option value="{{ variant.id }}" {% unless variant.available %}disabled{% endunless %}>
        {{ variant.title }}
      </option>
    {% endfor %}
  </select>
  <button type="submit" {% unless product.available %}disabled{% endunless %}>
    {% if product.available %}Add to cart{% else %}Sold out{% endif %}
  </button>
{% endform %}
```

### Contact form

```liquid
{% form 'contact' %}
  {% if form.posted_successfully? %}
    <p>Message sent!</p>
  {% endif %}
  <input type="email" name="contact[email]" placeholder="Email">
  <textarea name="contact[body]" placeholder="Message"></textarea>
  <button type="submit">Send</button>
{% endform %}
```

---

## Useful Filters

```liquid
{{ product.price | money }}                  {# formats as currency #}
{{ image | image_url: width: 800 }}          {# generates a sized image URL #}
{{ image | image_tag: loading: 'lazy' }}     {# renders an <img> tag #}
{{ content | strip_html | truncate: 160 }}   {# strips HTML, truncates for meta desc #}
{{ product.url | within: collection }}       {# URL relative to current collection #}
{{ 'base.css' | asset_url | stylesheet_tag }}{# loads a CSS file from assets/ #}
```
