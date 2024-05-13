import Block, { Props } from '@/utils/block/Block.ts';
import inputHelpTmpl from '@/@core/components/inputHelp/inputHelp.tmpl.ts';

class InputHelp extends Block {
  constructor(props: Props = {}) {
    super(props, inputHelpTmpl, 'span');
  }
}

export default InputHelp;
