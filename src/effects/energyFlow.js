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
  pulse.position.copy(start);
  pulse.userData = {
    start: start.clone(),
    end: end.clone(),
    progress: 0,
    speed: 0.9,
    alive: true
  };

  return pulse;
}

export function updateEnergyPulse(pulse, delta = 0.016) {
  if (!pulse?.userData?.alive) return false;

  pulse.userData.progress += delta * pulse.userData.speed;

  if (pulse.userData.progress >= 1) {
    pulse.userData.progress = 1;
    pulse.userData.alive = false;
    pulse.material.opacity = 0;
    return false;
  }

  pulse.position.lerpVectors(
    pulse.userData.start,
    pulse.userData.end,
    pulse.userData.progress
  );

  pulse.scale.setScalar(1 + Math.sin(pulse.userData.progress * Math.PI) * 0.8);
  return true;
}
