import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js';

export function createAtom(type, position, size = .2) {
  const group = new THREE.Group();
  group.position.copy(position);
  group.userData.type = type;
  group.userData.energy = 0.08;

  const material = new THREE.MeshPhysicalMaterial({
    transparent:true,
    transmission:.65,
    thickness:1,
    ior:1.45,
    roughness:.08,
    clearcoat:1,
    clearcoatRoughness:.04,
    emissive:0x4ffff0,
    emissiveIntensity:.08
  });

  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(size, 40, 40),
    material
  );

  group.add(mesh);

  // Внутреннее ядро энергии. Не контур снаружи, а свет внутри атома.
  const coreMaterial = new THREE.MeshBasicMaterial({
    color:0x67eee3,
    transparent:true,
    opacity:.06,
    blending:THREE.AdditiveBlending,
    depthWrite:false
  });

  const energyCore = new THREE.Mesh(
    new THREE.SphereGeometry(size * .55, 32, 32),
    coreMaterial
  );

  energyCore.name = 'energyCore';
  group.add(energyCore);
  group.userData.energyCore = energyCore;

  return group;
}
