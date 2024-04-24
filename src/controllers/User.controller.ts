import UserProfileApi, { UpdateProfilePayload } from '@/api/user/userProfile.api.ts';
import store from '@/store/Store.ts';
import UserPasswordApi, { UserPasswordPayload } from '@/api/user/user.password.api.ts';
import UserAvatarApi from '@/api/user/user.avatar.api.ts';
import UserSearchApi, { UserSearchPayload } from '@/api/user/user.search.api.ts';
import { UserResponseType } from '@/types/user.ts';

class UserController {
  async updateProfile(data: UpdateProfilePayload): Promise<boolean> {
    try {
      const profileApi = new UserProfileApi();
      const { ok, json } = await profileApi.update(data);
      if (ok) {
        const user = json();
        store.set('user', user);
      }
      return ok;
    } catch (e) {
      console.error('updateProfile error', e);
      return false;
    }
  }

  async updatePassword(data: UserPasswordPayload): Promise<boolean> {
    try {
      const passwordApi = new UserPasswordApi();
      const { ok } = await passwordApi.update(data);
      return ok;
    } catch (e) {
      console.error('updatePassword error ', e);
      return false;
    }
  }

  async updateAvatar(data: FormData) {
    try {
      const userAvatarApi = new UserAvatarApi();
      const { ok } = await userAvatarApi.update(data);
      return ok;
    } catch (e) {
      console.error('updateAvatar error ', e);
      return false;
    }
  }

  async search(data: UserSearchPayload) {
    try {
      const userSearchApi = new UserSearchApi();
      const { ok, json } = await userSearchApi.create(data);
      if (ok) {
        const usersFound: UserResponseType[] = json();
        store.set('usersFound', usersFound);
      }
      return ok;
    } catch (e) {
      console.error('search error ', e);
      return false;
    }
  }
}

export default new UserController();
