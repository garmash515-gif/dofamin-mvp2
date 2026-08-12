import * as THREE from 'three';

export function createReferencePlane(scene, {
  texture = null,
  transform = null
} = {}) {
  if (!scene) return null;

  const geometry = new THREE.PlaneGeometry(10, 10);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0.2,
    side: THREE.DoubleSide
  });

  const mesh = new THREE.Mesh(geometry, material);

  // Reference lives on the calibration plane, not inside the camera.
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.z = -2;

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
