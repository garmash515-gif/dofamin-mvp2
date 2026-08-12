// DOPAMIN — Block B6/B7
// Product interaction must only target meaningful journey atoms.
// Chemical atoms remain visible but are not part of the client path.

export const ATOM_ROLES = {
  JOURNEY: 'journey',
  CHEMICAL: 'chemical'
};

export function classifyAtom(view, journeyAtoms = {}) {
  const id = view?.userData?.id;
  const journey = id ? journeyAtoms[id] : null;

  view.userData.atomRole = journey ? ATOM_ROLES.JOURNEY : ATOM_ROLES.CHEMICAL;
  view.userData.interactive = Boolean(journey);

  return view.userData.atomRole;
}

export function isJourneyAtom(view) {
  return view?.userData?.atomRole === ATOM_ROLES.JOURNEY;
}

export function isInteractiveAtom(view) {
  return isJourneyAtom(view) && view?.userData?.interactive === true;
}

export function classifyMoleculeAtoms(atoms, journeyAtoms = {}) {
  for (const view of atoms) classifyAtom(view, journeyAtoms);
  return atoms;
}

export function getJourneyAtoms(atoms) {
  return atoms.filter(isJourneyAtom);
}

export function getChemicalAtoms(atoms) {
  return atoms.filter(view => view?.userData?.atomRole === ATOM_ROLES.CHEMICAL);
}
