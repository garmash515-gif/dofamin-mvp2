export const dopaminJourney = {
  id: 'dopamin-date',
  title: 'Дофамин',
  description: 'Создай совместное впечатление, не выбирая человека',
  steps: [
    {
      id: 'core',
      atom: 'CORE',
      title: 'Создать ядро',
      text: 'Расскажи, что ты хочешь пережить, и что точно не подходит.',
      fields: ['wishlist', 'redFlags'],
      action: 'CREATE_CORE'
    },
    {
      id: 'invite',
      atom: 'INVITE',
      title: 'Пригласить партнера',
      text: 'Отправь ссылку человеку, с которым хочешь создать опыт.',
      action: 'INVITE_PARTNER'
    },
    {
      id: 'partner',
      atom: 'PARTNER',
      title: 'Второе ядро',
      text: 'Партнер добавляет свои желания и ограничения.',
      action: 'FILL_PARTNER'
    },
    {
      id: 'match',
      atom: 'MATCH',
      title: 'Синхронизация',
      text: 'Система находит безопасную зону интереса для двоих.',
      action: 'ANALYZE_PAIR'
    },
    {
      id: 'magic',
      atom: 'MAGIC',
      title: 'Получить магию',
      text: 'Открывается только после согласия обоих. До этого скрыто всё лишнее.',
      action: 'GET_MAGIC',
      reveal: ['address', 'time', 'dressCode']
    }
  ]
};
