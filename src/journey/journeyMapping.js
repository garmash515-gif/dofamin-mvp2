// DOPAMIN — Block B7
// Single source of truth for validating the product mapping before visual effects.

export const JOURNEY_MAPPING = [
  { step: 'welcome', atomId: 'C1', next: 'wishlist' },
  { step: 'wishlist', atomId: 'C2', next: 'red-flags' },
  { step: 'red-flags', atomId: 'C3', next: 'mood' },
  { step: 'mood', atomId: 'C4', next: 'partner-link' },
  { step: 'partner-link', atomId: 'C7', next: 'partner' },
  { step: 'partner', atomId: 'C8', next: 'match' },
  { step: 'match', atomId: 'N1', next: 'magic' },
  { step: 'magic', atomId: 'O1', next: null }
];

export function validateJourneyMapping(mapping = JOURNEY_MAPPING) {
  const errors = [];
  const steps = new Set();
  const atoms = new Set();

  for (const node of mapping) {
    if (steps.has(node.step)) errors.push(`Повтор этапа: ${node.step}`);
    if (atoms.has(node.atomId)) errors.push(`Повтор атома: ${node.atomId}`);
    steps.add(node.step);
    atoms.add(node.atomId);

    if (node.next && !mapping.some(item => item.step === node.next)) {
      errors.push(`Следующий этап не найден: ${node.step} → ${node.next}`);
    }
  }

  const first = mapping[0];
  if (!first || first.step !== 'welcome') errors.push('Путь должен начинаться с Начало');

  const last = mapping[mapping.length - 1];
  if (!last || last.step !== 'magic' || last.next !== null) {
    errors.push('Путь должен заканчиваться на Магия');
  }

  return { valid: errors.length === 0, errors };
}

export function getMappingNode(step) {
  return JOURNEY_MAPPING.find(node => node.step === step) || null;
}

export function getMappingAtom(step) {
  return getMappingNode(step)?.atomId || null;
}

export function getNextStep(step) {
  return getMappingNode(step)?.next || null;
}
