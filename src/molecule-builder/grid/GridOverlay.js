// GridOverlay
// Visual coordinate layer for molecule construction.
// Keeps reference space independent from rendered molecule objects.

export function createGridOverlay(scene, gridConfig) {
  const {
    step = 1,
    size = 10
  } = gridConfig || {};

  const overlay = {
    type: 'coordinate-grid',
    step,
    size,
    origin: [0, 0, 0],
    visible: true,
    points: []
  };

  for (let x = -size; x <= size; x += step) {
    for (let y = -size; y <= size; y += step) {
      overlay.points.push({
        position: [x, y, 0]
      });
    }
  }

  if (scene) {
    scene.userData = scene.userData || {};
    scene.userData.coordinateGrid = overlay;
  }

  return overlay;
}
