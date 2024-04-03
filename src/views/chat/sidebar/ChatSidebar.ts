import Block from '@/utils/Block.ts';
import chatSidebarTmpl from '@/views/chat/sidebar/ChatSidebar.tmpl.ts';
import chatContacts from '@/views/chat/contacts/ChatContacts.ts';
import chatFooter from '@/views/chat/footer/ChatFooter.ts';

const chatSidebar = new Block(
  { id: 'chatSidebar' },
  chatSidebarTmpl,
  'div',
  [chatContacts, chatFooter],
);

export default chatSidebar;
