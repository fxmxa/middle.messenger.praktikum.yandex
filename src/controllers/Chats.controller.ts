import ChatsApi, { ChatsCreateDataType, ChatsRequestDataType } from '@/api/chats/chats.api.ts';
import store from '@/store/Store.ts';
import ChatsTokenApi from '@/api/chats/chats.token.api.ts';
import { isPlainObject } from '@/utils/objects.ts';
import last from '@/utils/arrays.ts';

export type sendTextMessagePayload = {
  content: string
  type: 'message' | 'file' | 'sticker'
}
export type ChatsRequestResponse = Array<{
  id: number
  title: string
  avatar: string
  unread_count: number
  created_by: number
  last_message: {
    user: {
      first_name: string
      second_name: string
      avatar: string
      email: string
      login: string
      phone: string
    }
    time: string
    content: string
  }
}>

export type ChatsCreateResponse = {
  id: number
}

class ChatsController {
  socket: WebSocket | null;

  lastMessageId: number;

  constructor() {
    this.lastMessageId = 0;
    this.socket = null;
  }

  async getChats(data: ChatsRequestDataType = {}): Promise<boolean> {
    try {
      const chatsApi = new ChatsApi();
      const { ok, json } = await chatsApi.request(data);
      if (ok) {
        store.set('chats', <ChatsRequestResponse>json());
      }
      return ok;
    } catch (e) {
      console.error('getChats error ', e);
      return false;
    }
  }

  async addChat(payload: ChatsCreateDataType): Promise<boolean> {
    try {
      const chatsApi = new ChatsApi();
      const { ok, json } = await chatsApi.create(payload);
      if (ok) {
        const { id } = json() as ChatsCreateResponse;
        store.set('activeChat.id', id);
      }
      return ok;
    } catch (e) {
      console.error('addChat error ', e);
      return false;
    }
  }

  async getToken(id: number): Promise<boolean> {
    try {
      const chatsApi = new ChatsTokenApi();
      const { ok, json } = await chatsApi.create(id);
      if (ok) {
        const { token } = json() as {token: string};
        store.set('activeChat.token', token);
      }
      return ok;
    } catch (e) {
      console.error('getToken error ', e);
      return false;
    }
  }

  newWs() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      this.lastMessageId = 0;
    }
    const { activeChat, user } = store.getState();
    if (!activeChat || !user) {
      return;
    }

    const { token: chatToken, id: chatId } = activeChat;
    const { id: userId } = user;

    const chatsApi = new ChatsApi();
    this.socket = chatsApi.newWs({ chatToken, chatId, userId });

    this.socket.addEventListener('open', () => {
      this.getMessages();
      setInterval(() => {
        if (!this.socket) {
          return;
        }
        this.socket.send(JSON.stringify({ type: 'ping' }));
      }, 30e3);
    });

    this.socket.addEventListener('close', (e) => {
      console.log('socket close ', e);
    });

    this.socket.addEventListener('message', (e) => {
      const { data } = e;
      const dataObject = JSON.parse(data);

      const isMessageList = Array.isArray(dataObject);
      if (isMessageList) {
        const lastItem = last(dataObject);
        const needScroll = this.lastMessageId === 0;
        store.set('activeChat.scroll', needScroll);
        console.log('needScroll', needScroll);
        this.lastMessageId = lastItem && dataObject.length === 20 ? lastItem.id : -1;

        const oldMessages = store.getState()?.activeChat?.messages ?? [];
        store.set('activeChat.messages', [...oldMessages, ...dataObject]);
        return;
      }

      const messagePlainObject = isPlainObject(dataObject);
      if (!messagePlainObject) {
        return;
      }
      const { type } = dataObject;

      if (type === 'message') {
        const oldMessages = store.getState()?.activeChat?.messages ?? [];
        store.set('activeChat.scroll', true);
        store.set('activeChat.messages', [dataObject, ...oldMessages]);
        if (this.lastMessageId !== -1) {
          this.lastMessageId += 1;
        }
      }
    });

    this.socket.addEventListener('error', (e) => {
      console.error('socket error', e);
    });
  }

  sendTextMessage(message: string) {
    if (!this.socket || !message) {
      return;
    }

    const stringData = JSON.stringify(
      {
        content: message,
        type: 'message',
      },
    );

    this.socket.send(stringData);
  }

  getMessages() {
    // TODO: load more from last id
    if (!this.socket || this.lastMessageId === -1) {
      return;
    }

    const stringData = JSON.stringify(
      {
        content: this.lastMessageId.toString(),
        type: 'get old',
      },
    );
    this.socket.send(stringData);
  }
}

export default new ChatsController();
