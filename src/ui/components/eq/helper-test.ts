import eq from './helper';

const { module, test } = QUnit;

module('Helper: eq', function(hooks) {
  test('it computes', function(assert) {
    assert.equal(eq([true, true]), true);
  });

  test('it returns false', function(assert) {
    assert.equal(eq([true, false]), false);
  });
});
