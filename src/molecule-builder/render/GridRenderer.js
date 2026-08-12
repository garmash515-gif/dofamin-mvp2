export function createGridRenderer(scene, {
  size = 20,
  divisions = 20
} = {}) {
  if (!scene) return null;

  const grid = {
    type: 'grid-renderer',
    size,
    divisions,
    visible: true
  };

  scene.userData = scene.userData || {};
  scene.userData.moleculeBuilderGrid = grid;

  return grid;
}
