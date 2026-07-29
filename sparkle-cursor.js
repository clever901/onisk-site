// Onisk — мерцающие звёздочки за курсором мыши (перекликаются с уже
// существующим декоративным разделителем ✦ на сайте).
// Только для десктопа с мышью (не для тач-экранов) и только если у человека
// не включено "уменьшить анимацию" в системе (prefers-reduced-motion).

(function () {
  const isDesktopMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!isDesktopMouse || prefersReducedMotion) return;

  // Те же цвета, что уже используются в остальном сайте (style.css :root) —
  // никаких новых/ярких неоновых оттенков.
  const COLORS = ['#bc6eaa', '#ccaf98', '#b8b4bd'];
  const SPAWN_INTERVAL_MS = 90; // звёздочки реже, чем частицы пыли — тише и спокойнее

  let lastSpawn = 0;

  document.addEventListener('mousemove', (e) => {
    const now = performance.now();
    if (now - lastSpawn < SPAWN_INTERVAL_MS) return;
    lastSpawn = now;

    const star = document.createElement('span');
    star.className = 'cursor-sparkle';
    star.textContent = '✦';
    star.style.left = e.clientX + (Math.random() * 12 - 6) + 'px';
    star.style.top = e.clientY + (Math.random() * 12 - 6) + 'px';
    star.style.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const size = 10 + Math.random() * 8;
    star.style.fontSize = size + 'px';

    document.body.appendChild(star);
    star.addEventListener('animationend', () => star.remove());
  });
})();
