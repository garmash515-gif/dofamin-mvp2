import { atom } from './atoms.js';
import { bond } from './bonds.js';
import { createAtom } from './atom.js';
import { createMoleculeView } from './moleculeView.js';
import { createEnergyPulse } from '../effects/energyFlow.js';
import { apply3DConformation } from './conformation.js';

export function createDopamineGraph() {
  const r = 0.72;
  const ring = [];
  for (let i = 0; i < 6; i++) {
    const a = Math.PI / 2 + i * Math.PI / 3;
    ring.push(atom(`C${i + 1}`, 'C', { x: Math.cos(a) * r, y: Math.sin(a) * r, z: 0 }));
  }

  const atoms = [...ring,
    atom('O1', 'O', { x: -0.36, y: 1.14, z: 0 }), atom('H_O1', 'H', { x: -0.36, y: 1.43, z: 0 }),
    atom('O2', 'O', { x: -0.98, y: 0.42, z: 0 }), atom('H_O2', 'H', { x: -1.24, y: 0.56, z: 0 }),
    atom('C7', 'C', { x: 0.98, y: -1.14, z: 0 }), atom('C8', 'C', { x: 1.38, y: -1.82, z: 0 }),
    atom('N1', 'N', { x: 1.78, y: -2.50, z: 0 }), atom('H_N1', 'H', { x: 2.05, y: -2.76, z: 0 }),
    atom('H_C3', 'H', { x: -0.98, y: -0.42, z: 0 }), atom('H_C5', 'H', { x: 0.98, y: 0.42, z: 0 }), atom('H_C6', 'H', { x: 1.24, y: 1.00, z: 0 })
  ];

  apply3DConformation(atoms);

  const bonds = [];
  const ringTypes = ['double', 'single', 'double', 'single', 'double', 'single'];
  for (let i = 0; i < 6; i++) bonds.push(bond(ring[i].id, ring[(i + 1) % 6].id, ringTypes[i]));
  bonds.push(
    bond('C1', 'O1'), bond('O1', 'H_O1'), bond('C2', 'O2'), bond('O2', 'H_O2'),
    bond('C4', 'C7'), bond('C7', 'C8'), bond('C8', 'N1'), bond('N1', 'H_N1'),
    bond('C3', 'H_C3'), bond('C5', 'H_C5'), bond('C6', 'H_C6')
  );
  return { atoms, bonds };
}

export function createDopamineMolecule(scene) {
  const graph = createDopamineGraph();
  const molecule = createMoleculeView(graph);
  const atomMap = new Map();
  molecule.userData.atomMap = atomMap;

  for (const data of graph.atoms) {
    const size = data.element === 'C' ? 0.105 : data.element === 'O' ? 0.13 : 0.065;
    const view = createAtom(data.element, data.position, size);
    view.userData.id = data.id;
    atomMap.set(data.id, view);
    molecule.add(view);
  }

  const viewBonds = [];
  for (const data of graph.bonds) {
    const start = atomMap.get(data.from);
    const end = atomMap.get(data.to);
    const object = molecule.userData.createBondView(start, end, data.type);
    molecule.add(object);
    viewBonds.push({ start, end, object, type: data.type, trigger() {
      return createEnergyPulse(start.position, end.position);
    }});
  }

  molecule.userData.bonds = viewBonds;
  scene.add(molecule);
  return { molecule, atoms: [...atomMap.values()], bonds: viewBonds, graph };
}
