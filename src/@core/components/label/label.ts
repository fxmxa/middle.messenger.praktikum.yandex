import Block, { Props } from '../../../utils/block/Block.ts';
import labelTmpl from './label.tmpl.ts';

class Label extends Block {
  constructor(props: Props) {
    super(props, labelTmpl, 'label');
  }
}

export default Label;
