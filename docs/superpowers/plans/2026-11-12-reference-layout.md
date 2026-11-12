# Abricos Reference Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring the technological-solutions page closer to the approved reference composition.

**Architecture:** Keep the standalone static page and existing local assets. Native disclosure controls expose service detail without additional scripts. Parent owns CSS and verification; a bounded worker owns HTML.

**Tech Stack:** HTML, CSS, existing UIkit CSS, Python static preview.

**Spec:** `docs/superpowers/specs/2026-11-12-reference-layout-design.md`

## Global Constraints

- Only technological solutions, full wording; retain branding, fonts, confirmed contacts and generated illustrations.
- No new dependency, fake project, price, certification or delivery promise.
- Reuse the hydrated checkout; the workspace copy is managed by iCloud.
- User-approved reference geometry takes precedence over generic design-skill layout rules.
- This is reversible HTML/CSS work: verify in the browser rather than adding implementation-mirroring tests.

## Review Focus

- Long Russian headings wrap without overlap at narrow widths.
- Every native disclosure remains keyboard usable and readable when expanded.
- Sprite icons keep their original proportions in the vertical workflow.
- Two-column sections stack in reading order on phones; no horizontal overflow.
- Existing telephone, email and section anchors retain their destinations.

### Task 1: Restore the composition and complete draft content

**Files:** Modify `tx/index.html`, `tx/tx.css`.

**Interfaces:** `.reference-hero > .hero-copy + figure`; `#services .catalog-list > details.catalog-item` with summary `.catalog-title`, `.catalog-description`, and `.catalog-body`; `.reference-work > .process-column + .project-preview`; existing `.workflow-icon--1` through `--5`; `.article-layout > .article-nav + .article-copy`; existing `#scope`, FAQ and `#contact`.

- [x] Replace the opening directory with seven native disclosure items; add a detailed article section.
- [x] Restore the side-by-side introduction and vertical process/object columns; retain honest image captions.
- [x] Replace accumulated CSS overrides with one responsive stylesheet using the current palette and typography.
- [x] Run HTML/asset/anchor checks and `git diff --check`.
- [x] Check desktop, tablet, mobile, expanded disclosures and keyboard behavior in CUA; save screenshots.
- [x] Obtain one fresh code review, fix substantive issues and recheck affected views.
- [ ] Commit and push; confirm GitHub Pages deployment and synchronize changed source files to the workspace copy.

Verification: HTML/asset/anchor checks and git diff --check passed. CUA covered desktop 1440 px, tablet near 768 px and mobile 375 px, native keyboard disclosures, no horizontal overflow, intact icon proportions and minimum measured text contrast 5.66:1. Fresh code review found no actionable issues. Physical-device testing and real project materials remain outside this update.
