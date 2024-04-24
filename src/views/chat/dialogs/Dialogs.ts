import Block from '@/utils/Block.ts';
import chatContactsTmpl from '@/views/chat/dialogs/Dialogs.tmpl.ts';
import ChatContact from '@/views/chat/contact/ChatContact.ts';
import ChatsController from '@/controllers/Chats.controller.ts';
import store, { StoreEvents } from '@/store/Store.ts';
import resourceUrl from '@/utils/resourceUrl.ts';
import ChatsUsersController from '@/controllers/Chats.users.controller.ts';

export type ChatsResponse = Array<{
  id: number
  title: string
  avatar: any
  created_by: number
  unread_count: number
  last_message: null | string
}>

class Dialogs extends Block {
  constructor() {
    super(
      {},
      chatContactsTmpl,
      'div',
      [],
      [],
    );

    const path: string = 'chats';
    const event = `${StoreEvents.Updated}:${path}`;
    store.on(event, () => {
      const chats = store.getState()?.chats ?? [];

      this.children = chats.map((el) => new ChatContact(
        {
          name: el.title,
          avatar: resourceUrl(el.avatar),
          message: el?.last_message?.content ?? '',
          id: el.id.toString(),
        },
        [{ event: 'click', callback: dialogClickHandle }],
      ));
      this._render();
    });
  }
}

async function dialogClickHandle() {
  store.set('activeChat.users', []);
  store.set('activeChat.messages', []);
  const chatId = this.props.id;

  const getTokenRes = await ChatsController.getToken(chatId);

  const getChatUsersRes = await ChatsUsersController.get(chatId);

  if (!getTokenRes || !getChatUsersRes) {
    return;
  }
  store.set('activeChat.id', +chatId);

  ChatsController.newWs();
}

ChatsController.getChats();

const chatContacts = new Dialogs();

export default chatContacts;
