import ChatsApi, { ChatsCreateDataType, ChatsRequestDataType } from '@/api/chats/chats.api.ts';
import store from '@/store/Store.ts';
import ChatsTokenApi from '@/api/chats/chats.token.api.ts';
import { isPlainObject } from '@/utils/objects.ts';
import { last } from '@/utils/arrays.ts';

export type sendTextMessagePayload = {
  content: string
  type: 'message' | 'file' | 'sticker'
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
      const { response, status } = await chatsApi.request(data);

      const statusOk = status === 200;

      if (statusOk) {
        store.set('chats', JSON.parse(response));
      }
      return statusOk;
    } catch (e) {
      console.error('getChats error ', e);
      return false;
    }
  }

  async addChat(payload: ChatsCreateDataType): Promise<boolean> {
    try {
      const chatsApi = new ChatsApi();
      const { response, status } = await chatsApi.create(payload);
      const statusOk = status === 200;
      if (statusOk) {
        store.set('activeChat.id', JSON.parse(response).id);
      }
      return statusOk;
    } catch (e) {
      console.error('addChat error ', e);
      return false;
    }
  }

  async getToken(id: number): Promise<boolean> {
    try {
      const chatsApi = new ChatsTokenApi();
      const { response, status } = await chatsApi.create(id);
      const statusOk = status === 200;
      if (statusOk) {
        store.set('activeChat.token', JSON.parse(response).token);
      }
      return statusOk;
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
    const { activeChat: { token: chatToken, id: chatId }, user: { id: userId } } = store.getState();

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
      // store.set('activeChat', null);
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

        // TODO: when toggle chat clear messages immediately
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
