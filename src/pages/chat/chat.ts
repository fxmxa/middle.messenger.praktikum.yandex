import Block from '@/utils/Block.ts';
import chatTmpl from '@/pages/chat/chat.tmpl.ts';
import chatSidebar from '@/views/chat/sidebar/ChatSidebar.ts';
import chatMain from '@/views/chat/main/ChatMain.ts';

const chat = new Block({}, chatTmpl, 'div', [chatSidebar, chatMain]);

export default chat;
