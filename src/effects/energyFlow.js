import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js';

// DOPAMIN — Block V1
// Base engine for energy movement between journey atoms.

export function createEnergyPulse(start, end, options = {}) {
  const geometry = new THREE.SphereGeometry(
    options.size || 0.045,
    16,
    16
  );

  const material = new THREE.MeshBasicMaterial({
    color: options.color || 0x67eee3,
    transparent: true,
    opacity: options.opacity || 0.9,
    blending: THREE.AdditiveBlending
  });

  const pulse = new THREE.Mesh(geometry, material);
  pulse.position.copy(start);

  pulse.userData = {
    start: start.clone(),
    end: end.clone(),
    progress: 0,
    speed: options.speed || 0.9,
    alive: true,
    type: 'energy-pulse'
  };

  return pulse;
}

export function updateEnergyPulse(pulse, delta = 0.016) {
  if (!pulse?.userData?.alive) return false;

  const data = pulse.userData;
  data.progress += delta * data.speed;

  if (data.progress >= 1) {
    data.progress = 1;
    data.alive = false;
    pulse.material.opacity = 0;
    return false;
  }

  pulse.position.lerpVectors(
    data.start,
    data.end,
    data.progress
  );

  pulse.scale.setScalar(
    1 + Math.sin(data.progress * Math.PI) * 0.8
  );

  return true;
}

export function resetEnergyPulse(pulse) {
  if (!pulse?.userData) return;

  pulse.userData.progress = 0;
  pulse.userData.alive = true;
  pulse.material.opacity = 0.9;
  pulse.position.copy(pulse.userData.start);
}

export function createJourneyEnergy(start, end) {
  return createEnergyPulse(start, end, {
    speed: 1.4,
    size: 0.055,
    opacity: 1
  });
}
