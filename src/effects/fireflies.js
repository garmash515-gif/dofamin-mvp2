import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js';

export function createFireflies(scene) {
  const geometry = new THREE.BufferGeometry();
  const count = 60;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - .5) * 8;
    positions[i * 3 + 1] = (Math.random() - .5) * 8;
    positions[i * 3 + 2] = (Math.random() - .5) * 5;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const points = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      color:0x67eee3,
      size:.04,
      transparent:true,
      opacity:.75,
      blending:THREE.AdditiveBlending
    })
  );

  points.userData.floatPhase = Math.random() * Math.PI * 2;
  scene.add(points);
  return points;
}
