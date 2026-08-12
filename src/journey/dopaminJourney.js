// DOPAMIN — client journey
// The product does not search for people. A user may invite someone to share an experience.
// The destination remains secret until both participants choose "Получить магию".

export const DOPAMIN_JOURNEY = [
  {
    id: 'welcome',
    atom: 'WELCOME',
    title: 'ДОФАМИН',
    subtitle: 'Свидание-сюрприз',
    prompt: 'Ты можешь пригласить кого-то разделить этот опыт.',
    action: 'Пригласить разделить',
    next: 'wishlist'
  },
  {
    id: 'wishlist',
    atom: 'WISHLIST',
    title: 'Твой вишлист',
    subtitle: 'Что ты хочешь пережить?',
    fields: ['Вишлист'],
    next: 'red-flags'
  },
  {
    id: 'red-flags',
    atom: 'RED_FLAGS',
    title: 'Красные флаги',
    subtitle: 'Что точно нельзя?',
    fields: ['Красные флаги'],
    next: 'mood'
  },
  {
    id: 'mood',
    atom: 'MOOD',
    title: 'Ваше настроение',
    subtitle: 'Какой должна быть энергия вечера?',
    options: [
      '🌿 Спокойствие',
      '🔥 Энергия',
      '😂 Веселье',
      '❤️ Романтика',
      '✨ Особенный момент'
    ],
    next: 'partner-link'
  },
  {
    id: 'partner-link',
    atom: 'INVITE',
    title: 'Пригласи разделить',
    subtitle: 'Не ищем человека — создаём опыт вместе',
    action: 'Скопировать ссылку',
    next: 'partner-input'
  },
  {
    id: 'partner-input',
    atom: 'PARTNER',
    title: 'Второе ядро',
    subtitle: 'Партнёр проходит такой же короткий путь',
    fields: ['Вишлист партнёра', 'Красные флаги партнёра', 'Настроение партнёра'],
    next: 'match'
  },
  {
    id: 'match',
    atom: 'MATCH',
    title: 'Синхронизация пары',
    subtitle: 'Совпадения найдены. Ограничения учтены.',
    prompt: 'Мы собираем безопасное пространство для двоих.',
    next: 'magic'
  },
  {
    id: 'magic',
    atom: 'MAGIC',
    title: 'Магия готова',
    subtitle: 'Место остаётся секретом',
    options: [
      '🌿 Лёгкая магия',
      '🍷 Особенный вечер',
      '💎 Большая магия'
    ],
    action: 'Получить магию',
    reveal: ['Адрес', 'Время', 'Что надеть', 'Оплата']
  }
];

export function getJourneyStep(id) {
  return DOPAMIN_JOURNEY.find(step => step.id === id) || DOPAMIN_JOURNEY[0];
}
