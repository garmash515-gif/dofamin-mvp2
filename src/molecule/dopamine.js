import { createAtom } from './atom.js';
import { createBond } from './bond.js';
import { createEnergyPulse } from '../effects/energyFlow.js';

export function createDopamineMolecule(scene) {
  const atoms = [];
  const bonds = [];

  const radius = 1.15;

  // Бензольное кольцо: шесть атомов вокруг центра
  for (let i = 0; i < 6; i++) {
    const angle = i * Math.PI / 3;

    const atom = createAtom(
      'C',
      {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: 0
      },
      0.24
    );

    scene.add(atom);
    atoms.push(atom);
  }

  // Реальные визуальные связи
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
