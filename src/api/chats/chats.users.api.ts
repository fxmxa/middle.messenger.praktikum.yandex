import BaseApi from '@/api/base.api.ts';
import { HTTPTransport } from '@/utils/HTTPTransport.ts';

export type AddChatsUsersType = {
  users: Array<number>
  chatId: number
}

const request = new HTTPTransport();
class ChatsUsersApi extends BaseApi<AddChatsUsersType> {
  async update(data: AddChatsUsersType) {
    const response = await request.put({ data }, '/chats/users');
    return response;
  }

  async request(id: string) {
    const response = await request.get({ }, `/chats/${id}/users`);
    return response;
  }
}

export default ChatsUsersApi;
