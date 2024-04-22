import UserProfileApi, { UpdateProfilePayload } from '@/api/user/userProfile.api.ts';
import store from '@/store/Store.ts';
import UserPasswordApi, { UserPasswordPayload } from '@/api/user/user.password.api.ts';
import UserAvatarApi from '@/api/user/user.avatar.api.ts';
import UserSearchApi, { UserSearchPayload } from '@/api/user/user.search.api.ts';
import SignInApi, { SignInDataType } from '@/api/auth/signIn.api.ts';

class UserController {
  async signIn(data: SignInDataType): Promise<boolean> {
    try {
      const signInApi = new SignInApi();
      const { status } = await signInApi.create(data);

      const statusOk = status === 200;
      return statusOk;
    } catch (e) {
      console.error('signIn error ', e);
      return false;
    }
  }

  async updateProfile(data: UpdateProfilePayload): Promise<boolean> {
    try {
      const profileApi = new UserProfileApi();
      const { response, status } = await profileApi.update(data);
      const updateSuccess = status === 200;
      if (updateSuccess) {
        store.set('user', JSON.parse(response));
      }
      return updateSuccess;
    } catch (e) {
      console.error('updateProfile error', e);
      return false;
    }
  }

  async updatePassword(data: UserPasswordPayload): Promise<boolean> {
    try {
      const passwordApi = new UserPasswordApi();
      const { status } = await passwordApi.update(data);
      return status === 200;
    } catch (e) {
      console.error('updatePassword error ', e);
      return false;
    }
  }

  async updateAvatar(data: FormData) {
    try {
      const userAvatarApi = new UserAvatarApi();
      const { status } = await userAvatarApi.update(data);
      return status === 200;
    } catch (e) {
      console.error('updateAvatar error ', e);
      return false;
    }
  }

  async search(data: UserSearchPayload) {
    try {
      const userSearchApi = new UserSearchApi();
      const { status, response } = await userSearchApi.create(data);
      const statusOk = status === 200;
      if (statusOk) {
        store.set('usersFound', JSON.parse(response));
      }
      return statusOk;
    } catch (e) {
      console.error('search error ', e);
      return false;
    }
  }
}

export default new UserController();
