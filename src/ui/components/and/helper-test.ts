import and from './helper';

const { module, test } = QUnit;

module('Helper: and', function(hooks) {
  test('returns true if all params are true', function(assert) {
    assert.equal(and([true, true]), true);
  });

  test('it returns false if any params are false', function(assert) {
    assert.equal(and([true, false]), false);
    assert.equal(and([false, true]), false);
  });
});
