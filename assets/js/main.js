document.documentElement.classList.remove("no-js");

const languageButton = document.querySelector("[data-language-toggle]");
const menuButton = document.querySelector("[data-menu-toggle]");
const siteNav = document.querySelector("[data-site-nav]");
const languageStorageKey = "linzhenyang-site-language-v2";

function setLanguage(language) {
  const nextLanguage = language === "en" ? "en" : "zh";
  document.documentElement.dataset.lang = nextLanguage;
  document.documentElement.lang = nextLanguage === "zh" ? "zh-CN" : "en";

  const title =
    nextLanguage === "zh"
      ? document.body.dataset.titleZh
      : document.body.dataset.titleEn;
  if (title) {
    document.title = title;
  }

  if (languageButton) {
    languageButton.textContent = nextLanguage === "zh" ? "EN" : "中文";
    languageButton.setAttribute(
      "aria-label",
      nextLanguage === "zh" ? "Switch to English" : "切换到中文",
    );
  }

  localStorage.setItem(languageStorageKey, nextLanguage);
  document.dispatchEvent(
    new CustomEvent("site-language-change", { detail: nextLanguage }),
  );
}

const storedLanguage = localStorage.getItem(languageStorageKey);
setLanguage(storedLanguage || "en");

if (languageButton) {
  languageButton.addEventListener("click", () => {
    setLanguage(document.documentElement.dataset.lang === "zh" ? "en" : "zh");
  });
}

function closeMenu() {
  if (!siteNav || !menuButton) return;
  siteNav.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

if (menuButton && siteNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const publicationList = document.querySelector("[data-publication-list]");
if (publicationList) {
  const publicationItems = Array.from(
    publicationList.querySelectorAll("[data-publication-item]"),
  );
  const searchInput = document.querySelector("[data-publication-search]");
  const filterButtons = Array.from(
    document.querySelectorAll("[data-publication-filter]"),
  );
  const resultCount = document.querySelector("[data-publication-count]");
  let activeFilter = "all";

  function updatePublicationList() {
    const query = (searchInput?.value || "").trim().toLocaleLowerCase();
    let visibleCount = 0;

    publicationItems.forEach((item) => {
      const categories = (item.dataset.category || "").split(" ");
      const matchesFilter =
        activeFilter === "all" || categories.includes(activeFilter);
      const matchesQuery =
        !query || item.textContent.toLocaleLowerCase().includes(query);
      const visible = matchesFilter && matchesQuery;
      item.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    if (resultCount) {
      const language = document.documentElement.dataset.lang;
      resultCount.textContent =
        language === "zh"
          ? `显示 ${visibleCount} 项成果`
          : `${visibleCount} publication${visibleCount === 1 ? "" : "s"} shown`;
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.publicationFilter || "all";
      filterButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });
      updatePublicationList();
    });
  });

  searchInput?.addEventListener("input", updatePublicationList);
  document.addEventListener("site-language-change", updatePublicationList);
  updatePublicationList();
}

document.querySelectorAll("[data-current-year]").forEach((item) => {
  item.textContent = String(new Date().getFullYear());
});
