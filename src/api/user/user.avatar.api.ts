import BaseApi from '@/api/base.api.ts';
import { HTTPTransport } from '@/utils/HTTPTransport/HTTPTransport.ts';

const request = new HTTPTransport();
class UserAvatarApi extends BaseApi {
  update(data: FormData) {
    return request.put({ data }, '/user/profile/avatar');
  }
}

export default UserAvatarApi;
