# Git Workflow

Follow this workflow for every plan or feature without exception. Main must always be in a deployable state — merging to main triggers a live Shopify deployment.

---

## 1. Before Starting a Plan

Check the current branch and status:
```
git status
git branch
```

**If not on main — stop and check with the user:**
- Is there unfinished work on this branch?
- Should it be committed, stashed, or abandoned before switching?
- Never switch away from a branch with uncommitted changes without confirming with the user first

**If on main, pull latest:**
```
git pull origin main
```

**If there are uncommitted diffs on main — stop and check with the user:**
- These should not exist on main. Ask whether to commit them, stash them, or investigate before proceeding.

Only proceed once: on main, clean, and up to date.

---

## 2. Create a Feature Branch

Name the branch after the plan, lowercase with hyphens:
```
git checkout -b feature/plan-name
```

Examples: `feature/hero-section`, `feature/product-card`, `feature/cart-drawer`, `feature/mobile-nav`

All development for this plan happens on this branch. Never commit plan work directly to main.

---

## 3. Commit After Each Plan Step

After completing each numbered step in the plan, make a commit:
```
git add <specific files changed>
git commit -m "step N: <what this step accomplishes and why>"
```

**Commit message rules:**
- Start with the step number: `step 1:`, `step 2:`, etc.
- Describe what the change accomplishes, not just what files changed
- Example: `step 2: add hero section with fade-in animation and olive accent`
- Bad example: `updated hero.liquid`

Never batch multiple steps into one commit — one step, one commit.

---

## 4. Finishing the Plan

Once all steps are complete:

**a) Work through the Testing Plan**
Every plan must include a Testing Plan section. Work through each checkbox before proceeding — do not skip or mark done without verifying. Verification for this project is visual (see `.claude/rules/shopify-deployment.md`):
- Run `shopify theme dev` and check the feature in the browser
- Check mobile layout using Shopify's device preview toggle
- Check the section appears correctly in the Shopify theme editor (if applicable)

**b) Confirm with user before merging**
Merging to main = deploying to the live store. Always check with the user before proceeding.

**c) Merge into main**
```
git checkout main
git pull origin main
git merge feature/plan-name
git push origin main
```

If there are merge conflicts, resolve them carefully — ask the user if anything is unclear.

**d) Delete the feature branch**
```
git branch -d feature/plan-name
```

---

## 5. Post-Merge Cleanup

After merging, update the following before closing out the plan:

- **`.claude/plans/`** — rename the plan file from `in-progress-` to `done-`
- **`.claude/specs/features.md`** — update the feature status to `done` and add the plan filename
- **`.claude/docs/code-index.md`** — add entries for all new files created
- **`README.md`** — update if any new setup steps or commands were added
- **Any spec or doc that is now out of date** — update to reflect what was actually built

---

## 6. Session Summary

After completing all cleanup, output a summary to the user covering:

1. **What was built** — plain English description of the feature
2. **Files created or changed** — list with one-line descriptions
3. **How to preview it** — any commands or steps needed to see the change
4. **What was updated** — which docs, specs, plans were changed
5. **Any open issues or follow-up** — things noticed during development worth tracking

---

## Branch Naming Reference

| Type | Pattern | Example |
|---|---|---|
| Feature / plan | `feature/plan-name` | `feature/hero-section` |
| Bug fix | `fix/description` | `fix/mobile-nav-overlap` |
| Docs / config only | `chore/description` | `chore/update-readme` |
