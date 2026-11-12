'use strict';

const fs = require('node:fs');
const path = require('node:path');

const escapeHtml = text => text.replace(/[&<>"']/g, character => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[character]));

function validate(directions) {
  if (!Array.isArray(directions) || directions.length !== 7) throw new Error('Expected seven directions');
  const slugs = new Set();
  for (const direction of directions) {
    if (typeof direction.slug !== 'string' || !/^[a-z]+(?:-[a-z]+)*$/.test(direction.slug) || slugs.has(direction.slug)) throw new Error('Invalid or duplicate direction slug');
    slugs.add(direction.slug);
    for (const field of ['title', 'summary']) {
      if (typeof direction[field] !== 'string' || !direction[field].trim()) throw new Error(`Missing direction ${field}`);
    }
    for (const field of ['scope', 'deliverables', 'inputs']) {
      if (!Array.isArray(direction[field]) || !direction[field].length || direction[field].some(text => typeof text !== 'string' || !text.trim())) throw new Error(`Invalid direction ${field}`);
    }
  }
}

function linkHome(home, directions) {
  let cards = 0;
  home = home.replace(/(<a class="direction-card-link" href=")[^"]+(\"><div class="adv-item" id="direction-(\d+)">)/g, (_, start, end, number) => {
    const direction = directions[Number(number) - 1];
    if (!direction) throw new Error('Unexpected direction card');
    cards++;
    return `${start}directions/${direction.slug}.html${end}`;
  });
  if (cards !== directions.length) throw new Error('Direction cards do not match the content');
  return home;
}

function nestedLinks(html) {
  return html.replace(/\b(href|src)="([^"]+)"/g, (original, attribute, value) => {
    if (/^(?:https?:|tel:|mailto:|data:|\/\/)/.test(value)) return original;
    return `${attribute}="${value.startsWith('#') ? '../index.html' : '../'}${value}"`;
  });
}

function renderPage(home, direction, directions) {
  let head = home.match(/^[\s\S]*?<\/head>/)[0];
  head = head.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${escapeHtml(direction.title)} — Абрикос</title>`)
    .replace(/<meta name="description" content="[^"]*">/, () => `<meta name="description" content="${escapeHtml(direction.summary)}">`)
    .replace('</head>', '<link rel="stylesheet" href="directions.css?v=20261112-directions"></head>');
  const body = home.match(/<body\b[^>]*>/)[0];
  const header = home.match(/<header\b[\s\S]*?<\/header>/)[0];
  const footer = home.match(/<div class="fusion-footer">[\s\S]*?<\/footer>/)[0] + '</div>';
  const list = items => `<ul>${items.map(text => `<li>${escapeHtml(text)}</li>`).join('')}</ul>`;
  const section = (title, items) => `<section class="direction-section"><h2>${title}</h2>${list(items)}</section>`;
  const otherDirections = directions.map(item => `<li><a href="${item.slug}.html"${item.slug === direction.slug ? ' aria-current="page"' : ''}>${escapeHtml(item.title)}</a></li>`).join('');
  return `${nestedLinks(head)}${body}<div id="wrapper">${nestedLinks(header)}
<main id="main" class="direction-main"><div class="direction-page" id="top">
<a class="direction-back" href="../index.html#directions">Все направления</a>
<div class="direction-layout"><article class="direction-article">
<h1>${escapeHtml(direction.title)}</h1><p class="direction-intro">${escapeHtml(direction.summary)}</p>
${section('Что входит в работу', direction.scope)}
${section('Что получает заказчик', direction.deliverables)}
${section('Что нужно для начала', direction.inputs)}
<div class="direction-consultation"><h2>Обсудить ваш объект</h2><p>Пришлите имеющиеся планы и опишите задачу. Уточним исходные данные и состав разработки.</p><a class="direction-cta" href="../index.html#contact">Получить консультацию</a></div>
</article><aside class="direction-sidebar"><nav aria-label="Направления разработки"><h2>Направления разработки</h2><ul>${otherDirections}</ul></nav></aside></div>
</div></main>${nestedLinks(footer)}</div></body></html>\n`;
}

function buildDirections(root = path.resolve(__dirname, '..')) {
  const directions = JSON.parse(fs.readFileSync(path.join(root, 'directions.json'), 'utf8'));
  validate(directions);
  const home = linkHome(fs.readFileSync(path.join(root, 'index.html'), 'utf8'), directions);
  const pages = directions.map(direction => [direction.slug, renderPage(home, direction, directions)]);
  fs.mkdirSync(path.join(root, 'directions'), {recursive: true});
  for (const [slug, page] of pages) fs.writeFileSync(path.join(root, 'directions', `${slug}.html`), page);
  fs.writeFileSync(path.join(root, 'index.html'), home);
}

if (require.main === module) {
  buildDirections();
  console.log('Built seven direction pages and their main-page links.');
}

module.exports = {buildDirections};
