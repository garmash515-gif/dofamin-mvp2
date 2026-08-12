import { createWorldRuntime } from './runtime.js';
import { createRuntimeObject } from './runtimeRenderer.js';

/**
 * F1.2.1 Runtime Preview Hook
 *
 * Test bridge between Journey/World definition and renderer.
 * Does not replace the legacy scene yet.
 */
export function createRuntimePreview(scene, id = 'CORE') {
  const world = createWorldRuntime();

  const objectDefinition = world.objects?.[id];
  const coordinate = world.coordinates?.[id];

  if (!objectDefinition || !coordinate) {
    console.warn('[Runtime Preview] Missing object:', id);
    return null;
  }

  const runtimeObject = createRuntimeObject({
    id,
    objectDefinition,
    coordinate,
  });

  if (runtimeObject) {
    runtimeObject.userData.runtimePreview = true;
    scene.add(runtimeObject);
  }

  return runtimeObject;
}
