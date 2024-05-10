import BaseApi from '@/api/base.api.ts';
import { HTTPTransport } from '@/utils/HTTPTransport/HTTPTransport.ts';

export type SignInDataType = {
  login: string
  password: string
}

const request = new HTTPTransport();
export default class AuthUserApi extends BaseApi<unknown> {
  async request() {
    const response = await request.get({}, '/auth/user');
    return response;
  }
}
