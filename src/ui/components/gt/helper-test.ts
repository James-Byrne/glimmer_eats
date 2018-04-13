import gt from './helper';

const { module, test } = QUnit;

module('Helper: gt', function(hooks) {
  test('it returns false', function(assert) {
    assert.equal(gt([1,1]), false);
  });
  test('it returns true', function(assert) {
    assert.equal(gt([2,1]), false);
  });
});
