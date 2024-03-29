import Block, { Props, ElementEvent } from '@/utils/Block.ts';
import inputTmpl from './input.tmpl.ts';

class Input extends Block {
  constructor(props: Props, events: ElementEvent[] = []) {
    super(
      props,
      inputTmpl,
      'input',
      [],
      [...events],
    );
  }
}

export default Input;
