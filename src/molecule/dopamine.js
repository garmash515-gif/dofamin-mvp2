import { createAtom } from './atom.js';
import { createBond } from './bond.js';
import { createEnergyPulse } from '../effects/energyFlow.js';

export function createDopamineMolecule(scene) {
  const atoms = [];
  const bonds = [];

  // Compact composition for portrait/mobile screens.
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

    scene.add(atom);
    atoms.push(atom);
  }

  // Visual bonds + energy route between adjacent atoms.
  for (let i = 0; i < atoms.length; i++) {
    const start = atoms[i];
    const end = atoms[(i + 1) % atoms.length];

    const bond = createBond(start, end);
    scene.add(bond);

    bonds.push({
      start,
      end,
      object: bond,
      trigger() {
        return createEnergyPulse(start.position, end.position);
      }
    });
  }

  return { atoms, bonds };
}
