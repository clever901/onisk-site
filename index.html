// Onisk — лайки работ, хранятся локально в браузере посетителя (localStorage).
// Никакой базы данных и общего счётчика нет: это личная отметка "мне нравится"
// для каждого конкретного человека, привязанная к его браузеру.

const Likes = (function () {
  const KEY = 'onisk_likes';

  function getAll() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function isLiked(slug) {
    return !!getAll()[slug];
  }

  // Переключает лайк и возвращает новое состояние (true = теперь лайкнуто).
  function toggle(slug) {
    const all = getAll();
    if (all[slug]) {
      delete all[slug];
    } else {
      all[slug] = true;
    }
    try {
      localStorage.setItem(KEY, JSON.stringify(all));
    } catch (e) {
      // localStorage недоступен (приватный режим и т.п.) — молча игнорируем,
      // лайк просто не сохранится между визитами.
    }
    return !!all[slug];
  }

  return { isLiked, toggle };
})();
