// DOPAMIN — V9.1
// Explicit spatial map for meaningful journey atoms.
// This is intentionally separate from the chemical graph so product navigation
// can use stable centers and camera anchors without moving atoms in flight.

export const JOURNEY_LAYOUT = {
  C1: { x: 0.00, y: 0.00, z: 0.00, step: 'welcome', label: 'Начало' },
  C2: { x: 0.95, y: 0.28, z: 0.12, step: 'wishlist', label: 'Вишлист' },
  C3: { x: 1.72, y: -0.12, z: 0.05, step: 'red-flags', label: 'Красные флаги' },
  C4: { x: 1.05, y: -0.92, z: 0.18, step: 'mood', label: 'Ваше настроение' },
  C7: { x: 0.18, y: -1.48, z: 0.10, step: 'partner-link', label: 'Пригласить разделить' },
  C8: { x: -0.82, y: -1.92, z: -0.02, step: 'partner', label: 'Партнёр' },
  N1: { x: -1.58, y: -2.38, z: 0.08, step: 'match', label: 'Собираем ваш опыт' },
  O1: { x: -1.28, y: 0.82, z: 0.22, step: 'magic', label: 'Магия' }
};

export const JOURNEY_ROUTE = [
  ['C1', 'C2'],
  ['C2', 'C3'],
  ['C3', 'C4'],
  ['C4', 'C7'],
  ['C7', 'C8'],
  ['C8', 'N1'],
  ['N1', 'O1']
];

export function getJourneyLayout(id) {
  return JOURNEY_LAYOUT[id] || null;
}

export function getJourneyRoute() {
  return JOURNEY_ROUTE.map(([from, to]) => ({ from, to }));
}
