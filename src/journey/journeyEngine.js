export const JOURNEY_STEPS = [
  { id: 'wishlist', title: 'Твой вишлист', prompt: 'Что ты хочешь пережить?', fields: ['wishlist'] },
  { id: 'red-flags', title: 'Красные флаги', prompt: 'Что для тебя точно нельзя?', fields: ['redFlags'] },
  { id: 'mood', title: 'Ваше настроение', prompt: 'Какой должна быть энергия этого вечера?', options: ['Спокойно', 'Весело', 'Энергично', 'Романтично', 'Особенно'] },
  { id: 'partner-link', title: 'Пригласить разделить', prompt: 'Отправь ссылку человеку, с которым хочешь прожить этот опыт.', action: 'Скопировать ссылку' },
  { id: 'partner', title: 'Партнёр', prompt: 'Партнёр добавляет свой вишлист, красные флаги и настроение. Без анкеты и фото.' },
  { id: 'match', title: 'Мы собираем ваш опыт', prompt: 'Пересекаем желания, учитываем настроение и исключаем табу.' },
  { id: 'magic', title: 'Получить магию', prompt: 'Три варианта свидания. Место и детали остаются сюрпризом до подтверждения.', options: ['Вариант 1', 'Вариант 2', 'Вариант 3'], reveal: ['Адрес', 'Что надеть'] }
];

export function getJourneyForAtom(type) {
  const key = String(type || '').toLowerCase();
  if (key.includes('wish')) return JOURNEY_STEPS[0];
  if (key.includes('flag')) return JOURNEY_STEPS[1];
  if (key.includes('mood')) return JOURNEY_STEPS[2];
  if (key.includes('invite')) return JOURNEY_STEPS[3];
  if (key.includes('partner')) return JOURNEY_STEPS[4];
  if (key.includes('match')) return JOURNEY_STEPS[5];
  if (key.includes('magic')) return JOURNEY_STEPS[6];
  return JOURNEY_STEPS[0];
}
