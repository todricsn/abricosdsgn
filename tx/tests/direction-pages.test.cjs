const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const routes = [
  'directions/education.html',
  'directions/public-offices.html',
  'directions/pools.html',
  'directions/food-retail.html',
  'directions/parking.html',
  'directions/vertical-transport.html',
  'directions/production.html',
];
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

test('each direction card opens its matching description rather than the shared article', () => {
  const cards = [...read('index.html').matchAll(/<a class="direction-card-link" href="([^"]+)"><div class="adv-item" id="direction-\d+"><div class="adv-title">([^<]+)/g)];
  assert.deepEqual(cards.map(card => card[1]), routes);
  for (const card of cards) {
    const page = read(card[1]);
    assert.ok(page.includes(`<h1>${card[2]}</h1>`), card[1]);
    assert.ok(page.includes('Что входит в работу'));
    assert.ok(page.includes('Что получает заказчик'));
    assert.ok(page.includes('Что нужно для начала'));
  }
});

test('each detail-page sidebar links to every direction and identifies the current page', () => {
  const expected = routes.map(route => path.basename(route));
  for (const route of routes) {
    const sidebar = read(route).match(/<aside class="direction-sidebar">([\s\S]*?)<\/aside>/)[1];
    const links = [...sidebar.matchAll(/<a href="([^"]+)"( aria-current="page")?>/g)];
    assert.deepEqual(links.map(link => link[1]), expected, route);
    assert.deepEqual(links.filter(link => link[2]).map(link => link[1]), [path.basename(route)], route);
  }
});

test('detail pages keep working asset and home-section links under the GitHub project prefix', () => {
  const home = read('index.html');
  for (const route of routes) {
    const page = read(route);
    const base = new URL(route, 'https://example.com/abricosdsgn/tx/');
    for (const [, value] of page.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (/^(?:https?:|mailto:|tel:|data:)/.test(value)) continue;
      const url = new URL(value, base);
      assert.ok(url.pathname.startsWith('/abricosdsgn/tx/'), value);
      const local = path.join(root, url.pathname.slice('/abricosdsgn/tx/'.length));
      assert.ok(fs.existsSync(local), `${route}: ${value}`);
      if (url.hash) {
        const target = local.endsWith('index.html') ? home : fs.readFileSync(local, 'utf8');
        assert.ok(target.includes(`id="${url.hash.slice(1)}"`), `${route}: ${value}`);
      }
    }
    assert.ok(page.includes('href="../index.html#contact"'));
    assert.ok(page.includes('href="tel:+79119133030"'));
    assert.ok(page.includes('href="mailto:abricos-proekt@mail.ru"'));
    assert.equal((page.match(/aria-current="page"/g) || []).length, 1);
  }
});

function fixture(t, edit) {
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'abricos-directions-'));
  t.after(() => fs.rmSync(folder, {recursive: true, force: true}));
  fs.copyFileSync(path.join(root, 'index.html'), path.join(folder, 'index.html'));
  const data = JSON.parse(read('directions.json'));
  edit(data);
  fs.writeFileSync(path.join(folder, 'directions.json'), JSON.stringify(data));
  return folder;
}

test('the builder escapes editable copy and produces identical output when repeated', t => {
  const folder = fixture(t, data => {
    data[0].title = 'Школа <script>alert("x")</script>';
    data[0].summary = 'Описание "объекта" & <оборудования>';
  });
  const {buildDirections} = require('../scripts/build-directions.cjs');
  buildDirections(folder);
  const file = path.join(folder, 'directions/education.html');
  const page = fs.readFileSync(file, 'utf8');
  assert.ok(page.includes('Школа &lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;'));
  assert.ok(page.includes('Описание &quot;объекта&quot; &amp; &lt;оборудования&gt;'));
  assert.ok(!page.includes('<script>alert('));
  const index = fs.readFileSync(path.join(folder, 'index.html'), 'utf8');
  buildDirections(folder);
  assert.equal(fs.readFileSync(file, 'utf8'), page);
  assert.equal(fs.readFileSync(path.join(folder, 'index.html'), 'utf8'), index);
});

test('invalid or duplicate route slugs are rejected before the builder writes files', t => {
  const {buildDirections} = require('../scripts/build-directions.cjs');
  for (const slug of ['../outside', 'education', undefined, null]) {
    const folder = fixture(t, data => { data[1].slug = slug; });
    const before = fs.readFileSync(path.join(folder, 'index.html'), 'utf8');
    assert.throws(() => buildDirections(folder), /slug/i);
    assert.equal(fs.readFileSync(path.join(folder, 'index.html'), 'utf8'), before);
    assert.ok(!fs.existsSync(path.join(folder, 'directions')));
  }
});

test('dollar tokens in editable metadata stay literal rather than injecting source markup', t => {
  const folder = fixture(t, data => {
    data[0].title = 'Название $&';
    data[0].summary = "Описание $` и $' и $&";
  });
  require('../scripts/build-directions.cjs').buildDirections(folder);
  const page = fs.readFileSync(path.join(folder, 'directions/education.html'), 'utf8');
  assert.ok(page.includes('<title>Название $&amp; — Абрикос</title>'));
  assert.ok(page.includes('<meta name="description" content="Описание $` и $&#39; и $&amp;">'));
});
