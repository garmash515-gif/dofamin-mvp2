// DOPAMIN — Block B5
// Связи молекулы получают роль маршрута клиента.

export const BOND_STATES = {
  LOCKED: 'locked',
  AVAILABLE: 'available',
  ACTIVE: 'active',
  COMPLETED: 'completed'
};

export function createJourneyBond({ from, to, type = 'journey' }) {
  return {
    from,
    to,
    type,
    state: BOND_STATES.LOCKED,
    energy: false,
    progress: 0
  };
}

export function activateBond(bond) {
  bond.state = BOND_STATES.ACTIVE;
  bond.energy = true;
  bond.progress = 0;
  return bond;
}

export function completeBond(bond) {
  bond.state = BOND_STATES.COMPLETED;
  bond.energy = false;
  bond.progress = 1;
  return bond;
}

export function unlockBond(bond) {
  bond.state = BOND_STATES.AVAILABLE;
  return bond;
}

export const JOURNEY_BONDS = [
  createJourneyBond({ from: 'welcome', to: 'wishlist' }),
  createJourneyBond({ from: 'wishlist', to: 'red-flags' }),
  createJourneyBond({ from: 'red-flags', to: 'mood' }),
  createJourneyBond({ from: 'mood', to: 'invite' }),
  createJourneyBond({ from: 'invite', to: 'partner' }),
  createJourneyBond({ from: 'partner', to: 'match' }),
  createJourneyBond({ from: 'match', to: 'magic' })
];
