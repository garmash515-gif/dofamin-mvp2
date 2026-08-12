// DOPAMIN — V9.4
// Single bridge between journey graph, real atoms and energy flow.

export function getAtomCenter(atom) {
  if (!atom) return null;

  if (atom.getWorldPosition) {
    const target = atom.position.clone();
    return atom.getWorldPosition(target);
  }

  return atom.position?.clone?.() || null;
}

export function resolveRuntimeJourneyBond(molecule, fromId, toId) {
  const from = molecule?.userData?.atomMap?.get(fromId);
  const to = molecule?.userData?.atomMap?.get(toId);

  if (!from || !to) return null;

  return {
    fromId,
    toId,
    from,
    to,
    start: getAtomCenter(from),
    end: getAtomCenter(to),
    type: 'journey-runtime'
  };
}

export function createRuntimeEnergyTransition(molecule, fromId, toId, createPulse) {
  const bond = resolveRuntimeJourneyBond(molecule, fromId, toId);
  if (!bond || !createPulse) return null;

  const pulse = createPulse(bond.start, bond.end);
  pulse.userData.route = {
    from: fromId,
    to: toId,
    source: 'real-scene-anchor'
  };

  return pulse;
}

export function getRuntimeCameraTarget(molecule, atomId) {
  return molecule?.userData?.atomMap?.get(atomId) || null;
}
