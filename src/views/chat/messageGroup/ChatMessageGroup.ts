import Block, { Props } from '@/utils/block/Block.ts';
import chatMessageGroupTmpl from '@/views/chat/messageGroup/ChatMessageGroup.tmpl.ts';
import Contact from '@/views/chat/contact/ChatContact.ts';
import ChatMessage from '@/views/chat/message/ChatMessage.ts';

class ChatMessageGroup extends Block {
  constructor(props: Props) {
    const messageList = Array.isArray(props.items) ? props.items.map((el:string) => new ChatMessage({ text: el })) : [];
    super(
      props,
      chatMessageGroupTmpl,
      'li',
      [
        new Contact({ name: props.name, message: props.time, avatar: props.avatar }),
        ...messageList,
      ],
    );
  }
}

export default ChatMessageGroup;
