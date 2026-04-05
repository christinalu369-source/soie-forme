# Shopify Dev Setup

How to set up local theme development and connect to the Shopify store.

---

## Prerequisites

1. **Node.js** — Shopify CLI requires Node 18+
2. **Shopify CLI** — install globally:
   ```
   npm install -g @shopify/cli @shopify/theme
   ```
3. **A Shopify Partner account** — needed to create a development store for testing
4. **Access to the store** — you need staff/collaborator access to the actual store

---

## First-Time Setup

### 1. Clone the repo

```
git clone https://github.com/your-org/soieforme.git
cd soieforme
```

### 2. Authenticate with Shopify CLI

```
shopify auth login --store your-store.myshopify.com
```

This opens a browser to authenticate. Your auth token is stored in `.shopify/` (gitignored).

### 3. Start the local dev server

```
shopify theme dev --store your-store.myshopify.com
```

This:
- Uploads your local theme files to a temporary dev theme on the store
- Watches for file changes and hot-reloads
- Gives you a local preview URL (e.g. `http://127.0.0.1:9292`)
- Gives you a shareable preview URL on the Shopify store

**The dev theme is separate from the live published theme — shoppers don't see it.**

---

## Day-to-Day Development

```
1. git checkout -b feature/my-feature    ← create a branch
2. shopify theme dev --store ...         ← start dev server
3. Edit files → browser auto-reloads    ← develop
4. git add / git commit -m "step N: ..." ← commit each step
5. Verify in Shopify theme editor        ← test
6. Merge to main                        ← deploys to live store via GitHub
```

---

## GitHub ↔ Shopify Integration

To connect the repo to Shopify's automatic sync:

1. In Shopify Admin → **Online Store → Themes**
2. Click **Add theme → Connect from GitHub**
3. Authorize the GitHub app
4. Select the repo and `main` branch
5. Shopify will sync theme files whenever `main` is updated

After this is set up, pushing to `main` = deploying to the live theme.

---

## Useful CLI Commands

| Command | What it does |
|---|---|
| `shopify theme dev` | Start local dev server with live reload |
| `shopify theme push` | Push local files to a specific theme (not the live one) |
| `shopify theme pull` | Pull the current live theme files down locally |
| `shopify theme list` | List all themes on the store |
| `shopify theme share` | Generate a shareable preview URL |

---

## Environment File

Create a `.env` file locally (never commit it):

```
SHOPIFY_FLAG_STORE=your-store.myshopify.com
```

This lets you run `shopify theme dev` without the `--store` flag every time.

`.env.example` (committed, no real values):
```
SHOPIFY_FLAG_STORE=your-store.myshopify.com
```

---

## Notes

- The Shopify CLI creates a `.shopify/` folder locally for auth tokens — this is gitignored
- You can have multiple themes on a store (live, dev, backup) — `shopify theme list` shows them all
- `shopify theme pull` is useful if a merchant made changes in the theme editor that aren't reflected in git yet — but always reconcile carefully to avoid overwriting code changes
