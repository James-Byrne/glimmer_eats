import div from './helper';

const { module, test } = QUnit;

module('Helper: div', function(hooks) {
  test('it returns 2', function(assert) {
    assert.equal(div([10, 5]), 2);
  });
  test('it returns an integer', function(assert) {
    assert.equal(div([10, 3]), 3);
  });
});
