// DOPAMIN — Block V2
// Connect completed journey steps with energy transitions.

import { getNextStep } from './journeyMapping.js';

export function createJourneyTransition(step, atomResolver) {
  const nextStep = getNextStep(step);
  if (!nextStep) return null;

  return {
    fromStep: step,
    toStep: nextStep,
    fromAtom: atomResolver(step),
    toAtom: atomResolver(nextStep),
    state: 'active',
    energy: 'journey'
  };
}

export function resolveEnergyRoute(step, atomResolver) {
  const transition = createJourneyTransition(step, atomResolver);

  if (!transition) {
    return {
      active: false,
      reason: 'Последний этап маршрута'
    };
  }

  return {
    active: true,
    pulse: {
      startAtom: transition.fromAtom,
      endAtom: transition.toAtom,
      type: transition.energy
    },
    unlock: transition.toStep
  };
}
