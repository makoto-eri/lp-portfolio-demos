(() => {
  const init = () => {
    if (!document.body || document.querySelector('[data-portfolio-demo-banner]')) return;

    const style = document.createElement('style');
    style.textContent = `
      .portfolio-demo-banner{position:relative!important;z-index:2147483647!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:12px!important;min-height:42px!important;padding:8px 48px 8px 14px!important;background:#171a1f!important;color:#fff!important;font:600 12px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif!important;letter-spacing:.02em!important;text-align:center!important;box-sizing:border-box!important}
      .portfolio-demo-banner strong{color:#f2c38e!important;font-weight:800!important}
      .portfolio-demo-banner a{color:#fff!important;text-decoration:underline!important;text-underline-offset:3px!important;font-weight:700!important}
      .portfolio-demo-toast{position:fixed!important;z-index:2147483647!important;left:50%!important;bottom:24px!important;transform:translate(-50%,16px)!important;max-width:calc(100vw - 32px)!important;padding:12px 18px!important;border-radius:8px!important;background:#171a1f!important;color:#fff!important;box-shadow:0 14px 40px rgba(0,0,0,.3)!important;font:600 12px/1.6 system-ui,-apple-system,"Segoe UI",sans-serif!important;opacity:0!important;pointer-events:none!important;transition:opacity .2s ease,transform .2s ease!important}
      .portfolio-demo-toast.is-visible{opacity:1!important;transform:translate(-50%,0)!important}
      @media(max-width:640px){.portfolio-demo-banner{display:block!important;padding:8px 12px!important;font-size:10px!important}.portfolio-demo-banner a{margin-left:6px!important}}
      @media(prefers-reduced-motion:reduce){.portfolio-demo-toast{transition:none!important}}
    `;
    document.head.appendChild(style);

    const banner = document.createElement('aside');
    banner.className = 'portfolio-demo-banner';
    banner.dataset.portfolioDemoBanner = '';
    banner.setAttribute('aria-label', '制作デモのお知らせ');

    const text = document.createElement('span');
    const label = document.createElement('strong');
    label.textContent = '自主制作デモ';
    text.append(label, ' — 掲載内容は架空です。予約・送信は行われません。');

    const back = document.createElement('a');
    back.href = '../';
    back.textContent = '作品一覧へ';
    banner.append(text, back);
    document.body.prepend(banner);

    const toast = document.createElement('div');
    toast.className = 'portfolio-demo-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = 'これは制作デモです。予約・送信は行われません。';
    document.body.appendChild(toast);

    let timer;
    const notify = () => {
      window.clearTimeout(timer);
      toast.classList.add('is-visible');
      timer = window.setTimeout(() => toast.classList.remove('is-visible'), 2600);
    };

    document.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      notify();
    }, true);

    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[href="#"], a[href=""]');
      if (!link) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      notify();
    }, true);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
