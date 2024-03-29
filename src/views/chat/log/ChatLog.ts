import Block from '@/utils/Block.ts';
import chatLogTmpl from '@/views/chat/log/ChatLog.tmpl.ts';
import chatMessages from '@/views/chat/messages/ChatMessages.ts';

const chatLog = new Block({}, chatLogTmpl, 'div', [chatMessages]);

export default chatLog;
