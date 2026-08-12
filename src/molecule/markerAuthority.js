// DOPAMIN — V9.0
// Marker Authority Layer
// Markers are the source of truth for composition.
// Atoms, bonds and camera anchors should follow markers.

export const JOURNEY_MARKERS = {
  C1: {
    id: 'C1',
    step: 'welcome',
    label: 'Начало',
    position: { x: 0, y: 0, z: 0 },
    camera: { distance: 2.4, tilt: 0.25 }
  },
  C2: {
    id: 'C2',
    step: 'wishlist',
    label: 'Вишлист',
    position: { x: 0.95, y: 0.28, z: 0.12 },
    camera: { distance: 2.1, tilt: 0.2 }
  },
  C3: {
    id: 'C3',
    step: 'red-flags',
    label: 'Красные флаги',
    position: { x: 1.72, y: -0.12, z: 0.05 },
    camera: { distance: 2.2, tilt: 0.2 }
  }
};

export function getMarker(id) {
  return JOURNEY_MARKERS[id] || null;
}

export function getMarkerPosition(id) {
  const marker = getMarker(id);
  return marker?.position || null;
}

export function bindObjectToMarker(object, markerId) {
  const marker = getMarker(markerId);
  if (!marker || !object) return object;

  object.userData.markerId = markerId;
  object.userData.marker = marker;

  return object;
}

export function getCameraAnchor(markerId) {
  return getMarker(markerId)?.camera || null;
}
