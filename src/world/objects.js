// DOPAMIN — World Objects Layer
// Coordinates define WHERE. Objects define WHAT lives there.
// This separation allows replacing atoms with any scene object later.

export const WORLD_OBJECTS = {
  C1: {
    type: 'atom',
    model: 'carbon',
    journeyStep: 'welcome',
    label: 'Начало'
  },

  C2: {
    type: 'atom',
    model: 'carbon',
    journeyStep: 'wishlist',
    label: 'Вишлист'
  },

  C3: {
    type: 'atom',
    model: 'carbon',
    journeyStep: 'red-flags',
    label: 'Красные флаги'
  },

  C4: {
    type: 'atom',
    model: 'carbon',
    journeyStep: 'mood',
    label: 'Ваше настроение'
  },

  C7: {
    type: 'atom',
    model: 'carbon',
    journeyStep: 'partner-link',
    label: 'Пригласить разделить'
  },

  C8: {
    type: 'atom',
    model: 'carbon',
    journeyStep: 'partner',
    label: 'Партнёр'
  },

  N1: {
    type: 'atom',
    model: 'nitrogen',
    journeyStep: 'match',
    label: 'Собираем ваш опыт'
  },

  O1: {
    type: 'atom',
    model: 'oxygen',
    journeyStep: 'magic',
    label: 'Магия'
  }
};

export function getWorldObject(id) {
  return WORLD_OBJECTS[id] || null;
}

export function getWorldObjects() {
  return Object.entries(WORLD_OBJECTS).map(([id, object]) => ({
    id,
    ...object
  }));
}
