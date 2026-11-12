const {test} = require('node:test');
const assert = require('node:assert/strict');
const {wrapProjectIndex, buildRequestMailto} = require('../replica.js');
test('project navigation wraps both ends and tolerates an empty gallery', () => {
  assert.equal(wrapProjectIndex(-1, 5), 4);
  assert.equal(wrapProjectIndex(5, 5), 0);
  assert.equal(wrapProjectIndex(17, 5), 2);
  assert.equal(wrapProjectIndex(1, 0), 0);
});
test('request email preserves Cyrillic and punctuation without adding URL fields', () => {
  const url = new URL(buildRequestMailto('  Иван & Анна?  ', '+7 911 123-45-67#доб.8'));
  assert.equal(url.pathname, 'abricos-design@mail.ru');
  assert.equal(url.searchParams.get('body'), 'Имя: Иван & Анна?\nТелефон: +7 911 123-45-67#доб.8\n\nОписание объекта:\n');
  assert.equal(url.searchParams.get('subject'), 'Запрос на разработку технологических решений');
  assert.equal([...url.searchParams].length, 2);
  assert.equal(url.hash, '');
});
