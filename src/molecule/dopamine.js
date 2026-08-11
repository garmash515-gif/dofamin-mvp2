import { createAtom } from './atom.js';

export function createDopamineMolecule(scene) {
  const molecule = [];

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

  return molecule;
}
