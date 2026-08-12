// DOPAMIN — Journey Engine
// Block A: executable client journey.

export const JOURNEY_STEPS = {
  welcome: {
    id: 'welcome',
    title: 'ДОФАМИН',
    action: 'Пригласить разделить',
    next: 'core'
  },
  core: {
    id: 'core',
    title: 'Моё ядро',
    next: 'wishlist'
  },
  wishlist: {
    id: 'wishlist',
    title: 'Твой вишлист',
    prompt: 'Что ты хочешь пережить?',
    fields: ['wishlist'],
    next: 'red-flags'
  },
  'red-flags': {
    id: 'red-flags',
    title: 'Красные флаги',
    prompt: 'Что для тебя точно нельзя?',
    fields: ['redFlags'],
    next: 'mood'
  },
  mood: {
    id: 'mood',
    title: 'Ваше настроение',
    prompt: 'Какой должна быть энергия вечера?',
    options: ['Спокойно', 'Весело', 'Энергично', 'Романтично', 'Особенно'],
    next: 'invite'
  },
  invite: {
    id: 'invite',
    title: 'Пригласить разделить',
    action: 'Скопировать ссылку',
    next: 'partner'
  },
  partner: {
    id: 'partner',
    title: 'Партнёр',
    prompt: 'Вишлист, красные флаги и настроение партнёра.',
    next: 'match'
  },
  match: {
    id: 'match',
    title: 'Сборка опыта',
    prompt: 'Пересечение желаний, настроений и ограничений.',
    next: 'magic'
  },
  magic: {
    id: 'magic',
    title: 'Получить магию',
    options: ['Вариант 1', 'Вариант 2', 'Вариант 3'],
    reveal: ['Адрес', 'Что надеть']
  }
};

export function getStep(id) {
  return JOURNEY_STEPS[id] || JOURNEY_STEPS.welcome;
}

export function nextStep(id) {
  const step = getStep(id);
  return step.next ? getStep(step.next) : step;
}

export function getJourneyForAtom(type) {
  const key = String(type || '').toLowerCase();
  if (key.includes('wish')) return JOURNEY_STEPS.wishlist;
  if (key.includes('flag')) return JOURNEY_STEPS['red-flags'];
  if (key.includes('mood')) return JOURNEY_STEPS.mood;
  if (key.includes('invite')) return JOURNEY_STEPS.invite;
  if (key.includes('partner')) return JOURNEY_STEPS.partner;
  if (key.includes('match')) return JOURNEY_STEPS.match;
  if (key.includes('magic')) return JOURNEY_STEPS.magic;
  return JOURNEY_STEPS.welcome;
}
