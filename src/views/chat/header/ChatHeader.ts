import Block from '@/utils/Block.ts';
import chatHeaderTmpl from '@/views/chat/header/ChatHeader.tmpl.ts';
import RouterLink from '@/@core/components/routerLink/routerLink.ts';
import classes from '@/styles/common.module.scss';
import store from '@/store/Store.ts';
import resourceUrl from '@/utils/resourceUrl.ts';
import ChatInfo from '@/views/chat/info/ChatInfo.ts';

const addUserLinkAttrs = `class="${classes.mr1}"`;

const addUserLink = new RouterLink(
  { to: '/add-user-to-chat', text: 'Добавить пользователя', attrs: addUserLinkAttrs },
);

class ChatHeader extends Block {
  constructor() {
    super(
      {},
      chatHeaderTmpl,
      'div',
      [
      ],
    );

    store.on('updated:activeChat.id', () => {
      const { chats, activeChat } = store.getState();
      if (!chats || !chats.length || !activeChat) {
        console.error('!chats || !chats.length || !activeChat');
        return;
      }
      const { id, users } = activeChat;
      const chat = chats.find((el) => el.id === id);
      console.log(chats, id);
      if (!chat) {
        console.error('!chat');
        return;
      }
      const chatHeader = new ChatInfo({
        avatar: resourceUrl(chat.avatar),
        name: chat.title,
        message: `${users.length} пользователя`,
      });
      this.children = [
        chatHeader,
        addUserLink,
      ];
      this._render();
    });
  }
}

const chatInfo = new ChatHeader();

export default chatInfo;