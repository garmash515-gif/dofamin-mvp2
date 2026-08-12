// DOPAMIN — V9.3
// Journey connections are resolved from actual scene objects.
// Energy, camera and glow should use real atom centers, not guessed coordinates.

export function resolveJourneyBond(atomMap, from, to) {
  const start = atomMap.get(from);
  const end = atomMap.get(to);

  if (!start || !end) return null;

  return {
    from,
    to,
    start,
    end,
    getStartPosition() {
      return start.getWorldPosition
        ? start.getWorldPosition(start.position.clone())
        : start.position.clone();
    },
    getEndPosition() {
      return end.getWorldPosition
        ? end.getWorldPosition(end.position.clone())
        : end.position.clone();
    }
  };
}

export function resolveJourneyBonds(atomMap, route = []) {
  return route
    .map(([from, to]) => resolveJourneyBond(atomMap, from, to))
    .filter(Boolean);
}

export function createEnergyPathFromBond(bond) {
  if (!bond) return null;

  return {
    from: bond.from,
    to: bond.to,
    start: bond.getStartPosition(),
    end: bond.getEndPosition()
  };
}
