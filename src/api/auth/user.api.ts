import BaseApi from '@/api/base.api.ts';
import { HTTPTransport } from '@/utils/HTTPTransport.ts';

export type SignInDataType = {
  login: string
  password: string
}

const request = new HTTPTransport();
export default class UserApi extends BaseApi<SignInDataType> {
  async request(): Promise<unknown> {
    try {
      const response = await request.get({ }, '/auth/user');
      return response;
    } catch (e) {
      console.error('UserApi error', e);
      return e;
    }
  }
}
