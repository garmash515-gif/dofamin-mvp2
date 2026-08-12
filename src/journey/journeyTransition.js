// DOPAMIN — Block V5/V6
// Coordinates journey state changes, energy flow and camera focus.

import { getMappingNode } from './journeyMapping.js';
import { createJourneyEnergy } from '../effects/energyFlow.js';

export const JOURNEY_EVENTS = {
  STEP_STARTED: 'STEP_STARTED',
  STEP_COMPLETED: 'STEP_COMPLETED',
  ENERGY_STARTED: 'ENERGY_STARTED',
  ENERGY_FINISHED: 'ENERGY_FINISHED',
  STEP_UNLOCKED: 'STEP_UNLOCKED',
  CAMERA_FOCUS: 'CAMERA_FOCUS'
};

export function createJourneyTransition(step, atomViews = {}) {
  const node = getMappingNode(step);
  if (!node) return null;

  const next = node.next ? getMappingNode(node.next) : null;
  if (!next) return {
    fromStep: step,
    toStep: null,
    fromAtom: node.atomId,
    toAtom: null,
    terminal: true,
    events: [JOURNEY_EVENTS.STEP_COMPLETED]
  };

  const fromView = atomViews[node.atomId];
  const toView = atomViews[next.atomId];

  return {
    fromStep: step,
    toStep: next.step,
    fromAtom: node.atomId,
    toAtom: next.atomId,
    fromView,
    toView,
    connection: {
      from: node.atomId,
      to: next.atomId,
      type: 'journey',
      state: 'active'
    },
    events: [
      JOURNEY_EVENTS.STEP_COMPLETED,
      JOURNEY_EVENTS.ENERGY_STARTED,
      JOURNEY_EVENTS.STEP_UNLOCKED,
      JOURNEY_EVENTS.CAMERA_FOCUS
    ]
  };
}

export function startJourneyTransition(transition) {
  if (!transition || transition.terminal || !transition.fromView || !transition.toView) return null;

  const start = transition.fromView.getWorldPosition
    ? transition.fromView.getWorldPosition(transition.fromView.position.clone())
    : transition.fromView.position.clone();
  const end = transition.toView.getWorldPosition
    ? transition.toView.getWorldPosition(transition.toView.position.clone())
    : transition.toView.position.clone();

  const pulse = createJourneyEnergy(start, end);
  pulse.userData.fromAtom = transition.fromAtom;
  pulse.userData.toAtom = transition.toAtom;
  pulse.userData.events = transition.events;
  pulse.userData.cameraAnchor = transition.toAtom;

  return pulse;
}

export function getTransitionCameraTarget(transition) {
  return transition?.toView || null;
}
