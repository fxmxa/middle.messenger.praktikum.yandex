import BaseApi from '@/api/base.api.ts';
import { HTTPTransport } from '@/utils/HTTPTransport/HTTPTransport.ts';

export type UserSearchPayload = {
  login: string
}

const request = new HTTPTransport();

class UserSearchApi extends BaseApi<UserSearchPayload> {
  async create(data: UserSearchPayload) {
    const response = await request.post({
      data,
    }, '/user/search');
    return response;
  }
}

export default UserSearchApi;
