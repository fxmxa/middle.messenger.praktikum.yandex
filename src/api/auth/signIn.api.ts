import BaseApi from '@/api/base.api.ts';
import { HTTPTransport } from '@/utils/HTTPTransport.ts';

export type SignInDataType = {
  login: string
  password: string
}

const request = new HTTPTransport();
export default class SignInApi extends BaseApi<SignInDataType> {
  async create(data: SignInDataType): Promise<any> {
    const response = await request.post({ data }, '/auth/signin');
    return response;
  }
}
