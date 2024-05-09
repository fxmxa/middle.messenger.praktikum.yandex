import { assert } from 'chai';
import Block from '../utils/Block.ts';
import RouteClass from './Route.class.ts';

describe('Route', () => {
  const homePage = new Block({}, '<main id="home"></main>');
  const route = new RouteClass('/home', homePage, '#app');
  route.render();
  const page = document.getElementById('home');

  it('block is render', () => {
    assert.notEqual(page, null);
  });

  it('block is hidden after leave', () => {
    route.leave();
    const display = page?.style.display;
    assert.equal(display, 'none');
  });

  it('block is show after navigate', () => {
    route.navigate('/home');
    const display = page?.style.display;
    assert.equal(display, 'flex');
  });
});
