import ChatsUsersApi, { ChatsUsersType } from '@/api/chats/chats.users.api.ts';
import store from '@/store/Store.ts';

export type ChatsUsersRequestResponse = Array<{
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  avatar: string
  role: string
}>
class ChatsUsersController {
  async addUsers(data: ChatsUsersType) {
    try {
      const chatsUserApi = new ChatsUsersApi();
      const { ok } = await chatsUserApi.update(data);
      return ok;
    } catch (e) {
      console.error(`addUsers error ${e}`);
      return false;
    }
  }

  async deleteUsers(data: ChatsUsersType) {
    try {
      const chatsUserApi = new ChatsUsersApi();
      const { ok } = await chatsUserApi.delete(data);
      return ok;
    } catch (e) {
      console.error(`deleteUsers error ${e}`);
      return false;
    }
  }

  async get(chatId: string) {
    try {
      const chatsUserApi = new ChatsUsersApi();
      const { ok, json } = await chatsUserApi.request(chatId);
      if (ok) {
        const users = json() as ChatsUsersRequestResponse;
        store.set('activeChat.users', users);
      }
      return ok;
    } catch (e) {
      console.error(`ChatsUsersController get  error ${e}`);
      return false;
    }
  }
}

export default new ChatsUsersController();
