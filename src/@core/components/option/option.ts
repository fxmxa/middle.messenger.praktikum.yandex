import Block, { Props } from '@/utils/block/Block.ts';
import optionTmpl from '@/@core/components/option/option.tmpl.ts';

class Option extends Block {
  constructor(props: Props) {
    super(
      props,
      optionTmpl,
      'option',
    );
  }
}

export default Option;
