import splitOn from './helper';

const { module, test } = QUnit;

module('Helper: split-on', function(hooks) {
  test('it computes', function(assert) {
    assert.equal(splitOn(['test,test', ',']), ['test', 'test']);
  });
});
