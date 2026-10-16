import test from 'node:test';
import assert from 'node:assert/strict';
import { HOME_DEFAULTS, homeField, homeCollection, previewContent } from './homeDisplay.js';

test('clearing custom secondary text stays empty instead of restoring default', () => {
  const block = { heading_secondary: '', display_settings: { heading_secondary: 'custom' } };
  assert.equal(homeField('hero', block, 'heading_secondary'), '');
  assert.equal(previewContent('hero', block).heading_secondary, '');
  block.display_settings.heading_secondary = 'default';
  assert.equal(homeField('hero', block, 'heading_secondary'), HOME_DEFAULTS.hero.heading_secondary);
});
test('hidden content keeps its stored value while suppressing both sides of a button', () => {
  const block = { cta_primary_label: 'Original', cta_primary_href: '/courses', display_settings: { cta_primary: 'hidden' } };
  assert.equal(homeField('hero', block, 'cta_primary_label'), '');
  assert.equal(homeField('hero', block, 'cta_primary_href'), '');
  assert.equal(block.cta_primary_label, 'Original');
  block.display_settings.cta_primary = 'custom';
  assert.equal(homeField('hero', block, 'cta_primary_label'), 'Original');
});
test('empty custom badges and lists never restore built-in collections', () => {
  const fallback = [{ id: 'default' }];
  for (const key of ['floaters', 'items']) {
    assert.deepEqual(homeCollection({ display_settings: { [key]: 'custom' } }, key, [], fallback), []);
    assert.deepEqual(homeCollection({ display_settings: { [key]: 'hidden' } }, key, [{ id: 1 }], fallback), []);
    assert.equal(homeCollection({ display_settings: { [key]: 'default' } }, key, [], fallback), fallback);
  }
});
test('legacy rows and no-content startup preserve the original published conventions', () => {
  assert.equal(homeField('hero', null, 'heading'), HOME_DEFAULTS.hero.heading);
  assert.equal(homeField('hero', { heading_secondary: '' }, 'heading_secondary'), HOME_DEFAULTS.hero.heading_secondary);
  assert.equal(homeField('about_hero', { heading_secondary: '' }, 'heading_secondary'), '');
  assert.equal(homeField('contact_hero', { heading: 'Custom', heading_secondary: '' }, 'heading_secondary'), '');
  assert.equal(homeField('hero', { heading: 'Custom' }, 'heading'), 'Custom');
});

test('preview can mount before a section has loaded', () => {
  assert.deepEqual(previewContent(null, {}), { body: '', img: '' });
});
