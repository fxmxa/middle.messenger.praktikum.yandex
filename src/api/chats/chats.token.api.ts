import BaseApi from '@/api/base.api.ts';
import { HTTPTransport } from '@/utils/HTTPTransport.ts';

export type ChatsCreateDataType = {
  title: string
}

export type ChatsRequestDataType = {
  offset?: number
  limit?: number
  title?: string
}

const request = new HTTPTransport();
class ChatsTokenApi extends BaseApi {
  async create(id: number) {
    const response = await request.post({ }, `/chats/token/${id}`);
    return response;
  }
}

export default ChatsTokenApi;
