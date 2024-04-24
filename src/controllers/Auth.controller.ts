import AuthUserApi from '@/api/auth/auth.user.api.ts';
import store from '@/store/Store.ts';
import AuthSignupApi, { SignupDataType } from '@/api/auth/auth.signup.api.ts';
import AuthLogOutApi from '@/api/auth/auth.logOut.api.ts';
import router from '@/router/router.ts';
import { UserResponseType } from '@/types/user.ts';

class AuthController {
  fetching = false;

  async fetchUser() {
    if (this.fetching || store.getState().user) {
      return;
    }
    this.fetching = true;
    const userApi = new AuthUserApi();
    const { ok, json } = await userApi.request();
    if (ok) {
      store.set('user', <UserResponseType>json());
    } else {
      router.go('/login');
    }
    this.fetching = false;
  }

  async singnup(payload: SignupDataType) {
    if (this.fetching) {
      return false;
    }
    this.fetching = true;
    const singupApi = new AuthSignupApi();
    const { ok } = await singupApi.create(payload);
    this.fetching = false;
    return ok;
  }

  async logout(): Promise<boolean> {
    const logoutApi = new AuthLogOutApi();
    const { ok } = await logoutApi.create();
    if (ok) {
      store.set('user', undefined);
      router.go('/login');
      return true;
    }
    return false;
  }
}

export default new AuthController();
