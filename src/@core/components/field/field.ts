import Block, { ElementEvent, Props } from '@/utils/Block.ts';
import InputHelp from '@/@core/components/inputHelp/inputHelp.ts';
import fieldSingleTmpl from '@/@core/components/field/fieldSingle.tmpl.ts';
import Input from '../input/input.ts';
import fieldTmpl from './field.tmpl.ts';
import Label from '../label/label.ts';

class Field extends Block {
  input;

  constructor(props: Props, events: ElementEvent[] = [], isSingle = false) {
    const inputEvents = events.filter((el) => el.event.startsWith('input:'))
      .map((el) => ({ event: el.event.replace('input:', ''), callback: el.callback }));

    const input = new Input(props, inputEvents);
    const helper = new InputHelp(props);

    super(
      props,
      isSingle ? fieldSingleTmpl : fieldTmpl,
      'div',
      [
        new Label(props),
        input,
        helper,
      ],
    );
    this.input = input;
  }

  clearInput() {
    (this.input.getContent() as HTMLInputElement).value = '';
  }
}

export default Field;
