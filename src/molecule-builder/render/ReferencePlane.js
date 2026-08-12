export function createReferencePlane(scene, {
  texture = null,
  transform = null
} = {}) {
  if (!scene) return null;

  const plane = {
    type: 'reference-plane',
    texture,
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
