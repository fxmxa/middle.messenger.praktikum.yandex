import AuthUserApi from '@/api/auth/auth.user.api.ts';
import store from '@/store/Store.ts';
import AuthSignupApi, { SignupDataType } from '@/api/auth/auth.signup.api.ts';
import AuthLogOutApi from '@/api/auth/auth.logOut.api.ts';
import router from '@/router/router.ts';
import { UserResponseType } from '@/types/user.ts';
import AuthSignInApi, { SignInDataType } from '@/api/auth/auth.signIn.api.ts';

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
      router.go('/');
    }
    this.fetching = false;
  }

  async signIn(data: SignInDataType): Promise<boolean> {
    try {
      const signInApi = new AuthSignInApi();
      const { ok, json, status } = await signInApi.create(data);
      if (!ok && status === 400) {
        const { reason } = json() as {reason: string};
        if (reason === 'User already in system') {
          return true;
        }
      }
      return ok;
    } catch (e) {
      console.error('signIn error ', e);
      return false;
    }
  }

  async singnup(payload: SignupDataType) {
    if (this.fetching) {
      return false;
    }
    this.fetching = true;
    const singupApi = new AuthSignupApi();
    const { ok, json, status } = await singupApi.create(payload);
    if (!ok && status === 400) {
      const { reason } = json() as {reason: string};
      if (reason === 'User already in system') {
        this.fetching = false;
        return true;
      }
    }
    this.fetching = false;
    return ok;
  }

  async logout(): Promise<boolean> {
    const logoutApi = new AuthLogOutApi();
    const { ok } = await logoutApi.create();
    if (ok) {
      store.set('user', undefined);
      router.go('/');
      return true;
    }
    return false;
  }
}

export default new AuthController();
