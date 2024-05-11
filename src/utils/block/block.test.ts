import { assert } from 'chai';
import Block from './Block.ts';

describe('Block', () => {
  const btnInner = 'my btn';
  const btnTmpl = `<button class="{{classList}}">${btnInner}</button>`;
  const btnBlock = new Block(
    { classList: 'btnClass' },
    btnTmpl,
    'button',
    [],
    [{ event: 'click', callback: (e) => e.currentTarget.classList.add('clicked') }],
  );

  it('inner html is correct', () => {
    const inner = btnBlock.element.innerHTML;

    assert.equal(inner, btnInner);
  });

  it('tag is correct', () => {
    const tag = btnBlock.element.tagName;

    assert.equal('BUTTON', tag);
  });

  it('class is correct', () => {
    const { classList } = btnBlock.element;

    assert.equal('btnClass', classList.value);
  });

  it('can`t remove props', () => {
    assert.throws(() => delete btnBlock.props.classList, Error);
  });

  it('set props works', () => {
    const oldClass = btnBlock.element.classList.value;
    btnBlock.setProps({ classList: 'newClass' });
    const newClass = btnBlock.element.classList.value;

    assert.notEqual(oldClass, newClass);
  });

  it('hide block', () => {
    btnBlock.hide();
    const { display } = btnBlock.element.style;

    assert.equal(display, 'none');
  });

  it('show block', () => {
    btnBlock.show();
    const { display } = btnBlock.element.style;

    assert.equal(display, 'flex');
  });

  it('events count', () => {
    const eventsCount = btnBlock.events.length;

    assert.equal(eventsCount, 1);
  });

  it('event work', () => {
    document.body.append(btnBlock.element);
    const btnEl = document.querySelector('button');
    btnEl?.click();
    const classes = btnEl?.classList.value;

    assert.include(classes, 'clicked');
  });
});
