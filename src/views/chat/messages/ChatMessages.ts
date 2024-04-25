import Block from '@/utils/Block.ts';
import chatMessagesTmpl from '@/views/chat/messages/ChatMessages.tmpl.ts';
import store from '@/store/Store.ts';
import Contact from '@/views/chat/contact/ChatContact.ts';
import ChatMessage from '@/views/chat/message/ChatMessage.ts';
import { formatDate, getTime, isOneDay } from '@/utils/dates.ts';
import ChatDate from '@/views/chat/date/ChatDate.ts';
import resourceUrl from '@/utils/resourceUrl.ts';

const defaultUser = { avatar: '/avatar-default.png', name: 'Пользователь не найден' };
class ChatMessages extends Block {
  users;

  constructor() {
    super(
      {},
      chatMessagesTmpl,
      'ul',
    );
    this.users = new Map();
    store.on('updated:activeChat.messages', () => {
      const activeChat = store.getState()?.activeChat;

      if (!activeChat) {
        console.error('updated:activeChat.messages');
        return;
      }

      const { messages, users, scroll } = activeChat;
      if (!users) {
        this.children = [];
        this._render();
        return;
      }
      users.forEach((user) => {
        this.users.set(user.id, { avatar: resourceUrl(user.avatar), name: `${user.first_name} ${user.second_name}` });
      });
      const element = this.getContent();
      const wrapper = element.parentElement;
      let lastUserId = -1;
      let lastDay = '';
      const groupList = structuredClone(messages).reverse().filter((el) => el.type === 'message')
        .reduce((acc: Block[], el) => {
          if (!isOneDay(el.time, lastDay)) {
            const date = formatDate(el.time);
            acc.push(new ChatDate({ date }));
          }
          if (lastUserId !== el.user_id) {
            const user = this.users.get(el.user_id) || defaultUser;
            acc.push(new Contact(user));
          }
          lastUserId = el.user_id;
          lastDay = el.time;
          const message = new ChatMessage({ text: el.content, time: getTime(el.time) });
          acc.push(message);
          return acc;
        }, []);
      this.children = groupList;
      const oldScrollPosition = wrapper ? wrapper.scrollHeight - wrapper.scrollTop : 0;

      this._render();
      if (wrapper) {
        wrapper.scrollTop = scroll ? wrapper.scrollHeight : wrapper.scrollHeight - oldScrollPosition;
      }
    });
  }
}

const chatMessages = new ChatMessages();

export default chatMessages;
