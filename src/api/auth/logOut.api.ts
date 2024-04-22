import BaseApi from '@/api/base.api.ts';
import { HTTPTransport } from '@/utils/HTTPTransport.ts';

type ClassType = {

}

const request = new HTTPTransport();
export default class LogOutApi extends BaseApi<ClassType> {
  async create(): Promise<any> {
    const response = await request.post({}, '/auth/logout');
    return response;
  }
}
