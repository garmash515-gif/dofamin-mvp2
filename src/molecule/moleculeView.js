import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js';

function cylinderBetween(a, b, radius, material, offset = 0) {
  const direction = new THREE.Vector3().subVectors(b, a);
  const length = direction.length();
  const midpoint = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, length, 12), material);
  mesh.position.copy(midpoint);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
  if (offset) {
    const side = new THREE.Vector3(-direction.y, direction.x, 0).normalize().multiplyScalar(offset);
    mesh.position.add(side);
  }
  return mesh;
}

function createBondView(start, end, type = 'single') {
  const a = start.position;
  const b = end.position;
  const material = new THREE.MeshBasicMaterial({ color: 0x4ffff0, transparent: true, opacity: 0.42 });
  const group = new THREE.Group();
  const radius = type === 'double' ? 0.018 : 0.024;
  group.add(cylinderBetween(a, b, radius, material));
  if (type === 'double') group.add(cylinderBetween(a, b, radius, material, 0.035));
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
