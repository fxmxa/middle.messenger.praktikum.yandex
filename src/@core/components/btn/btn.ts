import Block, { ElementEvent, Props } from '@/utils/Block.ts';
import btnTmpl from './btn.tmpl.ts';

class Button extends Block {
  constructor(props: Props, events: ElementEvent[] = []) {
    super(
      { type: 'submit', ...props },
      btnTmpl,
      'button',
      [],
      events,
    );
  }
}

export default Button;
