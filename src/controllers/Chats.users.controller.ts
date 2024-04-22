import ChatsUsersApi, { AddChatsUsersType } from '@/api/chats/chats.users.api.ts';
import store from '@/store/Store.ts';

class ChatsUsersController {
  async addUsers(data: AddChatsUsersType) {
    try {
      const chatsUserApi = new ChatsUsersApi();
      const { response, status } = await chatsUserApi.update(data);
      console.log({ response, status });
      const statusOk = status === 200;
      if (statusOk) {
      // TODO: update current chat
      }
      return statusOk;
    } catch (e) {
      console.error(`addUsers error ${e}`);
      return false;
    }
  }

  async get(chatId: string) {
    try {
      const chatsUserApi = new ChatsUsersApi();
      const { response, status } = await chatsUserApi.request(chatId);
      const statusOk = status === 200;
      if (statusOk) {
        store.set('activeChat.users', JSON.parse(response));
      }
      return statusOk;
    } catch (e) {
      console.error(`ChatsUsersController get  error ${e}`);
      return false;
    }
  }
}

export default new ChatsUsersController();
