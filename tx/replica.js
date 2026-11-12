'use strict';

function wrapProjectIndex(index, count) {
  return count ? ((index % count) + count) % count : 0;
}

function buildRequestMailto(name, phone) {
  const subject = 'Запрос на разработку технологических решений';
  const body = `Имя: ${name.trim()}\nТелефон: ${phone.trim()}\n\nОписание объекта:\n`;
  return `mailto:abricos-design@mail.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

if (typeof module !== 'undefined') module.exports = {wrapProjectIndex, buildRequestMailto};

if (typeof document !== 'undefined') {
  const slides = [...document.querySelectorAll('[data-project-slide]')];
  let projectIndex = 0;
  document.querySelectorAll('[data-project-step]').forEach(button => {
    button.addEventListener('click', () => {
      projectIndex = wrapProjectIndex(projectIndex + Number(button.dataset.projectStep), slides.length);
      slides.forEach((slide, index) => { slide.hidden = index !== projectIndex; });
    });
  });
  document.querySelectorAll('[data-gallery-step]').forEach(button => {
    button.addEventListener('click', () => {
      const gallery = button.parentElement.querySelector(':scope > div');
      if (gallery) gallery.scrollBy({left: Number(button.dataset.galleryStep) * 414, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    });
  });
  document.querySelectorAll('.subcategory.main li').forEach(item => {
    const list = item.querySelector(':scope > .subcategory.sub');
    const toggle = item.querySelector(':scope > .num-content');
    if (!list || !toggle) return;
    toggle.setAttribute('role', 'button');
    toggle.setAttribute('tabindex', '0');
    toggle.setAttribute('aria-expanded', String(list.classList.contains('show')));
    const expand = () => {
      const open = list.classList.toggle('show');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', expand);
    toggle.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); expand(); }
    });
  });
  const serviceLink = document.querySelector('.fusion-main-menu .to-service-menu > a');
  const mega = document.querySelector('.e-cmenu__drop');
  if (serviceLink && mega) {
    mega.id = 'services-menu';
    serviceLink.setAttribute('aria-controls', mega.id);
    serviceLink.setAttribute('aria-expanded', 'false');
    serviceLink.addEventListener('keydown', event => {
      if (event.key !== 'ArrowDown') return;
      event.preventDefault();
      mega.classList.add('active');
      serviceLink.setAttribute('aria-expanded', 'true');
      mega.querySelector('a')?.focus();
    });
    mega.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;
      mega.classList.remove('active');
      serviceLink.setAttribute('aria-expanded', 'false');
      serviceLink.focus();
    });
    mega.addEventListener('focusout', event => {
      if (!mega.contains(event.relatedTarget)) {
        mega.classList.remove('active');
        serviceLink.setAttribute('aria-expanded', 'false');
      }
    });
  }
  const menu = document.querySelector('#mobile-menu-v2-wrapper');
  const menuToggle = document.querySelector('.replica-menu-toggle');
  if (menu && menuToggle) {
    menuToggle.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    });
    menu.querySelectorAll('.toggle-sub-menu').forEach(toggle => {
      toggle.setAttribute('role', 'button');
      toggle.setAttribute('tabindex', '0');
      toggle.setAttribute('aria-label', 'Подразделы');
      toggle.setAttribute('aria-expanded', 'false');
      const expand = () => {
        const item = toggle.closest('li');
        const open = item.classList.toggle('is-expanded');
        toggle.setAttribute('aria-expanded', String(open));
      };
      toggle.addEventListener('click', expand);
      toggle.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); expand(); }
      });
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Открыть меню');
    }));
  }
  document.querySelectorAll('[data-contact-button]').forEach(button => button.addEventListener('click', () => {
    document.querySelector('#contact').scrollIntoView();
  }));
  document.querySelector('.replica-request')?.addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    for (const name of ['name', 'phone']) form.elements.namedItem(name).value = form.elements.namedItem(name).value.trim();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    location.href = buildRequestMailto(String(data.get('name') || ''), String(data.get('phone') || ''));
  });
  const search = document.querySelector('#replica-search');
  document.querySelectorAll('[data-open-search]').forEach(button => button.addEventListener('click', () => search.showModal()));
  document.querySelector('.replica-search-form')?.addEventListener('submit', event => {
    event.preventDefault();
    const query = new FormData(event.currentTarget).get('query').trim().toLocaleLowerCase('ru');
    if (!query) return;
    const result = [...document.querySelectorAll('#main h1,#main h2,#main h3,#main h4,.adv-title')].find(heading => heading.textContent.toLocaleLowerCase('ru').includes(query));
    if (result) { search.close(); result.scrollIntoView(); }
    else document.querySelector('#search-status').textContent = 'На этой странице ничего не найдено. Попробуйте другое название.';
  });
}
