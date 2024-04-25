import Block from '@/utils/Block.ts';
import chatMainTmpl from '@/views/chat/main/ChatMain.tmpl.ts';
import chatInfo from '@/views/chat/header/ChatHeader.ts';
import chatLog from '@/views/chat/log/ChatLog.ts';
import chatSend from '@/views/chat/send/ChatSend.ts';
import store from '@/store/Store.ts';

class ChatMain extends Block {
  constructor() {
    super({}, chatMainTmpl, 'div');

    store.on('updated:activeChat.id', () => {
      const chatId = store.getState()?.activeChat?.id;
      if (chatId === undefined) {
        this.children = [];
      } else {
        this.children = [chatInfo, chatLog, chatSend];
      }
      this._render();
    });
  }
}

const chatMain = new ChatMain();

export default chatMain;
