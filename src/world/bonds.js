// DOPAMIN — World Bond Layer
// Connections are defined independently from rendered objects.
// Renderer decides how to draw them from actual object centers.

export const WORLD_BONDS = [
  {
    from: 'C1',
    to: 'C2',
    type: 'journey',
    label: 'Начало → Вишлист'
  },
  {
    from: 'C2',
    to: 'C3',
    type: 'journey',
    label: 'Вишлист → Красные флаги'
  },
  {
    from: 'C3',
    to: 'C4',
    type: 'journey',
    label: 'Красные флаги → Настроение'
  },
  {
    from: 'C4',
    to: 'C7',
    type: 'journey',
    label: 'Настроение → Приглашение'
  },
  {
    from: 'C7',
    to: 'C8',
    type: 'journey',
    label: 'Приглашение → Партнёр'
  },
  {
    from: 'C8',
    to: 'N1',
    type: 'journey',
    label: 'Партнёр → Совместный опыт'
  },
  {
    from: 'N1',
    to: 'O1',
    type: 'journey',
    label: 'Опыт → Магия'
  }
];

export function getWorldBond(from, to) {
  return WORLD_BONDS.find(
    bond => bond.from === from && bond.to === to
  ) || null;
}

export function getWorldBonds() {
  return WORLD_BONDS;
}
