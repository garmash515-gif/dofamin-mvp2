import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js';

export function createCameraAnchor(atom) {
  const direction = atom.position.clone().normalize();
  const target = atom.getWorldPosition(new THREE.Vector3());

  return {
    target,
    position: target.clone().add(direction.multiplyScalar(3.2)),
    distance: 3.2
  };
}

export function focusFromAnchor(cameraController, anchor) {
  if (!cameraController?.focusPoint) return;
  cameraController.focusPoint(anchor.target, anchor.distance, true);
}
