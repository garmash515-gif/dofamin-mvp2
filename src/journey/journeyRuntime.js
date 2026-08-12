// DOPAMIN — Block V7
// Runtime bridge between atom interaction, journey, energy and camera.

import { createJourneyTransition, startJourneyTransition } from './journeyTransition.js';

export function createJourneyRuntime({ cameraController, atomViews = {} } = {}) {
  let currentStep = 'welcome';
  const pulses = [];

  function completeCurrentStep() {
    const transition = createJourneyTransition(currentStep, atomViews);
    if (!transition) return null;

    const pulse = startJourneyTransition(transition);
    if (pulse) pulses.push(pulse);

    currentStep = transition.toStep || currentStep;

    if (cameraController && transition.toView) {
      cameraController.focusOn?.(transition.toView);
    }

    return transition;
  }

  function update(delta) {
    for (let i = pulses.length - 1; i >= 0; i--) {
      const pulse = pulses[i];
      if (pulse.userData?.alive === false) pulses.splice(i, 1);
    }
  }

  return {
    completeCurrentStep,
    update,
    getCurrentStep: () => currentStep
  };
}
