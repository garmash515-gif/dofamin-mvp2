export function createAtomMarker(atom) {
  return {
    id: atom.id,
    type: 'atom-marker',
    element: atom.element,
    position: atom.position || [0, 0, 0],
    selected: false,
    metadata: {
      source: 'molecule-builder-grid'
    }
  };
}

export function updateAtomMarkerPosition(marker, position) {
  marker.position = position;
  return marker;
}

export function selectAtomMarker(marker, selected = true) {
  marker.selected = selected;
  return marker;
}
