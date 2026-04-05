# Shopify Deployment Rules

These rules govern how theme changes are tested and deployed. Follow them unconditionally.

---

## The Rule

**Never edit the live (published) theme directly. Always develop on a separate dev theme. GitHub is the source of truth.**

---

## Theme Tiers

| Theme | Purpose | How to edit |
|---|---|---|
| **Live theme** (published) | What customers see | Merge into `main` → GitHub sync deploys it |
| **Dev theme** | Testing and development | `shopify theme dev` or push a named dev theme |
| **Backup theme** | Safety copy before major changes | Duplicate live theme in Shopify admin before merging |

---

## Workflow

### Starting work

1. Branch off `main` in git (see `git-workflow.md`)
2. Run `shopify theme dev --store your-store.myshopify.com` to spin up a local dev server pointing at your feature branch
3. All changes are previewed at the local dev URL — nothing touches the live store

### Before merging to main

- Visually verify the feature in the Shopify dev theme preview
- Check mobile layout (Shopify's theme preview has a device toggle)
- Confirm the section/block appears correctly in the theme editor (if it's a new section)
- No TypeScript/test suite to run — verification is visual

### Merging to main = deploying to live

When you merge a feature branch into `main`, Shopify's GitHub integration automatically syncs the updated files to the connected live theme. **This is a live deployment.** Treat it accordingly:

- Only merge when the feature is fully verified
- If something goes wrong, restore from the backup theme in Shopify admin

---

## What GitHub Syncs

Shopify's GitHub integration watches the connected branch (typically `main`) and syncs:

```
assets/
config/
layout/
locales/
sections/
snippets/
templates/
```

It does **not** sync:
- `.claude/`
- `CLAUDE.md`
- `.env` / `.env.example`
- `README.md`
- Any file not in the theme directories above

---

## Shopify-Specific Cautions

- **Don't delete sections or snippets** that are referenced in `config/settings_data.json` or active templates — this will break the live theme.
- **Don't rename template files** without updating all references to them.
- **`config/settings_data.json`** holds live theme editor settings. Changes to this file will overwrite merchant-configured settings. Edit carefully.
- **`config/settings_schema.json`** defines what settings the theme exposes. Changes here affect what merchants can configure in the editor.

---

## If You're Unsure Whether a Change Is Safe

**Test it in the dev theme first.** If it breaks there, it would have broken production. Fix it before merging.
