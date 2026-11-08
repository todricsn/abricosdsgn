(() => {
  const homeHeader = document.querySelector(".site-header:not(.portfolio-site-header)");

  if (homeHeader) {
    const updateHeader = () => {
      homeHeader.classList.toggle("site-header--scrolled", window.scrollY > 28);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  document.querySelectorAll(".menu-toggle").forEach((button) => {
    const navigationId = button.getAttribute("aria-controls");
    const navigation = navigationId ? document.getElementById(navigationId) : null;

    if (!navigation) return;

    const setMenuState = (isOpen) => {
      button.setAttribute("aria-expanded", String(isOpen));
      button.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
      navigation.classList.toggle("site-nav--open", isOpen);
    };

    button.addEventListener("click", () => {
      setMenuState(button.getAttribute("aria-expanded") !== "true");
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuState(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setMenuState(false);
    });
  });

  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const animateImages = (targets) => {
    if (motionPreference.matches || !window.anime) return;
    window.anime.animate(targets, {
      translateY: [12, 0],
      duration: 400,
      ease: "outExpo",
    });
  };
  if ("IntersectionObserver" in window) {
    const images = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateImages(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15 });
    document.querySelectorAll(".hero__visual, .direction-card img, .archive__project img")
      .forEach((element) => images.observe(element));
  }
  motionPreference.addEventListener("change", () => {
    if (motionPreference.matches && window.anime) {
      const targets = document.querySelectorAll(".hero__visual, .direction-card img, .archive__project img, .portfolio-card");
      window.anime.utils.remove(targets);
      targets.forEach((element) => element.style.removeProperty("transform"));
    }
  });

  const faqItems = [...document.querySelectorAll(".faq-item")];

  faqItems.forEach((item) => {
    const button = item.querySelector("button");
    const answer = item.querySelector(".faq-item__answer");

    if (!button || !answer) return;

    button.addEventListener("click", () => {
      const wasOpen = item.classList.contains("faq-item--open");

      faqItems.forEach((faqItem) => {
        faqItem.classList.remove("faq-item--open");
        faqItem.querySelector("button")?.setAttribute("aria-expanded", "false");
        faqItem.querySelector(".faq-item__answer")?.setAttribute("aria-hidden", "true");
      });

      if (!wasOpen) {
        item.classList.add("faq-item--open");
        button.setAttribute("aria-expanded", "true");
        answer.setAttribute("aria-hidden", "false");
      }
    });
  });

  const briefForm = document.querySelector(".brief-form");

  briefForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!briefForm.reportValidity()) return;

    const form = new FormData(briefForm);
    const objectType = form.get("object") || "обсуждение";
    const subject = `Новый проект — ${objectType}`;
    const body = [
      `Имя: ${form.get("name") || "—"}`,
      `Контакт: ${form.get("contact") || "—"}`,
      `Тип объекта: ${form.get("object") || "—"}`,
      `Площадь: ${form.get("area") || "—"}`,
      "",
      "О задаче:",
      `${form.get("message") || "—"}`,
    ].join("\n");

    window.location.href =
      `mailto:abricos-design@mail.ru?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
  });

  const filterButtons = [...document.querySelectorAll("[data-filter]")];
  const projectCards = [...document.querySelectorAll("[data-portfolio-card]")];

  const filterProjects = (filter) => {
    let visibleIndex = 0;

    projectCards.forEach((card) => {
      const isVisible = filter === "Все" || card.dataset.category === filter;
      card.hidden = !isVisible;

      if (isVisible) {
        visibleIndex += 1;
        const number = card.querySelector("[data-project-number]");
        if (number) number.textContent = String(visibleIndex).padStart(2, "0");
      }
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((filterButton) => {
        const isActive = filterButton === button;
        filterButton.classList.toggle("is-active", isActive);
        filterButton.setAttribute("aria-pressed", String(isActive));
      });

      filterProjects(button.dataset.filter || "Все");
      animateImages(projectCards.filter((card) => !card.hidden));
    });
  });

  document.querySelectorAll("[data-year]").forEach((year) => {
    year.textContent = String(new Date().getFullYear());
  });
})();
