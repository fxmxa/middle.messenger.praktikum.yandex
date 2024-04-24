import Contact from '@/views/chat/contact/ChatContact.ts';
import store from '@/store/Store.ts';
import { Props } from '@/utils/Block.ts';

class ChatInfo extends Contact {
  constructor(props: Props) {
    super(props);
    store.on('updated:activeChat.users', () => {
      const users = store.getState()?.activeChat?.users ?? [];

      this.setProps({
        message: `${users.length} пользователя`,
      });
    });
  }
}

export default ChatInfo;
