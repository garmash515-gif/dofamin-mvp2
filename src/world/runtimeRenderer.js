// DOPAMIN — F1.2
// Minimal runtime bridge: converts world object definitions into scene objects.
// This is intentionally limited to a single object migration step.

import { createAtom } from '../molecule/atom.js';

export function createRuntimeObject(definition, coordinates) {
  if (!definition || !coordinates) return null;

  const point = coordinates[definition.anchorId];
  if (!point) return null;

  let object = null;

  if (definition.type === 'atom') {
    object = createAtom(
      definition.element || 'C',
      { x: point.x, y: point.y, z: point.z },
      definition.size || 0.1
    );
  }

  if (!object) return null;

  object.userData.runtimeId = definition.id;
  object.userData.runtimeAnchor = definition.anchorId;
  object.userData.runtimeSource = 'world-runtime';

  return object;
}

export function createSingleRuntimePreview(world) {
  const id = 'C1';
  const definition = world.objects[id];

  return createRuntimeObject(
    definition,
    world.coordinates
  );
}
