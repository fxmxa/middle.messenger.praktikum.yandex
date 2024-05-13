import Block, { Props } from '@/utils/block/Block.ts';
import btnGroupTmpl from '@/@core/components/btnGroup/btnGroup.tmpl.ts';

class BtnGroup extends Block {
  constructor(props: Props, children: Block[]) {
    super(props, btnGroupTmpl, 'div', children);
  }
}

export default BtnGroup;
