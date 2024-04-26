import BaseApi from '@/api/base.api.ts';
import { HTTPTransport } from '@/utils/HTTPTransport.ts';

export type UpdateProfilePayload = {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
}

const request = new HTTPTransport();

class UserProfileApi extends BaseApi<UpdateProfilePayload> {
  async update(data: UpdateProfilePayload) {
    const response = await request.put({
      data,
    }, '/user/profile');
    return response;
  }
}

export default UserProfileApi;
