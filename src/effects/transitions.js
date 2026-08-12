import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js';

export function playMoleculeIntro(object) {
  object.scale.setScalar(0.82);
  object.rotation.y = -0.35;

  let progress = 0;
  return function update(delta) {
    if (progress >= 1) return;
    progress = Math.min(1, progress + delta * 0.8);
    const eased = 1 - Math.pow(1 - progress, 3);
    object.scale.setScalar(0.82 + eased * 0.18);
    object.rotation.y = -0.35 + eased * 0.35;
  };
}
