import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js';

export function createAtom(type, position, size = .2) {
  const group = new THREE.Group();
  group.position.copy(position);
  group.userData.type = type;

  const material = new THREE.MeshPhysicalMaterial({
    transparent:true,
    transmission:.2,
    roughness:.1,
    clearcoat:1
  });

  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(size, 40, 40),
    material
  );

  group.add(mesh);
  return group;
}
