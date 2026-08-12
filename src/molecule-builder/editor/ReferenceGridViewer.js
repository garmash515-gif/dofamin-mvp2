import { createGridOverlay } from '../grid/GridOverlay.js';

/**
 * ReferenceGridViewer
 *
 * Calibration layer for molecule construction.
 * Does not create atoms.
 * It only combines:
 * - reference image plane
 * - coordinate grid
 * - origin marker
 * - calibration points
 */

export function createReferenceGridViewer(scene, {
  referenceTexture = null,
  gridConfig = null,
  transform = null
} = {}) {
  const viewer = {
    type: 'reference-grid-viewer',
    referenceTexture,
    transform: transform || {
      origin: [0, 0, 0],
      scale: 1,
      rotation: 0,
      projection: 'XY'
    },
    calibrationPoints: []
  };

  if (gridConfig) {
    viewer.grid = createGridOverlay(scene, gridConfig);
  }

  scene?.userData && (scene.userData.referenceGridViewer = viewer);

  return viewer;
}

export function addCalibrationPoint(viewer, point) {
  const marker = {
    id: point.id,
    position: point.position,
    type: 'calibration-point'
  };

  viewer.calibrationPoints.push(marker);
  return marker;
}

export function updateCalibrationTransform(viewer, transform = {}) {
  viewer.transform = {
    ...viewer.transform,
    ...transform
  };

  return viewer.transform;
}
