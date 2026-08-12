import { atom } from './atoms.js';
import { bond } from './bonds.js';
import { createAtom } from './atom.js';
import { createMoleculeView } from './moleculeView.js';
import { createEnergyPulse } from '../effects/energyFlow.js';
import { apply3DConformation } from './conformation.js';
import { JOURNEY_LAYOUT, JOURNEY_ROUTE } from './moleculeLayout.js';

// One visible atom = one meaningful step of the client journey.
const JOURNEY_ATOMS = {
  C1: { step: 'welcome', label: 'Начало' },
  C2: { step: 'wishlist', label: 'Вишлист' },
  C3: { step: 'red-flags', label: 'Красные флаги' },
  C4: { step: 'mood', label: 'Ваше настроение' },
  C7: { step: 'partner-link', label: 'Пригласить разделить' },
  C8: { step: 'partner', label: 'Партнёр' },
  N1: { step: 'match', label: 'Собираем ваш опыт' },
  O1: { step: 'magic', label: 'Магия' }
};

export function createDopamineGraph() {
  const r = 0.58;
  const ring = [];
  for (let i = 0; i < 6; i++) {
    const a = Math.PI / 2 + i * Math.PI / 3;
    ring.push(atom(`C${i + 1}`, 'C', { x: Math.cos(a) * r, y: Math.sin(a) * r, z: 0 }));
  }

  const atoms = [...ring,
    atom('O1', 'O', { x: -0.29, y: 0.92, z: 0 }), atom('H_O1', 'H', { x: -0.29, y: 1.12, z: 0 }),
    atom('O2', 'O', { x: -0.78, y: 0.34, z: 0 }), atom('H_O2', 'H', { x: -0.98, y: 0.45, z: 0 }),
    atom('C7', 'C', { x: 0.78, y: -0.92, z: 0 }), atom('C8', 'C', { x: 1.12, y: -1.46, z: 0 }),
    atom('N1', 'N', { x: 1.44, y: -2.00, z: 0 }), atom('H_N1', 'H', { x: 1.65, y: -2.22, z: 0 }),
    atom('H_C3', 'H', { x: -0.78, y: -0.34, z: 0 }), atom('H_C5', 'H', { x: 0.78, y: 0.34, z: 0 }), atom('H_C6', 'H', { x: 0.98, y: 0.80, z: 0 })
  ];

  apply3DConformation(atoms);

  // Product layout is authoritative for journey atoms; chemistry remains intact.
  for (const data of atoms) {
    const layout = JOURNEY_LAYOUT[data.id];
    if (layout) data.position = { x: layout.x, y: layout.y, z: layout.z };
  }

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
  molecule.userData.journeyAtoms = JOURNEY_ATOMS;
  molecule.userData.journeyRoute = JOURNEY_ROUTE;

  for (const data of graph.atoms) {
    const size = data.element === 'C' ? 0.105 : data.element === 'O' ? 0.13 : 0.065;
    const view = createAtom(data.element, data.position, size);
    view.userData.id = data.id;

    const journey = JOURNEY_ATOMS[data.id];
    if (journey) {
      view.userData.journeyStep = journey.step;
      view.userData.journeyLabel = journey.label;
      view.userData.isJourneyAtom = true;
      view.userData.layout = JOURNEY_LAYOUT[data.id];
      view.userData.journeyCenter = view.position;
    }

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

  // Journey route bonds are explicitly addressable by atom pair.
  molecule.userData.journeyBonds = JOURNEY_ROUTE.map(([from, to]) => ({
    from,
    to,
    start: atomMap.get(from),
    end: atomMap.get(to),
    object: viewBonds.find(b =>
      (b.start === atomMap.get(from) && b.end === atomMap.get(to)) ||
      (b.start === atomMap.get(to) && b.end === atomMap.get(from))
    )?.object || null
  }));

  molecule.userData.bonds = viewBonds;
  scene.add(molecule);
  return { molecule, atoms: [...atomMap.values()], bonds: viewBonds, graph };
}
