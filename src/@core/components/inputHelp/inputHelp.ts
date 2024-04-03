import Block, { Props } from '@/utils/Block.ts';
import inputHelpTmpl from '@/@core/components/inputHelp/inputHelp.tmpl.ts';

class InputHelp extends Block {
  constructor(props: Props) {
    super(props, inputHelpTmpl, 'span');
  }
}

export default InputHelp;
