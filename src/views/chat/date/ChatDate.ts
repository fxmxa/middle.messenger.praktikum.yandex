import Block, { Props } from '@/utils/block/Block.ts';
import ChatDateTmpl from '@/views/chat/date/ChatDate.tmpl.ts';

class ChatDate extends Block {
  constructor(props: Props) {
    super(props, ChatDateTmpl, 'li');
  }
}

export default ChatDate;
