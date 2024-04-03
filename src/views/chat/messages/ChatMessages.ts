import Block from '@/utils/Block.ts';
import chatMessagesTmpl from '@/views/chat/messages/ChatMessages.tmpl.ts';
import ChatMessageGroup from '@/views/chat/messageGroup/ChatMessageGroup.ts';
import messagesFromServer from '@/views/chat/messagesFromServer.ts';

const groupList = messagesFromServer.map((el) => new ChatMessageGroup(el));

const chatMessages = new Block(
  {},
  chatMessagesTmpl,
  'ul',
  groupList,
);

export default chatMessages;
