import { assert } from 'chai';
import sum from './sum.ts';

describe('Sum function', () => {
  it('2 + 2', () => {
    assert.equal(sum(2, 2), 4);
  });

  it('999 + 1', () => {
    assert.equal(sum(999, 1), 1000);
  });

  it('0 + -1', () => {
    assert.equal(sum(0, -1), -1);
  });
});
