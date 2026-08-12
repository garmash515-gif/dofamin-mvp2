// DOPAMIN — Block B4
// Управление состояниями атомов пользовательского пути.

import { ATOM_STATES } from './journeyAtomModel.js';

export function setAtomState(atom, state) {
  atom.state = state;

  atom.visual = atom.visual || {};

  switch (state) {
    case ATOM_STATES.ACTIVE:
      atom.visual.glow = true;
      atom.visual.scale = 1.15;
      break;

    case ATOM_STATES.AVAILABLE:
      atom.visual.glow = true;
      atom.visual.scale = 1.05;
      break;

    case ATOM_STATES.COMPLETED:
      atom.visual.glow = false;
      atom.visual.scale = 1;
      break;

    default:
      atom.visual.glow = false;
      atom.visual.scale = 0.92;
  }

  return atom;
}

export function activateJourneyAtom(atoms, id) {
  return Object.values(atoms).map(atom => {
    if (atom.id === id) {
      return setAtomState(atom, ATOM_STATES.ACTIVE);
    }

    if (atom.state === ATOM_STATES.ACTIVE) {
      return setAtomState(atom, ATOM_STATES.COMPLETED);
    }

    return atom;
  });
}

export function unlockNextAtom(atoms, currentId) {
  const current = atoms[currentId];

  if (!current || !current.next) return atoms;

  const next = atoms[current.next];
  if (next) {
    setAtomState(next, ATOM_STATES.AVAILABLE);
  }

  return atoms;
}
