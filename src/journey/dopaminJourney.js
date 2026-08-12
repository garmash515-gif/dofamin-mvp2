// DOPAMIN — client journey
// The product does not search for people. A user may invite someone to share an experience.
// The destination remains secret until both participants choose "Получить магию".

export const DOPAMIN_JOURNEY = [
  {
    id: 'welcome',
    title: 'ДОФАМИН',
    subtitle: 'Свидание-сюрприз',
    prompt: 'Ты можешь пригласить кого-то разделить этот опыт.',
    action: 'Пригласить разделить',
    next: 'wishlist'
  },
  {
    id: 'wishlist',
    title: 'Твой вишлист',
    subtitle: 'Что ты хочешь пережить?',
    prompt: 'Выбери то, что тебе действительно хочется попробовать.',
    fields: ['Вишлист'],
    next: 'red-flags'
  },
  {
    id: 'red-flags',
    title: 'Красные флаги',
    subtitle: 'Что для тебя точно нельзя?',
    prompt: 'Мы учтём это при создании опыта.',
    fields: ['Красные флаги'],
    next: 'partner-link'
  },
  {
    id: 'partner-link',
    title: 'Пригласи партнёра',
    subtitle: 'Разделить магию можно с кем угодно',
    prompt: 'Отправь ссылку человеку, с которым хочешь провести этот вечер.',
    action: 'Скопировать ссылку',
    next: 'partner-input'
  },
  {
    id: 'partner-input',
    title: 'Теперь его/её очередь',
    subtitle: 'Тот же короткий путь',
    prompt: 'Партнёр добавляет свой вишлист и свои красные флаги. Без анкеты и фото.',
    fields: ['Вишлист партнёра', 'Красные флаги партнёра'],
    next: 'match'
  },
  {
    id: 'match',
    title: 'Мы собрали ваш опыт',
    subtitle: 'Совпадения учтены. Ограничения учтены.',
    prompt: 'Мы не показываем место. Только сценарий, который подходит вам обоим.',
    next: 'magic'
  },
  {
    id: 'magic',
    title: 'Магия готова',
    subtitle: 'Куда вы отправитесь — пока секрет',
    prompt: 'Вы оба увидите только то, что нужно знать заранее: адрес и что надеть.',
    action: 'Получить магию',
    reveal: ['Адрес', 'Что надеть']
  }
];

export function getJourneyStep(id) {
  return DOPAMIN_JOURNEY.find(step => step.id === id) || DOPAMIN_JOURNEY[0];
}
