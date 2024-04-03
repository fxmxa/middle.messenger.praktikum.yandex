import Block, { Props } from '@/utils/Block.ts';
import btnTmpl from './btn.tmpl.ts';

class Button extends Block {
  constructor(props: Props) {
    super(
      props,
      btnTmpl,
      'button',
      [],
    );
  }
}

export default Button;
