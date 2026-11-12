# Documentation Examples Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace unrelated services with prepared stage П/Р documentation groups and remove the bottom Documents block.

**Architecture:** Keep the static HTML/CSS site and native browser PDF handling. Remove only the obsolete accordion dependency from the shared script and page generator.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Node built-in tests.

**Spec:** `docs/superpowers/specs/2026-11-12-documentation-examples-design.md`

## Global Constraints

- Preserve the existing palette, fonts, seven direction routes and Abricos contacts.
- No fabricated albums, PDF links, page counts or viewer dependencies.
- Keep recommendations and logos; remove only the bottom Documents block.

## Review Focus

- Generator works after removal of the old sidebar.
- Both stages remain readable without horizontal overflow at 375, 768 and 1440 px.
- Direction links, form, mobile navigation and remaining galleries keep working.
- Deployment preserves the server HTTPS configuration and unrelated files.

### Task 1: Replace services and clean the dependency

**Files:** `tx/index.html`, `tx/tx.css`, `tx/replica.js`, `tx/scripts/build-directions.cjs`, `tx/tests/direction-pages.test.cjs`, `tx/README.md`, generated `tx/directions/*.html`.

- [ ] Replace the right service accordion with two semantic stage groups and remove `#reference-proof-2`.
- [ ] Remove old accordion JS/CSS and generator sidebar rewriting; verify the detail sidebars still cover all seven routes.
- [ ] Regenerate pages, run `node --test tx/tests/*.test.cjs`, and check local links and responsive screenshots.
- [ ] Review the diff, commit and push, then deploy the changed public files and verify HTTPS content.
