import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js';
import { createAtom } from './atom.js';
import { createBond } from './bond.js';
import { createEnergyPulse } from '../effects/energyFlow.js';

export function createDopamineMolecule(scene) {
  const molecule = new THREE.Group();
  const atoms = [];
  const bonds = [];

  const radius = 0.72;
  const atomSize = 0.105;

  for (let i = 0; i < 6; i++) {
    const angle = Math.PI / 2 + i * Math.PI / 3;

    const atom = createAtom(
      'C',
      {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: 0
      },
      atomSize
    );

    molecule.add(atom);
    atoms.push(atom);
  }

  for (let i = 0; i < atoms.length; i++) {
    const start = atoms[i];
    const end = atoms[(i + 1) % atoms.length];
    const bond = createBond(start, end);

    molecule.add(bond);
    bonds.push({
      start,
      end,
      object: bond,
      trigger() {
        return createEnergyPulse(start.position, end.position);
      }
    });
  }

  scene.add(molecule);

  return { molecule, atoms, bonds };
}
