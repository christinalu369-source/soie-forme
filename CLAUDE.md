# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Soie & Forme** is a custom Shopify theme for an elegant fabric and textile store. It is version-controlled on GitHub and synced to Shopify via GitHub integration. The theme is built with Liquid, CSS, and vanilla JavaScript — no Node/React/TypeScript build pipeline.

The aesthetic direction is: **quiet luxury** — cream and olive palette, Shippori Mincho serif + DM Mono monospace, smooth fade transitions, custom cursor, minimal ornamentation.

---

## Rules — Load on Every Session

Read and apply all of the following rules at the start of every session, unconditionally:

- `.claude/rules/data-privacy.md` — secrets, API keys, and what must never be committed
- `.claude/rules/coding-standards.md` — Liquid, CSS, and JS conventions for this theme
- `.claude/rules/shopify-deployment.md` — how to safely test and deploy theme changes
- `.claude/rules/git-workflow.md` — branch, commit, merge, and cleanup process for every plan

These rules are non-negotiable and apply to every task regardless of scope.

---

## Docs — Load at Session Start

Read these once at the start of every session:

- `.claude/docs/architecture.md` — Shopify theme file structure, Liquid rendering pipeline, how sections/snippets/templates fit together
- `.claude/docs/definitions.md` — brand terms, fabric vocabulary, Shopify-specific terminology

## Specs and Docs — Load on Demand

Do not load these at session start. Read them when the trigger condition is met — before responding, not after.

| File | Load when... |
|---|---|
| `.claude/specs/features.md` | User discusses a new feature, asks what's planned, or wants to start a plan |
| `.claude/specs/project-spec.md` | User asks about scope, tech stack, or what the project does/doesn't include |
| `.claude/specs/design-spec.md` | Anything involving colors, typography, spacing, animations, or visual style |
| `.claude/specs/liquid-spec.md` | Anything involving Liquid templates, section schemas, blocks, or Shopify objects |
| `.claude/specs/pages-spec.md` | Anything involving a specific page layout, template file, or page-level structure |
| `.claude/docs/shopify-dev-setup.md` | Anything involving local dev setup, Shopify CLI, or connecting to a dev store |
| `.claude/docs/code-index.md` | Navigating the codebase, finding a file, or understanding what exists (skip if empty) |

---

## Plans

All plans live in `.claude/plans/`. Use `template.md` as a starting point.

File naming convention shows status at a glance:

| Prefix | Meaning |
|---|---|
| `todo-` | not started |
| `in-progress-` | currently being executed |
| `done-` | completed |

Example: `todo-build-hero-section.md` → `in-progress-build-hero-section.md` → `done-build-hero-section.md`

When executing a plan, rename the file to `in-progress-` at the start and `done-` when every step is complete. Update the corresponding feature status in `.claude/specs/features.md` to match.

---

## Quick Reference

| What | Where |
|---|---|
| Rules | `.claude/rules/` |
| Feature backlog | `.claude/specs/features.md` |
| Specs | `.claude/specs/` |
| Architecture + definitions | `.claude/docs/` |
| Plans | `.claude/plans/` |
| Slash commands | `.claude/commands/` |
