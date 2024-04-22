import Block from '@/utils/Block.ts';
import Title from '@/@core/components/title/title.ts';
import LoginCreate from '@/components/fields/LoginField.ts';
import PasswordCreate from '@/components/fields/PasswordField.ts';
import Btn from '@/@core/components/btn/btn.ts';
import registrationTmpl from '@/pages/registration/registration.tmpl.ts';
import validateForm from '@/utils/validateForm.ts';
import FirstNameField from '@/components/fields/FirstNameField.ts';
import LastNameField from '@/components/fields/LastNameField.ts';
import EmailField from '@/components/fields/EmailField.ts';
import PhoneField from '@/components/fields/PhoneField.ts';
import getFormData from '@/utils/getFormData.ts';
import Layout from '@/layouts/default/default.ts';
import AuthController from '@/controllers/Auth.controller.ts';
import InputHelp from '@/@core/components/inputHelp/inputHelp.ts';
import router from '@/router/index.ts';
import RouterLink from '@/@core/components/routerLink/routerLink.ts';

const formHelp = new InputHelp({});
const regBtn = new Btn({ text: 'Зарегистрироваться' });

const form = new Block(
  { name: 'registrationForm' },
  registrationTmpl,
  'form',
  [
    new Title({ text: 'Регистрация' }),
    FirstNameField(),
    LastNameField(),
    LoginCreate(),
    EmailField(),
    PasswordCreate(),
    PhoneField(),
    regBtn,
    new RouterLink({ to: '/login', text: 'Войти в аккаунт' }),
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
  const formData = getFormData(form);
  regBtn.setProps({ disabled: 'disabled' });
  const regSuccess = await AuthController.singnup(formData);
  if (!regSuccess) {
    formHelp.setProps({ helpText: 'Ошибка регистрации' });
  }
  if (regSuccess) {
    await AuthController.fetchUser();
    router.go('/');
  }
  regBtn.setProps({ disabled: '' });
}

const registrationPage = new Layout({}, [form]);

export default registrationPage;
