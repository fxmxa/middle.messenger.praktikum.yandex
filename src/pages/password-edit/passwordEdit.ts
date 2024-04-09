import passwordEditTmpl from '@/pages/password-edit/passwordEdit.tmpl.ts';
import Block from '@/utils/Block.ts';
import Title from '@/@core/components/title/title.ts';
import passwordField from '@/components/fields/PasswordField.ts';
import Button from '@/@core/components/btn/btn.ts';
import common from '@/styles/common.module.scss';
import BtnGroup from '@/@core/components/btnGroup/btnGroup.ts';
import validateForm from '@/utils/validateForm.ts';
import getDataForm from '@/utils/getDataForm.ts';
import Layout from '@/layouts/default/default.ts';

const cancelClasses = [common.mr1, common.btn_secondary].join(' ');

const form = new Block(
  { name: 'passwordEdit' },
  passwordEditTmpl,
  'form',
  [
    new Title({ text: 'Изменить пароль' }),
    passwordField('Пароль', 'oldPassword'),
    passwordField('Повторите пароль', 'newPassword'),
    new BtnGroup({}, [
      new Button({ text: 'Отмена', class: cancelClasses }),
      new Button({ text: 'Сохранить' }),
    ]),
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

const passwordEditPage = new Layout({}, [form]);

export default passwordEditPage;
