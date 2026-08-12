# Dofamin Branch Map

## Stable / visual branch

`feature/postprocessing-bloom-pipeline`

Purpose:
- Current working visual prototype.
- Bloom, camera, molecule, interactions.
- Do not use for large architectural migrations.

## Runtime migration branch

`feature/world-runtime-migration`

Purpose:
- Migration from direct scene creation to World Runtime architecture.
- Coordinates become source of truth.
- Objects, bonds, camera anchors become independent layers.

Planned steps:

### F1.1 Runtime layer
- world runtime definition
- no visual changes

### F1.2 Single object migration
- one object through runtime renderer
- compare with legacy scene

### F1.3 Object migration
- all atoms/objects through runtime

### F1.4 Bond migration
- connections generated center-to-center

### F1.5 Camera migration
- camera anchors from world definition

### F1.6 Interaction migration
- tap -> object -> journey -> light -> next step

## Workflow

1. Stable branch keeps current playable version.
2. Migration branch receives architectural changes.
3. Test on GitHub Pages before merging.
4. Merge only after visual parity is confirmed.
