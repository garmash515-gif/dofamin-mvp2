import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js';

export function createBond(a, b) {
  const points = [a.position, b.position];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: 0x4ffff0,
    transparent: true,
    opacity: 0.35
  });

  const line = new THREE.Line(geometry, material);
  line.userData.from = a;
  line.userData.to = b;

  return line;
}
