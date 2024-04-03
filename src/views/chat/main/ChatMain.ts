import Block from '@/utils/Block.ts';
import chatMainTmpl from '@/views/chat/main/ChatMain.tmpl.ts';
import chatInfo from '@/views/chat/info/ChatInfo.ts';
import chatLog from '@/views/chat/log/ChatLog.ts';
import chatSend from '@/views/chat/send/ChatSend.ts';

const chatMain = new Block(
  {},
  chatMainTmpl,
  'div',
  [chatInfo, chatLog, chatSend],
);

export default chatMain;
