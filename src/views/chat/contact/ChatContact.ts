import Block, { Props } from '@/utils/Block.ts';
import contactTmpl from '@/views/chat/contact/ChatContact.tmpl.ts';

class Contact extends Block {
  constructor(props: Props) {
    super(props, contactTmpl, 'div');
  }
}

export default Contact;
