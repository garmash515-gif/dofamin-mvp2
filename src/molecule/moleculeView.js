import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js';

function cylinderBetween(a, b, radius, material, offset = 0) {
  const direction = new THREE.Vector3().subVectors(b, a);
  const length = direction.length();
  const midpoint = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);

  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, length, 16),
    material
  );

  mesh.position.copy(midpoint);
  mesh.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction.normalize()
  );

  if (offset) {
    const side = new THREE.Vector3(0, 0, 1).cross(direction).normalize().multiplyScalar(offset);
    mesh.position.add(side);
  }

  return mesh;
}

function createBondView(start, end, type = 'single') {
  const material = new THREE.MeshPhysicalMaterial({
    color: 0x3d8f9b,
    transparent: true,
    opacity: 0.75,
    roughness: 0.35,
    metalness: 0.1,
    emissive: 0x062025,
    emissiveIntensity: 0.15
  });

  const group = new THREE.Group();
  const radius = type === 'double' ? 0.012 : 0.016;

  group.add(cylinderBetween(start.position, end.position, radius, material));

  if (type === 'double') {
    group.add(cylinderBetween(start.position, end.position, radius, material, 0.025));
  }

  group.userData.from = start;
  group.userData.to = end;
  group.userData.type = type;

  return group;
}

export function createMoleculeView() {
  const group = new THREE.Group();
  group.name = 'dopamine-molecule';
  group.userData.createBondView = createBondView;
  return group;
}
