import UserApi from '@/api/auth/user.api.ts';
import store from '@/store/Store.ts';
import SignupApi, { SignupDataType } from '@/api/auth/signup.api.ts';
import LogOutApi from '@/api/auth/logOut.api.ts';
import router from '@/router/index.ts';

class AuthController {
  fetching = false;

  async fetchUser() {
    if (this.fetching || store.getState().user) {
      return;
    }
    this.fetching = true;
    const userApi = new UserApi();
    const userResponse = await userApi.request();
    const { response, status } = userResponse;
    if (status === 200) {
      store.set('user', JSON.parse(response));
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
    const singupApi = new SignupApi();
    const singupResponse = await singupApi.create(payload);
    const { status } = singupResponse;
    this.fetching = false;
    return status === 200;
  }

  async logout(): Promise<boolean> {
    const logoutApi = new LogOutApi();
    const logoutResponse = await logoutApi.create();
    const { status } = logoutResponse;
    const statusOk = status === 200;

    if (statusOk) {
      store.set('user', undefined);
      router.go('/login');
      return true;
    }
    return false;
  }
}

export default new AuthController();
