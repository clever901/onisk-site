document.addEventListener('DOMContentLoaded', () => {

  const CATEGORY_ORDER = ['Dark Art', 'Portraits', 'Fantasy', 'Surreal', 'Fashion', 'Cartoon / Animation'];
  let currentLang = 'en';

  // ---------- helpers ----------

  function getEnTags(work) {
    return work.tags.en;
  }

  function collectCategories() {
    const set = new Set();
    (typeof WORKS !== 'undefined' ? WORKS : []).forEach(w => getEnTags(w).forEach(t => set.add(t)));
    return CATEGORY_ORDER.filter(c => set.has(c));
  }

  function translateTag(tagEn) {
    return (I18N[currentLang] && I18N[currentLang]['tags.' + tagEn]) || tagEn;
  }

  function t(key) {
    return (I18N[currentLang] && I18N[currentLang][key]) || key;
  }

  // ---------- render filter (desktop tabs + mobile select) ----------
  // Клик по любой категории здесь ведёт на страницу gallery.html с этим
  // фильтром — это обычные ссылки, а не переключатели на месте. Превью на
  // главной всегда показывает одну и ту же подборку featured-работ.

  function renderFilters() {
    const categories = collectCategories();
    const desktopEl = document.getElementById('tag-filter');
    const mobileEl = document.getElementById('tag-filter-mobile');
    if (!desktopEl || !mobileEl) return;

    const allLabel = t('gallery.all');
    desktopEl.innerHTML = '';
    mobileEl.innerHTML = '';

    const allLink = document.createElement('a');
    allLink.textContent = allLabel;
    allLink.href = 'gallery.html';
    allLink.className = 'active';
    desktopEl.appendChild(allLink);

    const allOpt = document.createElement('option');
    allOpt.value = 'gallery.html';
    allOpt.textContent = allLabel;
    mobileEl.appendChild(allOpt);

    categories.forEach(cat => {
      const label = translateTag(cat);
      const link = document.createElement('a');
      link.textContent = label;
      link.href = `gallery.html?tag=${encodeURIComponent(cat)}`;
      desktopEl.appendChild(link);

      const opt = document.createElement('option');
      opt.value = `gallery.html?tag=${encodeURIComponent(cat)}`;
      opt.textContent = label;
      mobileEl.appendChild(opt);
    });

    mobileEl.value = 'gallery.html';
    mobileEl.onchange = () => { window.location.href = mobileEl.value; };
  }

  // ---------- render grid ----------
  // На главной превью всегда показывает featured-работы без фильтра —
  // фильтрация по категориям происходит только на странице полной галереи.

  function renderGrid() {
    const grid = document.getElementById('preview-grid');
    if (!grid) return;
    const works = (typeof WORKS !== 'undefined' ? WORKS : []).filter(w => w.featured);
    currentGridWorks = works;

    grid.innerHTML = '';
    works.forEach((work, index) => {
      const card = document.createElement('div');
      card.className = 'work-card';
      const img = document.createElement('img');
      img.src = work.preview;
      img.alt = '';
      img.loading = 'lazy';
      card.appendChild(img);
      card.addEventListener('click', () => openLightbox(work, index));
      grid.appendChild(card);
    });
  }

  // ---------- lightbox ----------

  let currentGridWorks = [];
  let currentLightboxIndex = -1;

  function openLightbox(work, index) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const tags = document.getElementById('lightbox-tags');
    if (!lightbox || !img || !tags) return;
    currentLightboxIndex = typeof index === 'number' ? index : currentGridWorks.indexOf(work);
    img.src = work.full;
    tags.textContent = (work.tags[currentLang] || work.tags.en).join(' · ');
    lightbox.hidden = false;
  }

  function showLightboxAt(index) {
    if (!currentGridWorks.length) return;
    const total = currentGridWorks.length;
    const wrapped = ((index % total) + total) % total;
    openLightbox(currentGridWorks[wrapped], wrapped);
  }

  function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.hidden = true;
  }

  const closeBtn = document.getElementById('lightbox-close');
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  if (prevBtn) prevBtn.addEventListener('click', () => showLightboxAt(currentLightboxIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => showLightboxAt(currentLightboxIndex + 1));

  const lightboxEl = document.getElementById('lightbox');
  if (lightboxEl) {
    lightboxEl.addEventListener('click', (e) => {
      if (e.target === lightboxEl) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
    const lightbox = document.getElementById('lightbox');
    if (lightbox && !lightbox.hidden) {
      if (e.key === 'ArrowLeft') showLightboxAt(currentLightboxIndex - 1);
      if (e.key === 'ArrowRight') showLightboxAt(currentLightboxIndex + 1);
    }
  });

  // ---------- i18n ----------

  function applyLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translated = t(key);
      if (translated) el.textContent = translated;
    });
    document.querySelectorAll('.lang-switch button, .mobile-lang button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    renderFilters();
    renderGrid();
  }

  document.querySelectorAll('.lang-switch button, .mobile-lang button').forEach(btn => {
    btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
  });

  // ---------- mobile burger ----------
  // Делегирование на document — надёжнее, чем прямой listener на кнопке:
  // сработает даже если сама кнопка перерисовывается или перекрывается.
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('#burger-btn');
    if (btn) {
      document.body.classList.toggle('menu-open');
    }
  });

  // ---------- init ----------

  renderFilters();
  renderGrid();

  // ---------- touch highlight for work cards (mobile) ----------
  // CSS @media(hover:none) не всегда срабатывает в эмуляторах устройств,
  // поэтому подсвечиваем карточку по тапу напрямую через touch-события.
  document.addEventListener('touchstart', (e) => {
    const card = e.target.closest('.work-card');
    if (card) card.classList.add('touch-active');
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    const card = e.target.closest('.work-card');
    if (card) setTimeout(() => card.classList.remove('touch-active'), 250);
  }, { passive: true });

  document.addEventListener('touchcancel', (e) => {
    const card = e.target.closest('.work-card');
    if (card) card.classList.remove('touch-active');
  }, { passive: true });
});
