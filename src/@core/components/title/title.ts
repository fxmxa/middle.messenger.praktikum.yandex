import Block, { Props } from '../../../utils/Block.ts';
import titleTmpl from './title.tmpl.ts';

class Title extends Block {
  constructor(props: Props) {
    super(props, titleTmpl, 'h2');
  }
}

export default Title;
