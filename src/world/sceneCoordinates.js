// DOPAMIN — World Coordinate Authority
// Coordinates are the source of truth for composition.
// Objects, bonds and camera anchors attach to these points.

export const SCENE_COORDINATES = {
  C1: {
    id: 'C1',
    position: { x: 0, y: 0, z: 0 },
    step: 'welcome',
    label: 'Начало'
  },
  C2: {
    id: 'C2',
    position: { x: 1.1, y: 0.35, z: 0 },
    step: 'wishlist',
    label: 'Вишлист'
  },
  C3: {
    id: 'C3',
    position: { x: 1.9, y: -0.15, z: 0 },
    step: 'red-flags',
    label: 'Красные флаги'
  }
};

export function getCoordinate(id) {
  return SCENE_COORDINATES[id] || null;
}

export function getPosition(id) {
  return getCoordinate(id)?.position || null;
}
