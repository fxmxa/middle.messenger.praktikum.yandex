import linkTmpl from './link.tmpl.ts';
import Block, { ElementEvent, Props } from '../../../utils/Block.ts';

class Link extends Block {
  constructor(props: Props, events: ElementEvent[] = []) {
    super(props, linkTmpl, 'a', [], events);
  }
}

export default Link;
