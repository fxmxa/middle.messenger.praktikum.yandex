import passwordEditTmpl from '@/pages/password-edit/passwordEdit.tmpl.ts';
import Block from '@/utils/block/Block.ts';
import Title from '@/@core/components/title/title.ts';
import passwordField from '@/components/fields/PasswordField.ts';
import Button from '@/@core/components/btn/btn.ts';
import common from '@/styles/common.module.scss';
import BtnGroup from '@/@core/components/btnGroup/btnGroup.ts';
import validateForm from '@/utils/validateForm.ts';
import getFormData from '@/utils/getFormData.ts';
import Layout from '@/layouts/default/default.ts';
import router from '@/router/router.ts';
import HomeLink from '@/components/links/homeLink.ts';
import InputHelp from '@/@core/components/inputHelp/inputHelp.ts';
import userController from '@/controllers/User.controller.ts';
import { UserPasswordPayload } from '@/api/user/user.password.api.ts';

const cancelClasses = [common.mr1, common.btn_secondary].join(' ');

const saveBtn = new Button({ text: 'Сохранить' });
const formHelpText = new InputHelp();

const form = new Block(
  { name: 'passwordEdit' },
  passwordEditTmpl,
  'form',
  [
    new Title({ text: 'Изменить пароль' }),
    passwordField('Старый пароль', 'oldPassword'),
    passwordField('Новый пароль', 'newPassword'),
    new BtnGroup({}, [
      new Button(
        { text: 'Отмена', class: cancelClasses, type: 'button' },
        [{ event: 'click', callback: cancelEdit }],
      ),
      saveBtn,
    ]),
    new HomeLink(),
    formHelpText,
  ],
  [{ event: 'submit', callback: onSubmit }],
);

function cancelEdit() {
  router.go('/settings-edit');
}

async function onSubmit(e: Event) {
  e.preventDefault();

  const hasError = validateForm(form);

  if (hasError) {
    return;
  }
  const formData: UserPasswordPayload = getFormData(form);
  formHelpText.setProps({ helpText: '' });
  saveBtn.setProps({ disabled: 'disabled' });
  const updateSuccess = await userController.updatePassword(formData);
  if (updateSuccess) {
    formHelpText.setProps({ helpText: 'Пароль успешно обновлен!' });
  }
  if (!updateSuccess) {
    formHelpText.setProps({ helpText: 'Ошибка обновления пароля!' });
  }
  saveBtn.setProps({ disabled: '' });
}

const passwordEditPage = new Layout({}, [form]);

export default passwordEditPage;
