import { assert } from 'chai';
import Block from '../utils/Block.ts';
import RouterClass from './Router.class.ts';

describe('Router', () => {
  const homePage = new Block({}, '<main id="home"></main>');
  const router = new RouterClass();
  router.use('', homePage).use('/home', homePage).start();

  it('length of routes', () => {
    assert.equal(router.routes.length, 2);
  });

  it('find route by path', () => {
    assert.notEqual(router.getRoute(''), undefined);
  });
});
