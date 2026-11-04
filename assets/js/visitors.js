// Shared footer counter. Only the public site sends requests to Busuanzi.
(() => {
  const footer = document.querySelector(".site-footer .page-shell");
  if (!footer) return;

  const counter = document.createElement("div");
  counter.className = "visitor-stats";
  counter.innerHTML = `
    <div class="visitor-stats-counts" aria-live="polite" aria-atomic="true">
      <span class="visitor-stat">
        <span class="lang-zh">累计访客</span><span class="lang-en">Visitors</span>
        <strong id="busuanzi_value_site_uv">—</strong>
      </span>
      <span class="visitor-stat">
        <span class="lang-zh">总浏览量</span><span class="lang-en">Page views</span>
        <strong id="busuanzi_value_site_pv">—</strong>
      </span>
    </div>
    <div class="visitor-stats-note">
      <span class="lang-zh">自统计启用日起累计 · 访客按统计服务规则去重</span>
      <span class="lang-en">Since tracking began · visitors deduplicated by the provider</span>
      <a href="https://busuanzi.ibruce.info/" target="_blank" rel="noopener noreferrer">
        <span class="lang-zh">不蒜子统计</span><span class="lang-en">Busuanzi</span>
      </a>
      <span data-visitor-status role="status"></span>
    </div>`;
  footer.append(counter);

  const status = counter.querySelector("[data-visitor-status]");
  const showStatus = (zh, en) => {
    status.replaceChildren();
    for (const [language, label] of [["zh", zh], ["en", en]]) {
      const text = document.createElement("span");
      text.className = `lang-${language}`;
      text.textContent = label;
      status.append(text);
    }
  };

  // Preview traffic must never be added to the production site's totals.
  if (location.protocol !== "https:" || location.hostname !== "zhenyanglinthu.github.io") {
    showStatus("本地预览不计数", "Preview traffic is not counted");
    return;
  }

  showStatus("加载中…", "Loading…");
  const values = counter.querySelectorAll(".visitor-stat strong");
  const observer = new MutationObserver(() => {
    if ([...values].every((value) => /^\d+$/.test(value.textContent.trim()))) {
      clearTimeout(timeout);
      observer.disconnect();
      status.replaceChildren();
    }
  });
  observer.observe(counter.querySelector(".visitor-stats-counts"), {
    childList: true, subtree: true, characterData: true,
  });

  const unavailable = () => showStatus("统计暂不可用", "Statistics temporarily unavailable");
  const timeout = setTimeout(unavailable, 10000);
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js";
  script.onerror = () => {
    clearTimeout(timeout);
    observer.disconnect();
    unavailable();
  };
  document.head.append(script);
})();
