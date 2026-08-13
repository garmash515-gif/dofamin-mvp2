import * as THREE from 'three';

export function createMarkerManager(container) {
  const markers = [];

  function add(position, data = {}) {
    const marker = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xff3366 })
    );

    marker.position.copy(position);
    marker.userData = data;
    container.add(marker);
    markers.push(marker);

    return marker;
  }

  return {
    add,
    all: markers
  };
}
