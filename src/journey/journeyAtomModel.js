// DOPAMIN — Block B1
// Модель атома пути: продуктовый слой поверх химической молекулы.

export const ATOM_STATES = {
  LOCKED: 'locked',
  AVAILABLE: 'available',
  ACTIVE: 'active',
  COMPLETED: 'completed'
};

export function createJourneyAtom({
  id,
  title,
  description = '',
  step,
  next = null,
  action = null
}) {
  return {
    id,
    title,
    description,
    step,
    next,
    action,
    state: ATOM_STATES.LOCKED,
    cameraAnchor: null,
    visual: {
      glow: false,
      scale: 1
    }
  };
}

export const JOURNEY_ATOM_SCHEMA = {
  welcome: createJourneyAtom({
    id: 'welcome',
    title: 'Начало',
    description: 'Создай опыт, который хочется разделить',
    step: 'welcome',
    next: 'wishlist',
    action: 'Начать'
  }),

  wishlist: createJourneyAtom({
    id: 'wishlist',
    title: 'Твой вишлист',
    description: 'Что ты хочешь пережить?',
    step: 'wishlist',
    next: 'red-flags',
    action: 'Заполнить'
  }),

  redFlags: createJourneyAtom({
    id: 'red-flags',
    title: 'Красные флаги',
    description: 'Что точно нельзя?',
    step: 'red-flags',
    next: 'mood',
    action: 'Добавить'
  }),

  mood: createJourneyAtom({
    id: 'mood',
    title: 'Ваше настроение',
    description: 'Какой должна быть энергия вечера?',
    step: 'mood',
    next: 'invite'
  }),

  magic: createJourneyAtom({
    id: 'magic',
    title: 'Магия',
    description: 'Получите созданный для вас опыт',
    step: 'magic',
    action: 'Получить магию'
  })
};
