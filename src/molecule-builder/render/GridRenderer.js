import * as THREE from 'three';

export function createGridRenderer(scene, {
  size = 20,
  divisions = 20
} = {}) {
  if (!scene) return null;

  const gridHelper = new THREE.GridHelper(size, divisions);
  scene.add(gridHelper);

  const grid = {
    type: 'grid-renderer',
    size,
    divisions,
    object: gridHelper,
    visible: true
  };

  scene.userData = scene.userData || {};
  scene.userData.moleculeBuilderGrid = grid;

  return grid;
}
