import Block from '@/utils/block/Block.ts';
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

const removeUserLink = new RouterLink(
  { to: '/remove-user-from-chat', text: 'Удалить пользователей', attrs: addUserLinkAttrs },
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
        return;
      }
      const { id, users } = activeChat;
      const chat = chats.find((el) => el.id === id);
      if (!chat) {
        this.children = [];
        this._render();
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
        removeUserLink,
      ];
      this._render();
    });
  }
}

const chatInfo = new ChatHeader();

export default chatInfo;
