import Block from '@/utils/Block.ts';
import Button from '@/@core/components/btn/btn.ts';
import Title from '@/@core/components/title/title.ts';
import Link from '@/@core/components/link/link.ts';
import LoginCreate from '@/components/fields/LoginField.ts';
import PasswordCreate from '@/components/fields/PasswordField.ts';
import validateForm from '@/utils/validateForm.ts';
import getDataForm from '@/utils/getDataForm.ts';
import loginTmpl from './login.tmpl.ts';

const form = new Block(
  { name: 'loginForm' },
  loginTmpl,
  'form',
  [
    new Title({ text: 'Авторизация' }),
    LoginCreate(),
    PasswordCreate(),
    new Button({ text: 'Войти' }),
    new Link({ href: '/?page=registration', text: 'Создать аккаунт' }),
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
