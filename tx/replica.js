function sceneShift(top, height, viewportHeight) {
  return Math.max(-0.5, Math.min(0.5, (viewportHeight - top) / (viewportHeight + height) - 0.5));
}

'use strict';

function wrapProjectIndex(index, count) {
  return count ? ((index % count) + count) % count : 0;
}

function buildRequestMailto(name, phone) {
  const subject = 'Запрос на разработку технологических решений';
  const body = `Имя: ${name.trim()}\nТелефон: ${phone.trim()}\n\nОписание объекта:\n`;
  return `mailto:abricos-proekt@mail.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

if (typeof module !== 'undefined') module.exports = {wrapProjectIndex, buildRequestMailto, sceneShift};

if (typeof document !== 'undefined') {
  const scene = document.querySelector('.services-scene');
  if (scene) {
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    let pending = false;
    const updateScene = () => {
      pending = false;
      const bounds = scene.getBoundingClientRect();
      scene.style.setProperty('--scene-shift', reducedMotion.matches ? 0 : sceneShift(bounds.top, bounds.height, innerHeight));
    };
    const scheduleScene = () => { if (!pending) { pending = true; requestAnimationFrame(updateScene); } };
    addEventListener('scroll', scheduleScene, {passive: true});
    addEventListener('resize', scheduleScene);
    reducedMotion.addEventListener('change', scheduleScene);
    updateScene();
  }
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
  const menu = document.querySelector('#mobile-menu-v2-wrapper');
  const menuToggle = document.querySelector('.replica-menu-toggle');
  if (menu && menuToggle) {
    menuToggle.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Открыть меню');
    }));
  }
  document.querySelector('.replica-request')?.addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    for (const name of ['name', 'phone']) form.elements.namedItem(name).value = form.elements.namedItem(name).value.trim();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    location.href = buildRequestMailto(String(data.get('name') || ''), String(data.get('phone') || ''));
  });
}
