import * as THREE from 'three';

export function createReferencePlane(scene, {
  texture = null,
  transform = null
} = {}) {
  if (!scene) return null;

  const geometry = new THREE.PlaneGeometry(10, 10);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true
  });
  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  const plane = {
    type: 'reference-plane',
    texture,
    object: mesh,
    transform: transform || {
      origin: [0, 0, 0],
      scale: 1,
      rotation: 0
    }
  };

  scene.userData = scene.userData || {};
  scene.userData.moleculeReferencePlane = plane;

  return plane;
}
