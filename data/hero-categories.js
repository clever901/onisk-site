// Onisk — hero-изображения для страниц категорий галереи.
// Каждая категория может иметь свою пару изображений (левое/правое), как на
// макетах: например, для Cartoon/Animation — розовая птица слева и дом-кот
// справа. Пока реальных category-специфичных hero нет, используются те же
// изображения, что и на главной странице (портрет + кот-город) как временная
// заглушка — заменить, как только будут присланы нужные картины.
//
// left / right — пути к WebP-файлам (создаются так же, как остальные
// декоративные ассеты — preview не нужен, только один крупный размер).

const HERO_CATEGORIES = {
  'All': {
    left: 'images/hero/portrait-glass.webp',
    right: 'images/hero/cat-city.webp',
    catTint: true
  },
  'Dark Art': {
    left: 'images/hero/dark-art-hare.webp',
    right: 'images/hero/dark-art-forest.webp',
    noMoon: true,
    coldGraphite: true,
    hareScaleDown: true
  },
  'Portraits': {
    left: 'images/hero/portraits-cat.webp',
    right: 'images/hero/portraits-blue-orb.webp',
    noMoon: true,
    flatBg: true,
    denseStars: true,
    portraitsFit: true
  },
  'Fantasy': {
    left: 'images/hero/fantasy-bird-woman-v2.webp',
    right: 'images/hero/fantasy-creature.webp',
    noMoon: true,
    mutedForest: true
  },
  'Surreal': {
    left: 'images/hero/surreal-monster-v2.webp',
    right: 'images/hero/surreal-butterfly-girl-v2.webp',
    noMoon: true,
    petrolTeal: true
  },
  'Fashion': {
    left: 'images/hero/fashion-portrait-v3.webp',
    right: 'images/hero/fashion-runway-v3.webp',
    noMoon: true,
    plumGraphite: true
  },
  'Cartoon / Animation': {
    left: 'images/hero/cartoon-bird-hero.webp',
    right: 'images/hero/cartoon-biomech-v2.webp',
    dreamyViolet: true,
    denseStars: true,
    noMoon: true
  }
};
