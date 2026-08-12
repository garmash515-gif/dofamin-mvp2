import { createReferenceGridViewer } from './editor/ReferenceGridViewer.js';
import { createGridOverlay } from './grid/GridOverlay.js';
import { createGridRenderer } from './render/GridRenderer.js';
import { createReferencePlane } from './render/ReferencePlane.js';
import { createReferenceImage } from './render/ReferenceImage.js';

const gridConfig = {
  origin: [0, 0, 0],
  scale: 1,
  axes: { x: true, y: true, z: true },
  grid: { step: 1, snap: true }
};

const transform = {
  origin: [0, 0, 0],
  scale: 1,
  rotation: 0,
  projection: 'XY'
};

export function createMoleculeBuilder(scene) {
  const grid = createGridOverlay(scene, gridConfig);
  const gridRenderer = createGridRenderer(scene, gridConfig);

  const referencePlane = createReferencePlane(scene, {
    transform
  });

  const referenceImage = createReferenceImage(scene, {
    url: './assets/dopamine-reference.png',
    transform: {
      position: [0, 0, -1],
      scale: 1
    }
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
    referenceImage,
    reference
  };
}
