import { createAtom } from './atom.js';
import { createEnergyPulse } from '../effects/energyFlow.js';

export function createDopamineMolecule(scene) {
  const molecule = [];
  const bonds = [];

  for (let i = 0; i < 6; i++) {
    const angle = i * Math.PI / 3;
    const atom = createAtom(
      'C',
      { x: Math.cos(angle), y: Math.sin(angle), z: 0 },
      .2
    );
    scene.add(atom);
    molecule.push(atom);
  }

  // Связи между атомами теперь становятся маршрутами энергии
  for (let i = 0; i < molecule.length; i++) {
    const start = molecule[i].position;
    const end = molecule[(i + 1) % molecule.length].position;

    bonds.push({
      start,
      end,
      trigger() {
        return createEnergyPulse(start, end);
      }
    });
  }

  return { atoms: molecule, bonds };
}
