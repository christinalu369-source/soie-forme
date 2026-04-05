# Data Privacy Rules

These rules govern how secrets and credentials are handled in this project.

---

## 1. Secrets and API Keys

**Rule:** Never read, print, log, suggest hardcoding, or reference the contents of any `.env` file or secrets file.

### What counts as a secrets file

- `.env`, `.env.local`, `.env.production`, `.env.*` — any variant
- Any file named `secrets.*`, `credentials.*`, `*.key`, `*.pem`

### Credentials used in this project

| File | Purpose | Committed? |
|---|---|---|
| `.env` | Shopify CLI auth, storefront API tokens | Never |
| `.env.example` | Template with placeholder variable names | Yes |

- Never hardcode API tokens, storefront access tokens, or admin API credentials in any theme file
- Storefront API tokens that appear in Liquid are read-only public tokens — still don't hardcode them; use theme settings or `config/settings_data.json`

### When writing code that references a secret

- Reference it via an environment variable or Shopify theme setting — never inline
- Add the variable name (not its value) to `.env.example`

---

## 2. .gitignore Requirements

The following must always be present in `.gitignore`. Add them if missing; never remove them:

```
# Secrets
.env
.env.*
!.env.example

# Shopify CLI
.shopify/

# OS
.DS_Store
Thumbs.db

# Node (if Shopify CLI or tooling is installed locally)
node_modules/
```

---

## Summary

| What | Committed? |
|---|---|
| `.env` (API keys, tokens) | Never |
| `.env.example` (placeholder names only) | Yes |
| Theme Liquid/CSS/JS files | Yes |
| `config/settings_data.json` | Yes (no secrets in it) |
| `.shopify/` CLI auth cache | Never |
