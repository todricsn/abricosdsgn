# Reference layout for Abricos

Approved on 2026-11-12: “Сделать компоновку ближе к референсу”.

Use the existing static `/tx/` site. Restore the reference's two-column introduction (copy left, architectural illustration right), seven development directions, and a two-column work section with vertical stages and an object illustration. Follow with readable, detailed service information, documentation, starting materials and contact details.

Keep Abricos branding, Helvetica Neue, white ground, navy text, blue accents, existing generated illustrations and all confirmed contacts. Keep full “Технологические решения” wording. Keep project imagery clearly illustrative until real projects arrive. Author independent draft copy; do not fabricate completed projects, clients, certifications, prices, deadlines or expertise guarantees.

## Approaches

- Restore the reference composition in existing HTML/CSS: chosen by the user; keeps deployment and later text/image replacement simple.
- Keep the wide hero/horizontal stages and expand content: declined in the user's choice.
- WordPress migration: separate work if an editing admin is requested; not needed for this composition change.

## Boundaries

Change `tx/index.html` and `tx/tx.css`; retain local UIkit and native details controls. Remove obsolete CSS overrides while replacing the layout. No new libraries or JavaScript. Scope stays in `/tx/`; root studio site remains outside this task.

Browser checks at desktop, tablet and narrow mobile widths must cover readable text, intact icon proportions, image crops, keyboard details controls, contacts, anchor links and overflow. Push to the existing GitHub remote under the user's standing publication instruction.
