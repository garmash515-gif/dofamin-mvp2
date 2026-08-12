// Bridge between the visual molecule and the customer journey.
// Chemical graph stays independent; this layer maps product steps to atoms.

export const MOLECULE_JOURNEY_MAP = {
  C1: 'welcome',
  C2: 'wishlist',
  C3: 'red-flags',
  C4: 'mood',
  C7: 'partner-link',
  C8: 'partner',
  N1: 'match',
  O1: 'magic'
};

export function getJourneyForAtom(atomId) {
  return MOLECULE_JOURNEY_MAP[atomId] || null;
}

export function isJourneyAtom(atomId) {
  return Boolean(MOLECULE_JOURNEY_MAP[atomId]);
}

export function attachJourneyMetadata(view, atomId) {
  const journeyStep = getJourneyForAtom(atomId);

  if (!journeyStep) return view;

  view.userData.journey = {
    step: journeyStep,
    state: 'available'
  };

  return view;
}
