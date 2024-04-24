import Block, { ElementEvent, Props } from '@/utils/Block.ts';
import contactTmpl from '@/views/chat/contact/ChatContact.tmpl.ts';

class Contact extends Block {
  constructor(props: Props, events: ElementEvent[] = []) {
    super(props, contactTmpl, 'div', [], events);
  }
}

export default Contact;
