import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js';

const MATERIALS = {
  C: { color: 0x26333d, emissive: 0x06262a, intensity: 0.03, roughness: 0.24, size: 0.28 },
  O: { color: 0xb52b3d, emissive: 0xff334f, intensity: 0.65, roughness: 0.16, size: 0.32 },
  N: { color: 0x286dcc, emissive: 0x164fbb, intensity: 0.18, roughness: 0.18, size: 0.30 },
  H: { color: 0xd5edf5, emissive: 0x12323d, intensity: 0.04, roughness: 0.22, size: 0.15 }
};

export function createAtom(type, position, size = null) {
  const group = new THREE.Group();
  group.position.set(position.x, position.y, position.z);
  group.userData.type = type;
  group.userData.energy = 0.08;
  group.userData.active = false;

  const style = MATERIALS[type] || MATERIALS.C;
  const material = new THREE.MeshPhysicalMaterial({
    color: style.color,
    transparent: true,
    transmission: type === 'H' ? 0.2 : 0.25,
    thickness: 0.8,
    ior: 1.45,
    roughness: style.roughness,
    clearcoat: 1,
    clearcoatRoughness: 0.04,
    emissive: style.emissive,
    emissiveIntensity: style.intensity
  });

  const mesh = new THREE.Mesh(new THREE.SphereGeometry(size ?? style.size, 32, 32), material);
  mesh.name = `atom-${type}`;
  group.add(mesh);
  group.userData.material = material;
  group.userData.mesh = mesh;
  group.userData.baseEmissiveIntensity = style.intensity;
  return group;
}

export function updateAtomEnergy(atom, time, active = false) {
  if (!atom?.userData?.material) return;
  const material = atom.userData.material;
  const base = atom.userData.baseEmissiveIntensity ?? 0.08;
  const pulse = (Math.sin(time * 3) + 1) / 2;
  const target = active ? base + 2.2 + pulse * 1.8 : base;
  material.emissiveIntensity += (target - material.emissiveIntensity) * 0.08;
  atom.userData.active = active;
}
