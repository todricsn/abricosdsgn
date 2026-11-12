# Direction Pages Implementation Plan

> **For agentic workers:** Use the existing checkout and finish the implementation with a fresh independent review. No framework or dependency changes.

**Goal:** Each technological direction opens its own description page from the main catalog and corresponding technology sidebar entries.

**Architecture:** Seven pre-rendered static HTML pages under `tx/directions/`, generated from editable `tx/directions.json` with Node standard libraries. Reuse the current page head, header/mobile navigation and footer so branding stays consistent. Detail content is available without JavaScript and works on GitHub Pages at `/abricosdsgn/tx/`.

**Tech Stack:** HTML/CSS, existing browser JavaScript, Node built-in file system and test runner.

**Design:** Keep the approved white business style, current fonts, navy/cyan colors, own logo/contacts and compact footer. A page has a title, introduction, scope, deliverables, required input and links to other directions. No added photos, animation library, backend or hosting migration. Separate pages were the approach shown in the user's conversation screenshot; a JavaScript modal would not provide directly accessible descriptions.

## Global constraints

- Change only `tx/`; preserve the root studio site.
- Seven unique routes: education, public-offices, pools, food-retail, parking, vertical-transport, production.
- Own contacts stay +7 911 913-30-30 and abricos-design@mail.ru.
- Author temporary service copy independently; do not invent prices, credentials, completed work or regulatory promises.
- Existing header navigation on detail pages returns to the main-page sections.

## Review focus

- Every main-card and technology-sidebar link reaches its matching direction.
- All nested-page CSS, image, script and fragment links resolve under a project Pages base path.
- Long Russian titles, 375px screens, keyboard navigation and failed JavaScript remain usable.
- Text is HTML-escaped and invalid/duplicate slugs cannot write outside the target folder.
- Regeneration stays deterministic and preserves unrelated page content and other interactions.

## Tasks

- [x] Add failing integration tests for distinct routes, real generated HTML/link targets, escaping and invalid slugs.
- [x] Add editable original service content and a minimal deterministic static generator; update all seven cards and corresponding sidebar links.
- [x] Add scoped responsive detail-page styles, generate the pages, run the full native test suite and local link checks.
- [x] Check the main catalog and detail pages in the browser on desktop/mobile; fix material issues and request a fresh code review.
- [x] Document the regeneration command, commit/push, confirm Pages deployment and synchronize the canonical checkout.

## Execution notes

The prior removal of all five project captions was completed and pushed in commit `3b726d5` before this feature. The current checkout is reused per the standing publication workflow. No new approval is needed for the already requested static pages.

Eight native tests pass after the red/green cycle. Fresh review found metadata replacement-dollar expansion and missing/null slug coercion; both were reproduced with failing cases and fixed. Browser checks confirmed card/sidebar navigation, mobile menu return, all seven pages at 375px, additional 320px/769px checks, no overflow or broken images and no captured console errors. Current shared typography, blueprint background, gradients and header/footer are preserved to match the approved site.

Release verification: commit `78c497b` deployed successfully via GitHub Pages run `43207522478`; the public education page matched the generated HTML byte for byte. The canonical checkout was synchronized and clean.
