import Block, { Props } from '@/utils/Block.ts';
import defaultTmpl from '@/layouts/default/default.tmpl.ts';

class Layout extends Block {
  constructor(props: Props, children: Block[]) {
    super(props, defaultTmpl, 'main', children);
  }
}

export default Layout;
