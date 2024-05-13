import Block from '@/utils/block/Block.ts';
import chatLogTmpl from '@/views/chat/log/ChatLog.tmpl.ts';
import chatMessages from '@/views/chat/messages/ChatMessages.ts';
import ChatsController from '@/controllers/Chats.controller.ts';

class ChatLog extends Block {
  constructor() {
    super(
      {},
      chatLogTmpl,
      'div',
      [chatMessages],
      [{ event: 'scroll', callback: logScrollHandle }],
    );
  }
}

let scrollTimeout: ReturnType<typeof setTimeout>;

function logScrollHandle(e: Event) {
  clearInterval(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const { scrollTop } = e.target as HTMLElement;
    if (scrollTop < 100) {
      ChatsController.getMessages();
    }
  }, 500);
}

const chatLog = new ChatLog();

export default chatLog;
