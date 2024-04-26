import Block, { Props, ElementEvent } from '@/utils/Block.ts';
import store from '@/store/Store.ts';
import Option from '@/@core/components/option/option.ts';
import selectTmpl from './select.tmpl.ts';

class Select extends Block {
  constructor(props: Props, children: Block[] = [], events: ElementEvent[] = []) {
    super(
      props,
      selectTmpl,
      'select',
      children,
      events,
    );
    store.on('updated:activeChat.users', () => {
      const users = store.getState()?.activeChat?.users ?? [];
      const options = users.map(({ id, login }) => new Option({ text: login, value: id.toString() }));
      this.children = options;
      this._render();
    });
  }
}

export default Select;
