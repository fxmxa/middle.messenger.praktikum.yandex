import Block, { ElementEvent, Props } from '@/utils/Block.ts';
import linkTmpl from './link.tmpl.ts';

class Link extends Block {
  constructor(props: Props, events: ElementEvent[] = []) {
    super(props, linkTmpl, 'a', [], events);
  }
}

export default Link;
