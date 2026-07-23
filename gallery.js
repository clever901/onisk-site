document.addEventListener('DOMContentLoaded', () => {

  const CATEGORY_ORDER = ['Dark Art', 'Portraits', 'Fantasy', 'Surreal', 'Fashion', 'Cartoon / Animation'];
  const PER_PAGE = 8;

  let currentLang = 'en';
  let currentTag = getTagFromUrl();
  let currentPage = 1;
  let searchQuery = '';

  function getTagFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const tag = params.get('tag');
    return tag && CATEGORY_ORDER.includes(tag) ? tag : 'All';
  }

  function setTagInUrl(tag) {
    const url = new URL(window.location.href);
    if (tag === 'All') {
      url.searchParams.delete('tag');
    } else {
      url.searchParams.set('tag', tag);
    }
    window.history.replaceState({}, '', url);
  }

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

  // ---------- hero per category ----------

  function applyHero() {
    const heroData = (typeof HERO_CATEGORIES !== 'undefined' && HERO_CATEGORIES[currentTag]) || HERO_CATEGORIES['All'];
    const left = document.getElementById('hero-img-left');
    const right = document.getElementById('hero-img-right');
    if (left && heroData) left.src = heroData.left;
    if (right && heroData) right.src = heroData.right;

    const moon = document.querySelector('.hero-moon');
    if (moon) moon.style.display = (heroData && heroData.noMoon) ? 'none' : '';

    if (left) left.classList.toggle('hero-muted', !!(heroData && heroData.muted));
    if (right) right.classList.toggle('hero-muted', !!(heroData && heroData.muted));
    if (left) left.classList.toggle('hero-muted-strong', !!(heroData && heroData.mutedStrong));
    if (right) right.classList.toggle('hero-muted-strong', !!(heroData && heroData.mutedStrong));
    if (right) right.classList.toggle('hero-cat-tint', !!(heroData && heroData.catTint));
    if (right) right.classList.toggle('hero-scale-down', !!(heroData && heroData.rightScaleDown));
    if (left) left.classList.toggle('hero-hare-fit', !!(heroData && heroData.hareScaleDown));
    if (left) left.classList.toggle('hero-portraits-left-fit', !!(heroData && heroData.portraitsFit));
    if (right) right.classList.toggle('hero-portraits-right-fit', !!(heroData && heroData.portraitsFit));
    
    const decorLeft = document.getElementById('hero-decor-left');
    const decorRight = document.getElementById('hero-decor-right');
    if (decorLeft) {
      if (heroData && heroData.decorLeft) {
        decorLeft.src = heroData.decorLeft;
        decorLeft.hidden = false;
      } else {
        decorLeft.hidden = true;
      }
    }
    if (decorRight) {
      if (heroData && heroData.decorRight) {
        decorRight.src = heroData.decorRight;
        decorRight.hidden = false;
      } else {
        decorRight.hidden = true;
      }
    }

    const heroEl = document.getElementById('gallery-hero');
    if (heroEl) {
      heroEl.classList.toggle('hero-flat-bg', !!(heroData && heroData.flatBg));
      heroEl.classList.toggle('hero-dense-stars', !!(heroData && heroData.denseStars));
      heroEl.classList.toggle('hero-cold-graphite-wash', !!(heroData && heroData.coldGraphite));
    }

    document.body.classList.toggle('body-dark-art', !!(heroData && heroData.coldGraphite));
    document.body.classList.toggle('body-fantasy', !!(heroData && heroData.mutedForest));
    document.body.classList.toggle('body-surreal', !!(heroData && heroData.petrolTeal));
    document.body.classList.toggle('body-cartoon', !!(heroData && heroData.dreamyViolet));
    document.body.classList.toggle('body-fashion', !!(heroData && heroData.plumGraphite));
    document.body.classList.toggle('body-portraits', !!(heroData && heroData.portraitsFit));
    document.body.classList.toggle('body-gallery-all', !!(heroData && heroData.catTint));
    if (left) left.classList.toggle('hero-plum-tint', !!(heroData && heroData.plumGraphite));
    if (right) right.classList.toggle('hero-botanical-tint', !!(heroData && heroData.plumGraphite));
    

    const pageDecorLeft = document.getElementById('page-decor-left');
    if (pageDecorLeft) {
      if (heroData && heroData.pageDecorLeft) {
        pageDecorLeft.src = heroData.pageDecorLeft;
        pageDecorLeft.hidden = false;
      } else {
        pageDecorLeft.hidden = true;
      }
    }

    const label = document.getElementById('gallery-category-label');
    if (label) {
      label.textContent = currentTag === 'All' ? '' : translateTag(currentTag);
      label.style.display = currentTag === 'All' ? 'none' : 'block';
    }

    const backLink = document.getElementById('back-link');
    if (backLink) {
      if (currentTag === 'All') {
        backLink.href = 'index.html';
        backLink.querySelector('span').setAttribute('data-i18n', 'gallery.backHome');
      } else {
        backLink.href = 'gallery.html';
        backLink.querySelector('span').setAttribute('data-i18n', 'gallery.backGallery');
      }
      backLink.querySelector('span').textContent = t(backLink.querySelector('span').getAttribute('data-i18n'));
    }
  }

  // ---------- filters ----------

  function renderFilters() {
    const categories = collectCategories();
    const desktopEl = document.getElementById('tag-filter');
    const mobileEl = document.getElementById('tag-filter-mobile');
    if (!desktopEl || !mobileEl) return;

    const allLabel = t('gallery.all');
    desktopEl.innerHTML = '';
    mobileEl.innerHTML = '';

    const allBtn = document.createElement('button');
    allBtn.textContent = allLabel;
    allBtn.className = currentTag === 'All' ? 'active' : '';
    allBtn.addEventListener('click', () => selectTag('All'));
    desktopEl.appendChild(allBtn);

    const allOpt = document.createElement('option');
    allOpt.value = 'All';
    allOpt.textContent = allLabel;
    mobileEl.appendChild(allOpt);

    categories.forEach(cat => {
      const label = translateTag(cat);
      const btn = document.createElement('button');
      btn.textContent = label;
      btn.className = currentTag === cat ? 'active' : '';
      btn.addEventListener('click', () => selectTag(cat));
      desktopEl.appendChild(btn);

      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = label;
      mobileEl.appendChild(opt);
    });

    mobileEl.value = currentTag;
    mobileEl.onchange = () => selectTag(mobileEl.value);
  }

  function selectTag(tag) {
    currentTag = tag;
    currentPage = 1;
    setTagInUrl(tag);
    renderFilters();
    applyHero();
    renderGrid();
  }

  // ---------- filtering + search ----------

  function getFilteredWorks() {
    let works = (typeof WORKS !== 'undefined' ? WORKS : []).slice();
    if (currentTag !== 'All') {
      works = works.filter(w => getEnTags(w).includes(currentTag));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      works = works.filter(w => {
        const tagsAllLangs = [].concat(w.tags.ru, w.tags.en, w.tags.uk).join(' ').toLowerCase();
        return tagsAllLangs.includes(q);
      });
    }
    return works;
  }

  // ---------- grid + pagination ----------

  let currentPageItems = [];
  let currentLightboxIndex = -1;

  function renderGrid() {
    const grid = document.getElementById('full-grid');
    if (!grid) return;
    const all = getFilteredWorks();
    const totalPages = Math.max(1, Math.ceil(all.length / PER_PAGE));
    if (currentPage > totalPages) currentPage = totalPages;
    const start = (currentPage - 1) * PER_PAGE;
    const pageItems = all.slice(start, start + PER_PAGE);
    currentPageItems = pageItems;

    grid.innerHTML = '';
    if (pageItems.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'empty-state';
      empty.textContent = t('gallery.empty');
      grid.appendChild(empty);
    }
    pageItems.forEach((work, index) => {
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

    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    const el = document.getElementById('pagination');
    if (!el) return;
    el.innerHTML = '';
    if (totalPages <= 1) return;

    const makeBtn = (label, page, opts = {}) => {
      const btn = document.createElement('button');
      btn.textContent = label;
      if (opts.active) btn.classList.add('active');
      if (opts.disabled) btn.disabled = true;
      btn.addEventListener('click', () => { currentPage = page; renderGrid(); window.scrollTo({ top: document.querySelector('.full-gallery-section').offsetTop - 40, behavior: 'smooth' }); });
      return btn;
    };

    el.appendChild(makeBtn('‹', Math.max(1, currentPage - 1), { disabled: currentPage === 1 }));

    const pagesToShow = new Set([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);
    let prevShown = 0;
    for (let p = 1; p <= totalPages; p++) {
      if (!pagesToShow.has(p)) continue;
      if (p - prevShown > 1) {
        const dots = document.createElement('span');
        dots.className = 'pagination-dots';
        dots.textContent = '…';
        el.appendChild(dots);
      }
      el.appendChild(makeBtn(String(p), p, { active: p === currentPage }));
      prevShown = p;
    }

    el.appendChild(makeBtn('›', Math.min(totalPages, currentPage + 1), { disabled: currentPage === totalPages }));
  }

  // ---------- search ----------

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value;
      currentPage = 1;
      renderGrid();
    });
  }

  // ---------- lightbox ----------

  function openLightbox(work, index) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const tags = document.getElementById('lightbox-tags');
    if (!lightbox || !img || !tags) return;
    currentLightboxIndex = typeof index === 'number' ? index : currentPageItems.indexOf(work);
    img.src = work.full;
    tags.textContent = (work.tags[currentLang] || work.tags.en).join(' · ');
    lightbox.hidden = false;
  }

  function showLightboxAt(index) {
    if (!currentPageItems.length) return;
    const total = currentPageItems.length;
    const wrapped = ((index % total) + total) % total;
    openLightbox(currentPageItems[wrapped], wrapped);
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
    lightboxEl.addEventListener('click', (e) => { if (e.target === lightboxEl) closeLightbox(); });
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
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = t(key);
    });
    document.querySelectorAll('.lang-switch button, .mobile-lang button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    renderFilters();
    applyHero();
    renderGrid();
  }

  document.querySelectorAll('.lang-switch button, .mobile-lang button').forEach(btn => {
    btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
  });

  // ---------- mobile burger ----------

  const burgerBtn = document.getElementById('burger-btn');
  if (burgerBtn) {
    burgerBtn.addEventListener('click', () => document.body.classList.toggle('menu-open'));
  }

  // ---------- init ----------

  renderFilters();
  applyHero();
  renderGrid();
});
