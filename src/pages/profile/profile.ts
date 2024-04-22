import Block, { Props } from '@/utils/Block.ts';
import Layout from '@/layouts/default/default.ts';
import Button from '@/@core/components/btn/btn.ts';
import classes from '@/styles/common.module.scss';
import InputHelp from '@/@core/components/inputHelp/inputHelp.ts';
import store, { StoreEvents } from '@/store/Store.ts';
import AuthController from '@/controllers/Auth.controller.ts';
import RouterLink from '@/@core/components/routerLink/routerLink.ts';
import HomeLink from '@/components/links/homeLink.ts';
import resourceUrl from '@/utils/resourceUrl.ts';
import profileTmpl from './profile.tmpl.ts';

const btnClasses = [classes.btn_danger, classes.mb0, classes.mt1].join(' ');

const logoutBtn = new Button({ text: 'Выйти из профиля', class: btnClasses }, [
  { event: 'click', callback: logoutHandle },
]);

const changeLink = new RouterLink({ to: '/profile-edit', text: 'Изменить' });

const helper = new InputHelp({});
class Profile extends Block {
  constructor(props: Props) {
    super(
      props,
      profileTmpl,
      'div',
      [
        changeLink,
        logoutBtn,
        new HomeLink(),
        helper,
      ],
    );
    const path: string = 'user';
    const event = `${StoreEvents.Updated}:${path}`;
    store.on(event, () => {
      const { user } = store.getState();
      if (!user) {
        return;
      }
      this.setProps({
        login: user.login,
        avatar: resourceUrl(user.avatar),
        displayName: user.display_name,
      });
    });
  }
}
const profile = new Profile(
  {},
);

async function logoutHandle() {
  helper.setProps({ helpText: '' });
  logoutBtn.setProps({ disabled: 'disabled' });
  const res = await AuthController.logout();
  if (res) {
    return;
  }
  logoutBtn.setProps({ disabled: '' });
  helper.setProps({ helpText: 'Ошибка выхода из аккаунта' });
}

const profilePage = new Layout({}, [profile]);

export default profilePage;
