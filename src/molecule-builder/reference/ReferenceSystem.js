import * as THREE from 'three';

/**
 * ReferenceSystem is the calibration layer.
 * It places the dopamine PNG in 3D space and creates the surface
 * where future atom markers will be attached.
 */
export function createReferenceSystem(scene) {
  const group = new THREE.Group();
  group.name = 'ReferenceSystem';

  const loader = new THREE.TextureLoader();
  const texture = loader.load('/dofamin-mvp2/assets/dopamine-reference.png');

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide
  });

  const geometry = new THREE.PlaneGeometry(8, 8);
  const imagePlane = new THREE.Mesh(geometry, material);
  imagePlane.name = 'DopamineReferenceImage';
  imagePlane.position.set(0, 1, 0);

  group.add(imagePlane);

  const markers = new THREE.Group();
  markers.name = 'MoleculeMarkers';
  group.add(markers);

  scene.add(group);

  return {
    group,
    imagePlane,
    markers
  };
}
