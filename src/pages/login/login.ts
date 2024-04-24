import Block from '@/utils/Block.ts';
import Button from '@/@core/components/btn/btn.ts';
import Title from '@/@core/components/title/title.ts';
import LoginCreate from '@/components/fields/LoginField.ts';
import PasswordCreate from '@/components/fields/PasswordField.ts';
import validateForm from '@/utils/validateForm.ts';
import getFormData from '@/utils/getFormData.ts';
import Layout from '@/layouts/default/default.ts';
import router from '@/router/router.ts';
import InputHelp from '@/@core/components/inputHelp/inputHelp.ts';
import RouterLink from '@/@core/components/routerLink/routerLink.ts';
import UserController from '@/controllers/User.controller.ts';
import AuthController from '@/controllers/Auth.controller.ts';
import ChatsController from '@/controllers/Chats.controller.ts';
import { SignInDataType } from '@/api/auth/auth.signIn.api.ts';
import loginTmpl from './login.tmpl.ts';

const formHelp = new InputHelp({});
const submitButton = new Button({ text: 'Войти' });

const form = new Block(
  { name: 'loginForm' },
  loginTmpl,
  'form',
  [
    new Title({ text: 'Авторизация' }),
    LoginCreate(),
    PasswordCreate(),
    submitButton,
    new RouterLink({ to: '/registration', text: 'Создать аккаунт' }),
    formHelp,
  ],
  [{ event: 'submit', callback: onSubmit }],
);

async function onSubmit(e: Event) {
  e.preventDefault();
  formHelp.setProps({ helpText: '' });

  const hasError = validateForm(form);

  if (hasError) {
    return;
  }
  submitButton.setProps({ disabled: 'disabled' });

  const formData: SignInDataType = getFormData(form);
  const loginStatus = await UserController.signIn(formData);

  if (loginStatus) {
    await AuthController.fetchUser();
    await ChatsController.getChats();
    router.go('/');
    return;
  }
  formHelp.setProps({ helpText: 'Не верный логин или пароль' });
  submitButton.setProps({ disabled: '' });
}
const loginPage = new Layout({}, [form]);
export default loginPage;
