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

export type NewWsPayloadType = {
  chatToken: string
  chatId: number
  userId: number
}

const request = new HTTPTransport();
class ChatsApi extends BaseApi<ChatsCreateDataType, ChatsRequestDataType> {
  async request(data:ChatsRequestDataType) {
    const response = await request.get({ data }, '/chats');
    return response;
  }

  async create(data: ChatsCreateDataType) {
    const response = await request.post({ data }, '/chats');
    return response;
  }

  newWs(data: NewWsPayloadType) {
    const baseUrl = 'wss://ya-praktikum.tech/ws';
    const { userId, chatToken, chatId } = data;
    const socket = new WebSocket(`${baseUrl}/chats/${userId}/${chatId}/${chatToken}`);

    return socket;
  }
}

export default ChatsApi;
