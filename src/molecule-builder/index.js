import { createReferenceGridViewer } from './editor/ReferenceGridViewer.js';
import { createGridOverlay } from './grid/GridOverlay.js';
import gridConfig from './grid/coordinateGrid.json' assert { type: 'json' };
import transform from './reference/referenceTransform.json' assert { type: 'json' };

/**
 * Entry point for the new molecule builder pipeline.
 * Stage: calibration only.
 * Does not create atoms or bonds.
 */
export function createMoleculeBuilder(scene) {
  const grid = createGridOverlay(scene, gridConfig);

  const reference = createReferenceGridViewer(scene, {
    gridConfig,
    transform
  });

  return {
    type: 'molecule-builder',
    stage: 'calibration',
    grid,
    reference
  };
}
