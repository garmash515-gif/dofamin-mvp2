// DOPAMIN — World Builder
// Lightweight composition layer.
// Coordinates describe WHERE, objects describe WHAT, bonds describe CONNECTIONS.

import { SCENE_COORDINATES } from './sceneCoordinates.js';
import { WORLD_OBJECTS } from './objects.js';
import { WORLD_BONDS } from './bonds.js';

export function createWorldDefinition() {
  return {
    coordinates: SCENE_COORDINATES,
    objects: WORLD_OBJECTS,
    bonds: WORLD_BONDS
  };
}

export function getWorldPoint(id) {
  return SCENE_COORDINATES[id] || null;
}

export function getWorldObject(id) {
  return WORLD_OBJECTS[id] || null;
}

export function getWorldBond(from, to) {
  return WORLD_BONDS.find(
    bond =>
      (bond.from === from && bond.to === to) ||
      (bond.from === to && bond.to === from)
  ) || null;
}

// Runtime adapter: renderer decides how to display the object.
// The world layer never knows about Three.js meshes or materials.
export function resolveWorldNode(id) {
  const point = getWorldPoint(id);
  const object = getWorldObject(id);

  return {
    id,
    point,
    object
  };
}
