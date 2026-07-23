// Onisk — данные о работах.
// Каждая работа = одна запись. Добавление новой работы = новая запись здесь,
// а не правка HTML. Названия работ на сайте не показываются — только
// изображение и теги (при клике в лайтбоксе).
//
// Категории (финальный список по макетам страниц галереи):
//   All, Dark Art, Portraits, Fantasy, Surreal, Fashion, Cartoon / Animation
//
// Поля:
//   slug       — стабильный id (используется для имён файлов и как ключ лайков)
//   tags       — { ru: [...], en: [...], uk: [...] } — параллельные массивы,
//                порядок тегов должен совпадать между языками
//   featured   — true/false — попадает ли в превью на главной
//   dateAdded  — дата публикации на сайте (не дата создания арта!) 'YYYY-MM-DD'
//   w, h       — пиксельные размеры preview-изображения (для резервирования места)

const WORKS = [
  {
    slug: 'work-01', // лебедь в тумане
    tags: { ru: ['Фэнтези', 'Сюрреализм'], en: ['Fantasy', 'Surreal'], uk: ['Фентезі', 'Сюрреалізм'] },
    featured: true,
    dateAdded: '2026-07-04',
    w: 800,
    h: 1069,
    preview: 'images/preview/work-01.webp',
    full: 'images/full/work-01.webp'
  },
  {
    slug: 'work-25', // три скелетообразные ведьмы
    tags: { ru: ['Тёмное искусство'], en: ['Dark Art'], uk: ['Темне мистецтво'] },
    featured: false,
    dateAdded: '2026-07-11',
    w: 800,
    h: 1000,
    preview: 'images/preview/work-25.webp',
    full: 'images/full/work-25.webp'
  },
  {
    slug: 'work-03', // портрет старика
    tags: { ru: ['Портреты', 'Сюрреализм', 'Тёмное искусство'], en: ['Portraits', 'Surreal', 'Dark Art'], uk: ['Портрети', 'Сюрреалізм', 'Темне мистецтво'] },
    featured: true,
    dateAdded: '2026-07-04',
    w: 800,
    h: 1000,
    preview: 'images/preview/work-03.webp',
    full: 'images/full/work-03.webp'
  },
  {
    slug: 'work-12', // монстр с зубами
    tags: { ru: ['Сюрреализм'], en: ['Surreal'], uk: ['Сюрреалізм'] },
    featured: false,
    dateAdded: '2026-07-09',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-12.webp',
    full: 'images/full/work-12.webp'
  },
  {
    slug: 'work-07', // авангардная мода, тёмный подиум
    tags: { ru: ['Мода'], en: ['Fashion'], uk: ['Мода'] },
    featured: false,
    dateAdded: '2026-07-07',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-07.webp',
    full: 'images/full/work-07.webp'
  },
  {
    slug: 'work-42', // кот смотрит вверх, мультяшный
    tags: { ru: ['Мультфильм / Анимация'], en: ['Cartoon / Animation'], uk: ['Мультфільм / Анімація'] },
    featured: false,
    dateAdded: '2026-07-15',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-42.webp',
    full: 'images/full/work-42.webp'
  },
  {
    slug: 'work-02', // гриб-фея
    tags: { ru: ['Фэнтези'], en: ['Fantasy'], uk: ['Фентезі'] },
    featured: true,
    dateAdded: '2026-07-04',
    w: 800,
    h: 1069,
    preview: 'images/preview/work-02.webp',
    full: 'images/full/work-02.webp'
  },
  {
    slug: 'work-26', // вампир в стиле fashion-журнала
    tags: { ru: ['Тёмное искусство'], en: ['Dark Art'], uk: ['Темне мистецтво'] },
    featured: false,
    dateAdded: '2026-07-11',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-26.webp',
    full: 'images/full/work-26.webp'
  },
  {
    slug: 'work-18', // сфинкс-кошка крупным планом
    tags: { ru: ['Портреты'], en: ['Portraits'], uk: ['Портрети'] },
    featured: false,
    dateAdded: '2026-07-10',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-18.webp',
    full: 'images/full/work-18.webp'
  },
  {
    slug: 'work-13', // девушка-бабочка
    tags: { ru: ['Сюрреализм'], en: ['Surreal'], uk: ['Сюрреалізм'] },
    featured: false,
    dateAdded: '2026-07-09',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-13.webp',
    full: 'images/full/work-13.webp'
  },
  {
    slug: 'work-08', // подиум, золотой жакет и бордовая юбка
    tags: { ru: ['Мода'], en: ['Fashion'], uk: ['Мода'] },
    featured: false,
    dateAdded: '2026-07-08',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-08.webp',
    full: 'images/full/work-08.webp'
  },
  {
    slug: 'work-04', // кот-город
    tags: { ru: ['Фэнтези', 'Сюрреализм'], en: ['Fantasy', 'Surreal'], uk: ['Фентезі', 'Сюрреалізм'] },
    featured: true,
    dateAdded: '2026-07-04',
    w: 800,
    h: 1069,
    preview: 'images/preview/work-04.webp',
    full: 'images/full/work-04.webp'
  },
  {
    slug: 'work-27', // зловещий стимпанк-клоун
    tags: { ru: ['Тёмное искусство'], en: ['Dark Art'], uk: ['Темне мистецтво'] },
    featured: false,
    dateAdded: '2026-07-11',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-27.webp',
    full: 'images/full/work-27.webp'
  },
  {
    slug: 'work-19', // женщина со светящимся шаром
    tags: { ru: ['Портреты'], en: ['Portraits'], uk: ['Портрети'] },
    featured: false,
    dateAdded: '2026-07-10',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-19.webp',
    full: 'images/full/work-19.webp'
  },
  {
    slug: 'work-14', // дерево-остров с цветами
    tags: { ru: ['Сюрреализм'], en: ['Surreal'], uk: ['Сюрреалізм'] },
    featured: false,
    dateAdded: '2026-07-09',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-14.webp',
    full: 'images/full/work-14.webp'
  },
  {
    slug: 'work-09', // дедушка в свитере, мода
    tags: { ru: ['Мода'], en: ['Fashion'], uk: ['Мода'] },
    featured: false,
    dateAdded: '2026-07-08',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-09.webp',
    full: 'images/full/work-09.webp'
  },
  {
    slug: 'work-05', // девочка со светящимся котом
    tags: { ru: ['Фэнтези', 'Сюрреализм'], en: ['Fantasy', 'Surreal'], uk: ['Фентезі', 'Сюрреалізм'] },
    featured: true,
    dateAdded: '2026-07-06',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-05.webp',
    full: 'images/full/work-05.webp'
  },
  {
    slug: 'work-28', // муми-тролли в тёмном стиле
    tags: { ru: ['Тёмное искусство'], en: ['Dark Art'], uk: ['Темне мистецтво'] },
    featured: false,
    dateAdded: '2026-07-11',
    w: 800,
    h: 1000,
    preview: 'images/preview/work-28.webp',
    full: 'images/full/work-28.webp'
  },
  {
    slug: 'work-20', // ч/б портрет с развевающимися волосами
    tags: { ru: ['Портреты'], en: ['Portraits'], uk: ['Портрети'] },
    featured: false,
    dateAdded: '2026-07-10',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-20.webp',
    full: 'images/full/work-20.webp'
  },
  {
    slug: 'work-15', // человек-рыба в костюме
    tags: { ru: ['Сюрреализм'], en: ['Surreal'], uk: ['Сюрреалізм'] },
    featured: false,
    dateAdded: '2026-07-09',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-15.webp',
    full: 'images/full/work-15.webp'
  },
  {
    slug: 'work-10', // авангардный головной убор, лошади на фоне
    tags: { ru: ['Мода'], en: ['Fashion'], uk: ['Мода'] },
    featured: false,
    dateAdded: '2026-07-08',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-10.webp',
    full: 'images/full/work-10.webp'
  },
  {
    slug: 'work-33', // девушка с птичьей головой
    tags: { ru: ['Фэнтези'], en: ['Fantasy'], uk: ['Фентезі'] },
    featured: false,
    dateAdded: '2026-07-12',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-33.webp',
    full: 'images/full/work-33.webp'
  },
  {
    slug: 'work-29', // Баба Яга в сюрреалистичном лесу
    tags: { ru: ['Тёмное искусство'], en: ['Dark Art'], uk: ['Темне мистецтво'] },
    featured: false,
    dateAdded: '2026-07-11',
    w: 800,
    h: 1000,
    preview: 'images/preview/work-29.webp',
    full: 'images/full/work-29.webp'
  },
  {
    slug: 'work-21', // портрет в зелёном дыму
    tags: { ru: ['Портреты'], en: ['Portraits'], uk: ['Портрети'] },
    featured: false,
    dateAdded: '2026-07-10',
    w: 800,
    h: 1000,
    preview: 'images/preview/work-21.webp',
    full: 'images/full/work-21.webp'
  },
  {
    slug: 'work-16', // пилот, распадающийся на осколки
    tags: { ru: ['Сюрреализм'], en: ['Surreal'], uk: ['Сюрреалізм'] },
    featured: false,
    dateAdded: '2026-07-09',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-16.webp',
    full: 'images/full/work-16.webp'
  },
  {
    slug: 'work-11', // чёрно-красный образ с погонами
    tags: { ru: ['Мода'], en: ['Fashion'], uk: ['Мода'] },
    featured: false,
    dateAdded: '2026-07-08',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-11.webp',
    full: 'images/full/work-11.webp'
  },
  {
    slug: 'work-34', // маленькое волшебное существо
    tags: { ru: ['Фэнтези'], en: ['Fantasy'], uk: ['Фентезі'] },
    featured: false,
    dateAdded: '2026-07-12',
    w: 800,
    h: 1000,
    preview: 'images/preview/work-34.webp',
    full: 'images/full/work-34.webp'
  },
  {
    slug: 'work-30', // фигура в капюшоне с посохом и вороном
    tags: { ru: ['Тёмное искусство'], en: ['Dark Art'], uk: ['Темне мистецтво'] },
    featured: false,
    dateAdded: '2026-07-11',
    w: 800,
    h: 1000,
    preview: 'images/preview/work-30.webp',
    full: 'images/full/work-30.webp'
  },
  {
    slug: 'work-22', // портрет с синими цветами и тенью решётки
    tags: { ru: ['Портреты'], en: ['Portraits'], uk: ['Портрети'] },
    featured: false,
    dateAdded: '2026-07-10',
    w: 800,
    h: 1000,
    preview: 'images/preview/work-22.webp',
    full: 'images/full/work-22.webp'
  },
  {
    slug: 'work-17', // игуана с шахматами
    tags: { ru: ['Сюрреализм'], en: ['Surreal'], uk: ['Сюрреалізм'] },
    featured: false,
    dateAdded: '2026-07-09',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-17.webp',
    full: 'images/full/work-17.webp'
  },
  {
    slug: 'work-31', // кричащие призрачные женщины
    tags: { ru: ['Тёмное искусство'], en: ['Dark Art'], uk: ['Темне мистецтво'] },
    featured: false,
    dateAdded: '2026-07-11',
    w: 800,
    h: 1000,
    preview: 'images/preview/work-31.webp',
    full: 'images/full/work-31.webp'
  },
  {
    slug: 'work-23', // синяя женщина с полумесяцем
    tags: { ru: ['Портреты'], en: ['Portraits'], uk: ['Портрети'] },
    featured: false,
    dateAdded: '2026-07-10',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-23.webp',
    full: 'images/full/work-23.webp'
  },
  {
    slug: 'work-35', // женщина с веткой на закате
    tags: { ru: ['Сюрреализм'], en: ['Surreal'], uk: ['Сюрреалізм'] },
    featured: true,
    dateAdded: '2026-07-13',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-35.webp',
    full: 'images/full/work-35.webp'
  },
  {
    slug: 'work-32', // портрет в стиле Пинхэда
    tags: { ru: ['Тёмное искусство'], en: ['Dark Art'], uk: ['Темне мистецтво'] },
    featured: false,
    dateAdded: '2026-07-11',
    w: 800,
    h: 1000,
    preview: 'images/preview/work-32.webp',
    full: 'images/full/work-32.webp'
  },
  {
    slug: 'work-24', // стилизованный портрет (Элвис)
    tags: { ru: ['Портреты'], en: ['Portraits'], uk: ['Портрети'] },
    featured: false,
    dateAdded: '2026-07-10',
    w: 800,
    h: 1000,
    preview: 'images/preview/work-24.webp',
    full: 'images/full/work-24.webp'
  },
  {
    slug: 'work-36', // фиолетовая зебра с ресницами
    tags: { ru: ['Сюрреализм'], en: ['Surreal'], uk: ['Сюрреалізм'] },
    featured: true,
    dateAdded: '2026-07-13',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-36.webp',
    full: 'images/full/work-36.webp'
  },
  {
    slug: 'work-37', // заяц-монстр в лунном лесу
    tags: { ru: ['Тёмное искусство'], en: ['Dark Art'], uk: ['Темне мистецтво'] },
    featured: false,
    dateAdded: '2026-07-14',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-37.webp',
    full: 'images/full/work-37.webp'
  },
  {
    slug: 'work-38', // лес с полной луной
    tags: { ru: ['Тёмное искусство'], en: ['Dark Art'], uk: ['Темне мистецтво'] },
    featured: false,
    dateAdded: '2026-07-14',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-38.webp',
    full: 'images/full/work-38.webp'
  },
  {
    slug: 'work-39', // три ведьмы с шаром (бывший hero Dark Art)
    tags: { ru: ['Тёмное искусство'], en: ['Dark Art'], uk: ['Темне мистецтво'] },
    featured: false,
    dateAdded: '2026-07-14',
    w: 800,
    h: 1000,
    preview: 'images/preview/work-39.webp',
    full: 'images/full/work-39.webp'
  },
  {
    slug: 'work-40', // девушка с волшебными волосами
    tags: { ru: ['Мультфильм / Анимация'], en: ['Cartoon / Animation'], uk: ['Мультфільм / Анімація'] },
    featured: false,
    dateAdded: '2026-07-15',
    w: 800,
    h: 1151,
    preview: 'images/preview/work-40.webp',
    full: 'images/full/work-40.webp'
  },
  {
    slug: 'work-41', // маленькое голубое волшебное существо
    tags: { ru: ['Мультфильм / Анимация'], en: ['Cartoon / Animation'], uk: ['Мультфільм / Анімація'] },
    featured: false,
    dateAdded: '2026-07-15',
    w: 800,
    h: 1000,
    preview: 'images/preview/work-41.webp',
    full: 'images/full/work-41.webp'
  },
  {
    slug: 'work-06', // розовая птица
    tags: { ru: ['Мультипликация'], en: ['Cartoon / Animation'], uk: ['Мультиплікація'] },
    featured: true,
    dateAdded: '2026-07-06',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-06.webp',
    full: 'images/full/work-06.webp'
  },
  {
    slug: 'work-43', // чёрный котёнок на улице
    tags: { ru: ['Мультфильм / Анимация'], en: ['Cartoon / Animation'], uk: ['Мультфільм / Анімація'] },
    featured: false,
    dateAdded: '2026-07-15',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-43.webp',
    full: 'images/full/work-43.webp'
  },
  {
    slug: 'work-44', // полосатый кот, обвязанный верёвкой, сосиски
    tags: { ru: ['Мультфильм / Анимация'], en: ['Cartoon / Animation'], uk: ['Мультфільм / Анімація'] },
    featured: false,
    dateAdded: '2026-07-15',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-44.webp',
    full: 'images/full/work-44.webp'
  },
  {
    slug: 'work-45', // енот с равиоли на кухне
    tags: { ru: ['Мультфильм / Анимация'], en: ['Cartoon / Animation'], uk: ['Мультфільм / Анімація'] },
    featured: false,
    dateAdded: '2026-07-15',
    w: 800,
    h: 1069,
    preview: 'images/preview/work-45.webp',
    full: 'images/full/work-45.webp'
  },
  {
    slug: 'work-46', // девушка убегает в тёмном лесу
    tags: { ru: ['Мультфильм / Анимация'], en: ['Cartoon / Animation'], uk: ['Мультфільм / Анімація'] },
    featured: false,
    dateAdded: '2026-07-15',
    w: 800,
    h: 1069,
    preview: 'images/preview/work-46.webp',
    full: 'images/full/work-46.webp'
  },
  {
    slug: 'work-47', // добрый мультяшный дракон
    tags: { ru: ['Мультфильм / Анимация'], en: ['Cartoon / Animation'], uk: ['Мультфільм / Анімація'] },
    featured: false,
    dateAdded: '2026-07-15',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-47.webp',
    full: 'images/full/work-47.webp'
  },
  {
    slug: 'work-48', // одноглазый персонаж в шапке
    tags: { ru: ['Мультфильм / Анимация'], en: ['Cartoon / Animation'], uk: ['Мультфільм / Анімація'] },
    featured: false,
    dateAdded: '2026-07-15',
    w: 800,
    h: 1000,
    preview: 'images/preview/work-48.webp',
    full: 'images/full/work-48.webp'
  },
  {
    slug: 'work-49', // два кота под водой
    tags: { ru: ['Мультфильм / Анимация'], en: ['Cartoon / Animation'], uk: ['Мультфільм / Анімація'] },
    featured: false,
    dateAdded: '2026-07-15',
    w: 800,
    h: 1000,
    preview: 'images/preview/work-49.webp',
    full: 'images/full/work-49.webp'
  },
  {
    slug: 'work-50', // кот-самурай с мечом
    tags: { ru: ['Мультфильм / Анимация'], en: ['Cartoon / Animation'], uk: ['Мультфільм / Анімація'] },
    featured: false,
    dateAdded: '2026-07-15',
    w: 800,
    h: 1000,
    preview: 'images/preview/work-50.webp',
    full: 'images/full/work-50.webp'
  },
  {
    slug: 'work-51', // биомеханическая растительная цивилизация
    tags: { ru: ['Мультфильм / Анимация'], en: ['Cartoon / Animation'], uk: ['Мультфільм / Анімація'] },
    featured: false,
    dateAdded: '2026-07-15',
    w: 800,
    h: 1069,
    preview: 'images/preview/work-51.webp',
    full: 'images/full/work-51.webp'
  },
  {
    slug: 'work-52', // девушка со снежными волосами, storm mage
    tags: { ru: ['Мультфильм / Анимация'], en: ['Cartoon / Animation'], uk: ['Мультфільм / Анімація'] },
    featured: false,
    dateAdded: '2026-07-15',
    w: 800,
    h: 1000,
    preview: 'images/preview/work-52.webp',
    full: 'images/full/work-52.webp'
  },
  {
    slug: 'work-53', // олень в лунном лесу
    tags: { ru: ['Мультфильм / Анимация'], en: ['Cartoon / Animation'], uk: ['Мультфільм / Анімація'] },
    featured: false,
    dateAdded: '2026-07-15',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-53.webp',
    full: 'images/full/work-53.webp'
  },
  {
    slug: 'work-54', // пушистый щенок в траве
    tags: { ru: ['Мультфильм / Анимация'], en: ['Cartoon / Animation'], uk: ['Мультфільм / Анімація'] },
    featured: false,
    dateAdded: '2026-07-15',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-54.webp',
    full: 'images/full/work-54.webp'
  },
  {
    slug: 'work-55', // пингвин-модель в короне
    tags: { ru: ['Мультфильм / Анимация'], en: ['Cartoon / Animation'], uk: ['Мультфільм / Анімація'] },
    featured: false,
    dateAdded: '2026-07-15',
    w: 800,
    h: 1000,
    preview: 'images/preview/work-55.webp',
    full: 'images/full/work-55.webp'
  },
  {
    slug: 'work-56', // испуганный кролик в тюльпанах
    tags: { ru: ['Мультфильм / Анимация'], en: ['Cartoon / Animation'], uk: ['Мультфільм / Анімація'] },
    featured: false,
    dateAdded: '2026-07-15',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-56.webp',
    full: 'images/full/work-56.webp'
  },
  {
    slug: 'work-57', // портрет таинственной ведьмы крупным планом
    tags: { ru: ['Мультфильм / Анимация'], en: ['Cartoon / Animation'], uk: ['Мультфільм / Анімація'] },
    featured: false,
    dateAdded: '2026-07-15',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-57.webp',
    full: 'images/full/work-57.webp'
  },
  {
    slug: 'work-58', // чёрный дог в стиле Pixar
    tags: { ru: ['Мультфильм / Анимация'], en: ['Cartoon / Animation'], uk: ['Мультфільм / Анімація'] },
    featured: false,
    dateAdded: '2026-07-15',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-58.webp',
    full: 'images/full/work-58.webp'
  },
  {
    slug: 'work-59', // гламурная грабительница банка с котом
    tags: { ru: ['Мультфильм / Анимация'], en: ['Cartoon / Animation'], uk: ['Мультфільм / Анімація'] },
    featured: false,
    dateAdded: '2026-07-15',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-59.webp',
    full: 'images/full/work-59.webp'
  },
  {
    slug: 'work-60', // первая работа автора — металлический футуристичный образ в стиле fashion
    tags: { ru: ['Мода', 'Сюрреализм'], en: ['Fashion', 'Surreal'], uk: ['Мода', 'Сюрреалізм'] },
    featured: false,
    dateAdded: '2026-07-16',
    w: 800,
    h: 1062,
    preview: 'images/preview/work-60.webp',
    full: 'images/full/work-60.webp'
  }
  // Добавляйте новые работы сюда по этому же образцу.
];
