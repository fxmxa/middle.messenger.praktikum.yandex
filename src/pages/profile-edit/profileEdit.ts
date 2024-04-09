import Block from '@/utils/Block.ts';
import BtnGroup from '@/@core/components/btnGroup/btnGroup.ts';
import Button from '@/@core/components/btn/btn.ts';
import common from '@/styles/common.module.scss';
import Title from '@/@core/components/title/title.ts';
import Field from '@/@core/components/field/field.ts';
import loginCreate from '@/components/fields/LoginField.ts';
import Link from '@/@core/components/link/link.ts';
import AvatarUpload from '@/components/fileUpload/avatarUpload.ts';
import FirstNameField from '@/components/fields/FirstNameField.ts';
import LastNameField from '@/components/fields/LastNameField.ts';
import EmailField from '@/components/fields/EmailField.ts';
import PhoneField from '@/components/fields/PhoneField.ts';
import validateForm from '@/utils/validateForm.ts';
import getDataForm from '@/utils/getDataForm.ts';
import Layout from '@/layouts/default/default.ts';
import profileEditTmpl from './profileEdit.tmpl.ts';

const cancelClasses = [common.mr1, common.btn_secondary].join(' ');

const form = new Block(
  {},
  profileEditTmpl,
  'form',
  [
    new Title({ text: 'Настройки профиля' }),
    new AvatarUpload({
      label: 'Загрузить аватар', id: 'avatar-upload', avatar: '/avatar-default.png',
    }),
    FirstNameField('Михаил'),
    LastNameField('Костиков'),
    new Field({
      label: 'Отображаемое имя', value: 'Михаил Костиков', id: 'display_name', type: 'text',
    }),
    loginCreate('kostikovmu'),
    EmailField('kostikovmu@ya.ru'),
    PhoneField('+79773431212'),
    new BtnGroup({}, [
      new Button({ text: 'Отмена', class: cancelClasses }),
      new Button({ text: 'Сохранить' }),
    ]),
    new Link({ text: 'Изменить пароль', href: '/password-edit' }),
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

const profileEditPage = new Layout({}, [form]);

export default profileEditPage;
