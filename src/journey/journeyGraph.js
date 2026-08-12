// Блок Б2: отдельный граф пользовательского пути.
// Химическая структура молекулы живёт отдельно.
// Этот граф отвечает только за сценарий Дофамин.

export const JOURNEY_GRAPH = {
  start: 'welcome',
  nodes: {
    welcome: {
      title: 'Начало',
      next: 'wishlist'
    },
    wishlist: {
      title: 'Твой вишлист',
      next: 'red-flags'
    },
    'red-flags': {
      title: 'Красные флаги',
      next: 'mood'
    },
    mood: {
      title: 'Ваше настроение',
      next: 'partner-link'
    },
    'partner-link': {
      title: 'Пригласить разделить',
      next: 'partner'
    },
    partner: {
      title: 'Партнёр',
      next: 'match'
    },
    match: {
      title: 'Собираем ваш опыт',
      next: 'magic'
    },
    magic: {
      title: 'Магия',
      next: null
    }
  }
};

export function getJourneyNode(id) {
  return JOURNEY_GRAPH.nodes[id];
}
