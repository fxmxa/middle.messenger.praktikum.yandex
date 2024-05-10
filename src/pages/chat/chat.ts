import Block from '@/utils/block/Block.ts';
import chatTmpl from '@/pages/chat/chat.tmpl.ts';
import chatSidebar from '@/views/chat/sidebar/ChatSidebar.ts';
import chatMain from '@/views/chat/main/ChatMain.ts';
import Layout from '@/layouts/default/default.ts';

const chat = new Block({}, chatTmpl, 'div', [chatSidebar, chatMain]);

const chatPage = new Layout({}, [chat]);
export default chatPage;
