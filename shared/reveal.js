/*
 * スクロール連動の表示アニメーション（デモLP共通）
 *
 * 使い方: 各LPの </body> 直前に、対象要素のセレクタを添えて読み込む。
 *   <script src="../shared/reveal.js" data-reveal-targets=".sec-head, .card, .voice" defer></script>
 *
 * 設計メモ
 * - クラス付与はJS側で行う。JSが動かない環境では要素が最初から見えたままになり、内容が消えない。
 * - クラス名は lp-rv / lp-rv-in。各LPが独自に持つ .reveal（feliche・suhada・siena）や
 *   .rv（kokage-seitai）と衝突させないため、共通版だけの接頭辞を付けている。
 * - prefers-reduced-motion では何もしない（クラスを付けないので静止したまま表示される）。
 * - 時限フェイルセーフ（2026-08-15 追加）: 読み込み5秒後に未表示要素を全て表示する。
 *   スクロールせずに全画面を撮るキャプチャツール（DevTools・Playwright fullPage等）では
 *   IntersectionObserverが発火せず画面外が空白のまま写るため。画面外での表示なので閲覧者には見えず、
 *   スクロール演出は最初の5秒間だけ担保されれば体験上十分。
 * - 印刷・PDF保存では全要素を強制表示する（@media print）。
 */
(() => {
  const tag = document.querySelector('script[data-reveal-targets]');
  const selector = tag && tag.getAttribute('data-reveal-targets');
  if (!selector) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  let targets;
  try {
    targets = Array.from(document.querySelectorAll(selector));
  } catch (e) {
    return; // セレクタが不正なら何もしない（内容は見えたまま）
  }
  if (!targets.length) return;

  const style = document.createElement('style');
  style.textContent =
    '.lp-rv{opacity:0;transform:translateY(20px);' +
    'transition:opacity 640ms cubic-bezier(.22,.61,.36,1),transform 640ms cubic-bezier(.22,.61,.36,1);' +
    'will-change:opacity,transform}' +
    '.lp-rv-in{opacity:1;transform:none}' +
    '@media print{.lp-rv{opacity:1 !important;transform:none !important}}';
  document.head.appendChild(style);

  targets.forEach(el => {
    el.classList.add('lp-rv');
    // 同じ親に並ぶ要素は少しずつ遅らせて、順に現れるようにする
    const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
    const index = siblings.indexOf(el);
    if (index > 0) el.style.transitionDelay = Math.min(index, 4) * 80 + 'ms';
  });

  const show = el => {
    el.classList.add('lp-rv-in');
    io.unobserve(el);
  };

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) show(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  targets.forEach(el => io.observe(el));

  /* アンカーで一気に飛ぶと、画面外から画面外へ移った要素は交差状態が変化せず
     オブザーバのコールバックが呼ばれない。取り残された要素をスクロール時に回収する。 */
  let ticking = false;
  const sweep = () => {
    ticking = false;
    let remaining = 0;
    targets.forEach(el => {
      if (el.classList.contains('lp-rv-in')) return;
      if (el.getBoundingClientRect().top < window.innerHeight * 0.94) show(el);
      else remaining += 1;
    });
    if (!remaining) window.removeEventListener('scroll', onScroll);
  };
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(sweep);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('hashchange', sweep);

  /* 時限フェイルセーフ: 5秒経っても表示されていない要素を全て表示する（設計メモ参照） */
  setTimeout(() => {
    targets.forEach(el => {
      if (!el.classList.contains('lp-rv-in')) show(el);
    });
    window.removeEventListener('scroll', onScroll);
  }, 5000);
})();
