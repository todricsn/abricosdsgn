"use client";

import { useState } from "react";
import { ArrowMark, Logo } from "../components/Brand";

type Project = {
  title: string;
  category: "Интерьеры" | "Торговые точки" | "Стенды" | "Брендинг";
  image: string;
  source: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    title: "Брендинг коммерческих пространств",
    category: "Брендинг",
    image: "/portfolio/studio-branding.jpg",
    source: "https://freelance.ru/portfolio/project/view/1643676",
    featured: true,
  },
  {
    title: "Дизайн коммерческих интерьеров",
    category: "Интерьеры",
    image: "/portfolio/studio-interiors.jpg",
    source: "https://freelance.ru/portfolio/project/view/1643675",
    featured: true,
  },
  {
    title: "Проектирование общественных пространств",
    category: "Интерьеры",
    image: "/portfolio/studio-architecture.jpg",
    source: "https://freelance.ru/portfolio/project/view/1643674",
    featured: true,
  },
  {
    title: "День рождения «Джунгли»",
    category: "Интерьеры",
    image: "/portfolio/jungle.png",
    source: "https://freelance.ru/portfolio/project/view/46095",
  },
  {
    title: "Стенд «ГАММА»",
    category: "Стенды",
    image: "/portfolio/gamma.png",
    source: "https://freelance.ru/portfolio/project/view/46096",
  },
  {
    title: "Nail bar",
    category: "Торговые точки",
    image: "/portfolio/nail-bar.png",
    source: "https://freelance.ru/portfolio/project/view/46097",
  },
  {
    title: "Стенд Cleaner",
    category: "Стенды",
    image: "/portfolio/cleaner.png",
    source: "https://freelance.ru/portfolio/project/view/46099",
  },
  {
    title: "Остров MIESTILO",
    category: "Торговые точки",
    image: "/portfolio/miestilo.png",
    source: "https://freelance.ru/portfolio/project/view/46102",
  },
  {
    title: "Кондитерский киоск",
    category: "Торговые точки",
    image: "/portfolio/pastry-kiosk.png",
    source: "https://freelance.ru/portfolio/project/view/46105",
  },
  {
    title: "Остров «Злата печка»",
    category: "Торговые точки",
    image: "/portfolio/zlata.png",
    source: "https://freelance.ru/portfolio/project/view/46106",
  },
  {
    title: "Киоск «Трдельник»",
    category: "Торговые точки",
    image: "/portfolio/trdelnik.png",
    source: "https://freelance.ru/portfolio/project/view/46109",
  },
  {
    title: "Стенд Ariel",
    category: "Стенды",
    image: "/portfolio/ariel.png",
    source: "https://freelance.ru/portfolio/project/view/46110",
  },
  {
    title: "Стенд NEW ELEMENT",
    category: "Стенды",
    image: "/portfolio/new-element.png",
    source: "https://freelance.ru/portfolio/project/view/46112",
  },
  {
    title: "Бар на Гоа",
    category: "Интерьеры",
    image: "/portfolio/goa-bar.png",
    source: "https://freelance.ru/portfolio/project/view/46114",
  },
];

const filters = ["Все", "Интерьеры", "Торговые точки", "Стенды", "Брендинг"] as const;

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("Все");
  const [menuOpen, setMenuOpen] = useState(false);

  const visibleProjects = projects.filter(
    (project) => activeFilter === "Все" || project.category === activeFilter,
  );

  return (
    <main className="portfolio-page">
      <header className="site-header site-header--scrolled portfolio-site-header">
        <a className="site-header__logo" href="/" aria-label="Abricos Design — на главную">
          <Logo />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="portfolio-navigation"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
        <nav
          id="portfolio-navigation"
          className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}
          aria-label="Основная навигация"
        >
          <a href="/#services">Услуги</a>
          <a href="/portfolio" aria-current="page">Портфолио</a>
          <a href="/#directions">Направления</a>
          <a href="/#process">Этапы</a>
          <a className="site-nav__contact" href="/#contact">
            Обсудить проект
            <ArrowMark />
          </a>
        </nav>
      </header>

      <section className="portfolio-hero">
        <p className="eyebrow">Работы Abricos Design</p>
        <h1>
          Портфолио
          <span>пространств и брендов</span>
        </h1>
        <div className="portfolio-hero__bottom">
          <p>
            Проекты коммерческих и общественных интерьеров, торговых точек,
            выставочных стендов и визуальной среды.
          </p>
          <a href="https://freelance.ru/Abricos_design" target="_blank" rel="noreferrer">
            Полный архив на Freelance.ru
            <ArrowMark />
          </a>
        </div>
      </section>

      <section className="portfolio-catalog">
        <div className="portfolio-filters" aria-label="Фильтр проектов">
          {filters.map((filter) => (
            <button
              type="button"
              key={filter}
              className={activeFilter === filter ? "is-active" : ""}
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {visibleProjects.map((project, index) => (
            <a
              className={`portfolio-card ${project.featured ? "portfolio-card--featured" : ""}`}
              href={project.source}
              target="_blank"
              rel="noreferrer"
              key={project.source}
            >
              <div className="portfolio-card__image">
                <img src={project.image} alt={project.title} />
                <span className="portfolio-card__open"><ArrowMark /></span>
              </div>
              <div className="portfolio-card__meta">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p>{project.category}</p>
                  <h2>{project.title}</h2>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="portfolio-cta">
        <p className="eyebrow">Новый проект</p>
        <h2>Обсудим пространство вашего бизнеса</h2>
        <a className="button button--primary" href="/#contact">
          Описать задачу
          <ArrowMark />
        </a>
      </section>

      <footer className="footer portfolio-footer">
        <a href="/" aria-label="Abricos Design — на главную"><Logo /></a>
        <p>Проектирование и дизайн общественных и коммерческих пространств.</p>
        <div className="footer__links">
          <a href="mailto:abricos-design@mail.ru">Email</a>
          <a href="tel:+79119133030">Телефон</a>
          <a href="https://vk.com/abricosdesign" target="_blank" rel="noreferrer">ВКонтакте</a>
        </div>
        <div className="footer__bottom">
          <span>Санкт-Петербург</span>
          <span>Работы: профиль Abricos Design на Freelance.ru</span>
          <span>© {new Date().getFullYear()} Abricos Design</span>
        </div>
      </footer>
    </main>
  );
}
