import Block, { ElementEvent, Props } from '@/utils/Block.ts';
import InputHelp from '@/@core/components/inputHelp/inputHelp.ts';
import fieldSingleTmpl from '@/@core/components/field/fieldSingle.tmpl.ts';
import Input from '../input/input.ts';
import fieldTmpl from './field.tmpl.ts';
import Label from '../label/label.ts';

class Field extends Block {
  constructor(props: Props, events: ElementEvent[] = [], isSingle = false) {
    const inputEvents = events.filter((el) => el.event.startsWith('input:'))
      .map((el) => ({ event: el.event.replace('input:', ''), callback: el.callback }));

    super(
      props,
      isSingle ? fieldSingleTmpl : fieldTmpl,
      'div',
      [
        new Label(props),
        new Input(props, inputEvents),
        new InputHelp(props),
      ],
    );
  }
}

export default Field;
