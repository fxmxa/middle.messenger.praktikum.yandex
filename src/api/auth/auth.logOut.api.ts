import BaseApi from '@/api/base.api.ts';
import { HTTPTransport } from '@/utils/HTTPTransport.ts';

const request = new HTTPTransport();
export default class AuthLogOutApi extends BaseApi {
  async create() {
    const response = await request.post({}, '/auth/logout');
    return response;
  }
}
