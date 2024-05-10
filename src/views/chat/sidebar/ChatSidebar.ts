import Block from '@/utils/block/Block.ts';
import chatSidebarTmpl from '@/views/chat/sidebar/ChatSidebar.tmpl.ts';
import chatContacts from '@/views/chat/dialogs/Dialogs.ts';
import chatFooter from '@/views/chat/footer/ChatFooter.ts';

const chatSidebar = new Block(
  { id: 'chatSidebar' },
  chatSidebarTmpl,
  'div',
  [
    chatContacts,
    chatFooter,
  ],
);

export default chatSidebar;
