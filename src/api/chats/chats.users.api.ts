import BaseApi from '@/api/base.api.ts';
import { HTTPTransport } from '@/utils/HTTPTransport/HTTPTransport.ts';

export type ChatsUsersType = {
  users: Array<number>
  chatId: number
}

const request = new HTTPTransport();
class ChatsUsersApi extends BaseApi<ChatsUsersType> {
  async request(id: string) {
    const response = await request.get({ }, `/chats/${id}/users`);
    return response;
  }

  async delete(data: ChatsUsersType) {
    const response = await request.delete({ data }, '/chats/users');
    return response;
  }

  async update(data: ChatsUsersType) {
    const response = await request.put({ data }, '/chats/users');
    return response;
  }
}

export default ChatsUsersApi;
