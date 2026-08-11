import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js';

export function createEnergyPulse(start, end) {
  const geometry = new THREE.SphereGeometry(0.045, 16, 16);
  const material = new THREE.MeshBasicMaterial({
    color: 0x67eee3,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending
  });

  const pulse = new THREE.Mesh(geometry, material);
  pulse.userData = {
    start: start.clone(),
    end: end.clone(),
    progress: 0
  };

  return pulse;
}

export function updateEnergyPulse(pulse, delta = 0.01) {
  pulse.userData.progress += delta;

  if (pulse.userData.progress > 1) {
    pulse.userData.progress = 0;
  }

  pulse.position.lerpVectors(
    pulse.userData.start,
    pulse.userData.end,
    pulse.userData.progress
  );
}
