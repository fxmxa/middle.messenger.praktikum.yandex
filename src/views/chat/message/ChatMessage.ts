import Block, { Props } from '@/utils/Block.ts';
import chatMessageTmpl from '@/views/chat/message/ChatMessage.tmpl.ts';

class ChatMessage extends Block {
  constructor(props: Props) {
    super(props, chatMessageTmpl, 'li');
  }
}

export default ChatMessage;
