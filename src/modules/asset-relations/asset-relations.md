# Asset Relations — Risk Picture (post-beta)

Prototype of the NorthGRC **Risk → Landscape → Risk Picture** view, brought out of
beta per epic [NEUP-12685 "Risk Picture Updates 6.6"](https://neupart.atlassian.net/browse/NEUP-12685).

An interactive diagram of assets and their dependency relationships, with each
asset's CIA risk shown directly on the card.

## What the view shows

- **Tree layout** of assets by dependency level. Long relation paths are placed
  first; alternate columns are staggered vertically to "break" the square grid.
- **CIA panel** on the left edge of every card — three stacked cells
  (C / I / A) tinted by their *assessed* risk level (green / amber / red).
- **Risk flag**: when a dimension's *calculated* level exceeds its *assessed*
  level, that cell turns red and shows a flag icon, plus a red dot by the name.
- **Orthogonal connectors** with arrowheads pointing to the depended-on asset.
  Relations touching the selected asset are highlighted; nearby relations use
  separate paths so they don't overlap.
- **Fluid zoom & pan** — scroll to zoom toward the cursor, drag the canvas to
  pan. Zoom is never changed by edit/other actions. Zoom buttons bottom-right.

## Card interactions

- **Click** a card to select / deselect it (highlights its relations).
- **Pin / unpin** (top-right) — pinned cards show a filled pin always.
- **Edit** (pencil, bottom-right) opens the **Edit asset** dialog.
- **Click the CIA panel** opens the **Risk** dialog (assessed vs. calculated per
  dimension; editing an assessed level can raise/clear the flag live).
- **Add / remove relation** controls, paired per direction:
  - top-center **+ / −** act on the *"depends on this"* relations (assets that
    depend on this one).
  - bottom-center **+ / −** act on the *"this depends on"* relations.
  - The **−** only shows when that direction has at least one relation. Removing:
    a single relation → confirm dialog; multiple → a modal (scoped to that
    direction) to pick which to remove.

## Toolbar & views

`Create` · segmented **List / Relations / Risk Picture** control (real routes) ·
`Search` (dims non-matching assets) · `Filter` (all / flagged only / high risk) ·
`Print`. List and Relations are lightweight table/list views over the same data.

## Out of scope (per epic)

- Auto-place and show Zones (groups) of entities.
- QRisk information.
