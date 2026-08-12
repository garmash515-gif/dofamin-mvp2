// DOPAMIN — F1.1
// Runtime layer. Does not create Three.js objects yet.
// It only combines world definitions into one stable application source.

import { SCENE_COORDINATES } from './sceneCoordinates.js';
import { WORLD_OBJECTS } from './objects.js';
import { WORLD_BONDS } from './bonds.js';
import { CAMERA_ANCHORS } from './cameraAnchors.js';

export function createWorldRuntime() {
  return {
    coordinates: SCENE_COORDINATES,
    objects: WORLD_OBJECTS,
    bonds: WORLD_BONDS,
    cameraAnchors: CAMERA_ANCHORS,
    version: 'f1.1'
  };
}

export function getWorldNode(id) {
  const runtime = createWorldRuntime();

  return {
    id,
    coordinate: runtime.coordinates[id] || null,
    object: runtime.objects[id] || null,
    camera: runtime.cameraAnchors[id] || null
  };
}
