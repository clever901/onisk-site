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
    // src уже выставлен раньше, синхронным inline-скриптом в gallery.html —
    // здесь его больше не трогаем, чтобы не запускать повторную загрузку.

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

  // ----------
