import BaseApi from '@/api/base.api.ts';
import { HTTPTransport } from '@/utils/HTTPTransport.ts';

export type SignupDataType = {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

const request = new HTTPTransport();
export default class AuthSignupApi extends BaseApi<SignupDataType> {
  async create(data: SignupDataType): Promise<any> {
    const response = await request.post({ data }, '/auth/signup');
    return response;
  }
}
