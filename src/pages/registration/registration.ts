import Block from '@/utils/Block.ts';
import Title from '@/@core/components/title/title.ts';
import LoginCreate from '@/components/fields/LoginField.ts';
import PasswordCreate from '@/components/fields/PasswordField.ts';
import Btn from '@/@core/components/btn/btn.ts';
import Link from '@/@core/components/link/link.ts';
import registrationTmpl from '@/pages/registration/registration.tmpl.ts';
import validateForm from '@/utils/validateForm.ts';
import FirstNameField from '@/components/fields/FirstNameField.ts';
import LastNameField from '@/components/fields/LastNameField.ts';
import EmailField from '@/components/fields/EmailField.ts';
import PhoneField from '@/components/fields/PhoneField.ts';
import getDataForm from '@/utils/getDataForm.ts';

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
    new Btn({ text: 'Зарегистрироваться' }),
    new Link({ href: '/?page=login', text: 'Войти в аккаунт' }),
  ],
  [{ event: 'submit', callback: onSubmit }],

);

function onSubmit(e: Event) {
  e.preventDefault();

  const hasError = validateForm(form);

  if (hasError) {
    return;
  }
  const formData = getDataForm(form);
  console.log('formData', formData);
}
export default form;
