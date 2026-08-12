import { createReferenceGridViewer } from './editor/ReferenceGridViewer.js';
import { createGridOverlay } from './grid/GridOverlay.js';
import { createGridRenderer } from './render/GridRenderer.js';
import { createReferencePlane } from './render/ReferencePlane.js';

const gridConfig = {
  origin: [0, 0, 0],
  scale: 1,
  axes: {
    x: true,
    y: true,
    z: true
  },
  grid: {
    step: 1,
    snap: true
  }
};

const transform = {
  origin: [0, 0, 0],
  scale: 1,
  rotation: 0,
  projection: 'XY'
};

/**
 * Entry point for the new molecule builder pipeline.
 * Stage: calibration only.
 * No atoms and no bonds.
 */
export function createMoleculeBuilder(scene) {
  const grid = createGridOverlay(scene, gridConfig);

  const gridRenderer = createGridRenderer(scene, gridConfig);

  const referencePlane = createReferencePlane(scene, {
    transform
  });

  const reference = createReferenceGridViewer(scene, {
    gridConfig,
    transform
  });

  return {
    type: 'molecule-builder',
    stage: 'calibration',
    grid,
    gridRenderer,
    referencePlane,
    reference
  };
}
