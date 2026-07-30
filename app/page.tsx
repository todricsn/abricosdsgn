"use client";

import { FormEvent, useEffect, useState } from "react";
import { ArrowMark, Logo } from "./components/Brand";

const services = [
  {
    number: "01",
    title: "Концепция и планировка",
    text: "Разбираем сценарии посетителей и команды, зонируем пространство, находим характер и визуальную идею.",
    tags: ["анализ", "зонирование", "коллажи"],
  },
  {
    number: "02",
    title: "Дизайн и 3D",
    text: "Собираем цельный интерьер: материалы, свет, мебель, цвет и детальные визуализации до начала работ.",
    tags: ["интерьер", "визуализация", "материалы"],
  },
  {
    number: "03",
    title: "Рабочий проект",
    text: "Готовим понятный комплект чертежей и спецификаций, с которым подрядчикам проще реализовать замысел точно.",
    tags: ["чертежи", "узлы", "спецификации"],
  },
  {
    number: "04",
    title: "Технологические решения",
    text: "Увязываем планировку с оборудованием и рабочими процессами коммерческого или общественного объекта.",
    tags: ["оборудование", "потоки", "технология"],
  },
  {
    number: "05",
    title: "Бренд в пространстве",
    text: "Соединяем интерьер с айдентикой: входная группа, навигация, графика и оформление точек контакта.",
    tags: ["навигация", "оформление", "айдентика"],
  },
  {
    number: "06",
    title: "Сопровождение",
    text: "Отвечаем на вопросы команды реализации, проверяем решения и помогаем корректно работать с заменами.",
    tags: ["авторский контроль", "подбор", "координация"],
  },
];

const directions = [
  {
    title: "Кафе и рестораны",
    text: "Атмосфера, удобная посадка и логика обслуживания.",
    image: "/images/hero-restaurant.jpg",
    className: "direction-card direction-card--wide",
  },
  {
    title: "Магазины и шоурумы",
    text: "Маршрут покупателя и ясная презентация продукта.",
    image: "/images/retail.jpg",
    className: "direction-card",
  },
  {
    title: "Офисы",
    text: "Среда для концентрации, встреч и командной работы.",
    image: "/images/office.jpg",
    className: "direction-card",
  },
  {
    title: "Сервисные пространства",
    text: "Комфорт клиента и удобная работа специалистов.",
    image: "/images/service.jpg",
    className: "direction-card direction-card--wide",
  },
];

const deliverables = [
  ["Планировочная логика", "Функциональные зоны, маршруты и расстановка оборудования."],
  ["Визуальная концепция", "Коллажи, палитра, материалы и ключевые образные решения."],
  ["3D-визуализации", "Понятное представление будущего интерьера до реализации."],
  ["Рабочие чертежи", "Размеры, развертки, планы, узлы и привязки для подрядчиков."],
  ["Спецификации", "Перечни материалов, мебели, света и оборудования."],
  ["Сопровождение", "Пояснения, согласование образцов и помощь с допустимыми заменами."],
];

const process = [
  ["Знакомство", "Обсуждаем объект, задачу, ограничения и подходящий состав проекта."],
  ["Анализ", "Изучаем планы, фотографии, технические условия и сценарии работы."],
  ["Концепция", "Согласуем планировку, визуальный язык и основные материалы."],
  ["Проект", "Разрабатываем визуализации, чертежи и спецификации."],
  ["Подготовка", "Передаём материалы команде реализации и поясняем решения."],
  ["Сопровождение", "Помогаем сохранить проектную логику в ходе работ."],
];

const faqs = [
  {
    question: "Что нужно, чтобы начать?",
    answer:
      "Достаточно кратко описать объект и задачу. Если есть план, фотографии помещения или подборка примеров — приложите их. Остальное уточним на первой встрече.",
  },
  {
    question: "Можно заказать отдельный этап?",
    answer:
      "Да. Состав работ подбирается под задачу: это может быть концепция, планировочное решение, визуализация, рабочая документация или сопровождение.",
  },
  {
    question: "Вы занимаетесь ремонтом?",
    answer:
      "Студия проектирует пространство и сопровождает реализацию. Формат взаимодействия с подрядчиками и объём участия в ремонтных работах обсуждаются отдельно.",
  },
  {
    question: "Что входит в дизайн-проект?",
    answer:
      "Состав зависит от объекта. Обычно это планировка, концепция, визуализации, рабочие чертежи и спецификации. Точный перечень фиксируется до начала работ.",
  },
  {
    question: "Как рассчитывается стоимость?",
    answer:
      "После уточнения площади, назначения объекта, состава документации и уровня сопровождения. Так расчёт отражает реальный объём задачи.",
  },
  {
    question: "Сколько времени занимает проект?",
    answer:
      "Срок зависит от масштаба, состава работ и скорости согласований. Предварительный график формируется после знакомства с исходными данными.",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => observer.observe(element));
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const submitBrief = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = `Новый проект — ${form.get("object") || "обсуждение"}`;
    const body = [
      `Имя: ${form.get("name") || "—"}`,
      `Контакт: ${form.get("contact") || "—"}`,
      `Тип объекта: ${form.get("object") || "—"}`,
      `Площадь: ${form.get("area") || "—"}`,
      "",
      "О задаче:",
      `${form.get("message") || "—"}`,
    ].join("\n");
    window.location.href = `mailto:abricos-design@mail.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main>
      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <a className="site-header__logo" href="#top" aria-label="Abricos Design — на главную">
          <Logo />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
        <nav id="main-navigation" className={`site-nav ${menuOpen ? "site-nav--open" : ""}`} aria-label="Основная навигация">
          <a href="#services" onClick={closeMenu}>Услуги</a>
          <a href="/portfolio" onClick={closeMenu}>Портфолио</a>
          <a href="#directions" onClick={closeMenu}>Направления</a>
          <a href="#process" onClick={closeMenu}>Этапы</a>
          <a href="#faq" onClick={closeMenu}>FAQ</a>
          <a className="site-nav__contact" href="#contact" onClick={closeMenu}>
            Обсудить проект
            <ArrowMark />
          </a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero__content">
          <p className="eyebrow hero__eyebrow">Проектирование общественных и коммерческих пространств</p>
          <h1>
            Пространства,
            <span>в которых удобно людям</span>
            и работает бизнес
          </h1>
          <p className="hero__lead">
            От планировки и визуальной концепции до рабочих чертежей и сопровождения реализации.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#contact">
              Обсудить проект
              <ArrowMark />
            </a>
            <a className="text-link" href="#directions">
              Смотреть направления
              <ArrowMark />
            </a>
          </div>
        </div>

        <div className="hero__visual" aria-label="Современный интерьер ресторана">
          <div className="hero__arch">
            <img src="/images/hero-restaurant.jpg" alt="Интерьер современного ресторана в тёплых природных оттенках" />
          </div>
          <div className="hero__note">
            <span>От идеи</span>
            <strong>до открытия</strong>
          </div>
        </div>

        <div className="hero__types" aria-label="Типы объектов">
          <span>Кафе</span>
          <span>Ритейл</span>
          <span>Офисы</span>
          <span>Образование</span>
          <span>Сервис</span>
        </div>
      </section>

      <section className="manifesto section-dark" id="about">
        <div className="section-index" aria-hidden="true">01</div>
        <div className="manifesto__title" data-reveal>
          <p className="eyebrow">Подход Abricos Design</p>
          <h2>Сначала логика.<br /><em>Затем форма.</em></h2>
        </div>
        <div className="manifesto__copy" data-reveal>
          <p className="manifesto__lead">
            Красивый интерьер должен решать конкретные задачи — направлять, помогать, запоминаться и выдерживать ежедневную работу.
          </p>
          <p>
            Поэтому проект начинается не с декора. Мы изучаем движение людей, работу команды, оборудование и технические ограничения. Так планировка, свет, материалы и графика складываются в одну систему.
          </p>
          <a className="text-link text-link--light" href="#services">
            Из чего складывается проект
            <ArrowMark />
          </a>
        </div>
        <div className="apricot-shape" aria-hidden="true">
          <span />
        </div>
      </section>

      <section className="services section-light" id="services">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">Что делаем</p>
            <h2>Один замысел.<br /><em>Все необходимые слои.</em></h2>
          </div>
          <p>
            Состав проекта собирается под конкретный объект — без лишних разделов и разрывов между идеей и реализацией.
          </p>
        </div>
        <div className="services__grid">
          {services.map((service) => (
            <article className="service-card" key={service.number} data-reveal>
              <div className="service-card__number">{service.number}</div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <div className="service-card__tags" aria-label="Состав услуги">
                {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="directions" id="directions">
        <div className="section-heading section-heading--compact" data-reveal>
          <div>
            <p className="eyebrow">Типы пространств</p>
            <h2>Для разных сценариев.<br /><em>С одной внимательностью.</em></h2>
          </div>
          <p>Фотографии ниже показывают направления работы и не обозначают реализованные объекты студии.</p>
        </div>
        <div className="directions__grid">
          {directions.map((direction, index) => (
            <article className={direction.className} key={direction.title} data-reveal>
              <img src={direction.image} alt="" />
              <div className="direction-card__shade" />
              <div className="direction-card__number">0{index + 1}</div>
              <div className="direction-card__content">
                <span>Визуальный референс</span>
                <h3>{direction.title}</h3>
                <p>{direction.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="deliverables section-dark">
        <div className="deliverables__intro" data-reveal>
          <p className="eyebrow">Результат работы</p>
          <h2>Проект, который можно <em>обсудить, посчитать и реализовать.</em></h2>
          <p>
            Клиент получает не набор разрозненных картинок, а согласованную систему решений для объекта и команды реализации.
          </p>
          <a className="button button--sand" href="#contact">
            Собрать состав проекта
            <ArrowMark />
          </a>
        </div>
        <div className="deliverables__list">
          {deliverables.map(([title, text], index) => (
            <article key={title} data-reveal>
              <span>0{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="process section-light" id="process">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">Как строится работа</p>
            <h2>Понятный маршрут<br /><em>от запроса к пространству.</em></h2>
          </div>
          <p>На каждом этапе есть конкретный результат, точка согласования и понятный следующий шаг.</p>
        </div>
        <div className="process-ribbon" data-reveal>
          <div className="process-ribbon__line" aria-hidden="true" />
          {process.map(([title, text], index) => (
            <article className="process-step" key={title}>
              <div className="process-step__dot"><span>{String(index + 1).padStart(2, "0")}</span></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="archive">
        <div className="archive__collage" data-reveal>
          <div className="archive__image archive__image--main">
            <img src="/images/workspace.jpg" alt="Современное общественное пространство с открытой планировкой" />
          </div>
          <div className="archive__image archive__image--side">
            <img src="/images/hospitality.jpg" alt="Интерьер пространства для встреч и событий" />
          </div>
        </div>
        <div className="archive__copy" data-reveal>
          <p className="eyebrow">Практика студии</p>
          <h2>От интерьера<br />до <em>фирменной среды.</em></h2>
          <p>
            В архиве Abricos Design — проекты общественных и коммерческих пространств, 3D-моделирование, торговые точки, стенды и графическое оформление.
          </p>
          <a className="button button--outline" href="/portfolio">
            Смотреть портфолио
            <ArrowMark />
          </a>
        </div>
      </section>

      <section className="faq" id="faq">
        <div className="faq__heading" data-reveal>
          <p className="eyebrow">Перед стартом</p>
          <h2>Частые<br /><em>вопросы.</em></h2>
          <p>Если вашего вопроса нет в списке, опишите его в форме ниже — обсудим предметно.</p>
        </div>
        <div className="faq__list" data-reveal>
          {faqs.map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <article className={`faq-item ${isOpen ? "faq-item--open" : ""}`} key={item.question}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                >
                  <span>{item.question}</span>
                  <i aria-hidden="true" />
                </button>
                <div className="faq-item__answer" id={`faq-answer-${index}`} aria-hidden={!isOpen}>
                  <p>{item.answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact__intro" data-reveal>
          <p className="eyebrow">Новый проект</p>
          <h2>Есть пространство, которое нужно <em>продумать?</em></h2>
          <p>
            Расскажите о задаче. Обсудим исходные данные, подходящий состав проекта и следующий шаг.
          </p>
          <div className="contact__direct">
            <a href="tel:+79119133030">+7 911 913-30-30</a>
            <a href="mailto:abricos-design@mail.ru">abricos-design@mail.ru</a>
            <a href="https://vk.com/abricosdesign" target="_blank" rel="noreferrer">ВКонтакте</a>
          </div>
        </div>
        <form className="brief-form" onSubmit={submitBrief} data-reveal>
          <div className="brief-form__row">
            <label>
              <span>Как к вам обращаться</span>
              <input name="name" type="text" autoComplete="name" placeholder="Имя" required />
            </label>
            <label>
              <span>Телефон или мессенджер</span>
              <input name="contact" type="text" autoComplete="tel" placeholder="+7" required />
            </label>
          </div>
          <div className="brief-form__row">
            <label>
              <span>Тип объекта</span>
              <input name="object" type="text" placeholder="Кафе, магазин, офис..." required />
            </label>
            <label>
              <span>Площадь</span>
              <input name="area" type="text" inputMode="numeric" placeholder="м², если известна" />
            </label>
          </div>
          <label>
            <span>Коротко о задаче</span>
            <textarea name="message" rows={4} placeholder="Что нужно спроектировать и на каком этапе находится объект?" required />
          </label>
          <button className="button button--dark" type="submit">
            Подготовить письмо
            <ArrowMark />
          </button>
          <p className="brief-form__note">
            После нажатия откроется ваше почтовое приложение с заполненным письмом. Данные не сохраняются на сайте.
          </p>
        </form>
      </section>

      <footer className="footer">
        <a href="#top" aria-label="Abricos Design — наверх"><Logo /></a>
        <p>Проектирование и дизайн общественных и коммерческих пространств.</p>
        <div className="footer__links">
          <a href="mailto:abricos-design@mail.ru">Email</a>
          <a href="tel:+79119133030">Телефон</a>
          <a href="https://vk.com/abricosdesign" target="_blank" rel="noreferrer">ВКонтакте</a>
        </div>
        <div className="footer__bottom">
          <span>Санкт-Петербург</span>
          <span>Фотографии направлений: Unsplash</span>
          <span>© {new Date().getFullYear()} Abricos Design</span>
        </div>
      </footer>
    </main>
  );
}
