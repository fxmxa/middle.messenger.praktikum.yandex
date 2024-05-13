import BaseApi from '@/api/base.api.ts';
import { HTTPTransport } from '@/utils/HTTPTransport/HTTPTransport.ts';

export type UserPasswordPayload = {
  oldPassword: string
  newPassword: string
}

const request = new HTTPTransport();

class UserPasswordApi extends BaseApi<UserPasswordPayload> {
  async update(data: UserPasswordPayload) {
    const response = await request.put({ data }, '/user/password');
    return response;
  }
}

export default UserPasswordApi;
