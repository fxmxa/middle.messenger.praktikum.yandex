import Block, { Props } from '@/utils/Block.ts';
import BtnGroup from '@/@core/components/btnGroup/btnGroup.ts';
import Button from '@/@core/components/btn/btn.ts';
import common from '@/styles/common.module.scss';
import Title from '@/@core/components/title/title.ts';
import Field from '@/@core/components/field/field.ts';
import loginCreate from '@/components/fields/LoginField.ts';
import AvatarUpload from '@/components/fileUpload/avatarUpload.ts';
import FirstNameField from '@/components/fields/FirstNameField.ts';
import LastNameField from '@/components/fields/LastNameField.ts';
import EmailField from '@/components/fields/EmailField.ts';
import PhoneField from '@/components/fields/PhoneField.ts';
import validateForm from '@/utils/validateForm.ts';
import getFormData from '@/utils/getFormData.ts';
import Layout from '@/layouts/default/default.ts';
import store, { StoreEvents } from '@/store/Store.ts';
import RouterLink from '@/@core/components/routerLink/routerLink.ts';
import router from '@/router/router.ts';
import HomeLink from '@/components/links/homeLink.ts';
import userController from '@/controllers/User.controller.ts';
import InputHelp from '@/@core/components/inputHelp/inputHelp.ts';
import resourceUrl from '@/utils/resourceUrl.ts';
import { UpdateProfilePayload } from '@/api/user/userProfile.api.ts';
import profileEditTmpl from './profileEdit.tmpl.ts';

const cancelClasses = [common.mr1, common.btn_secondary].join(' ');

const firstName = FirstNameField();
const lastName = LastNameField();
const login = loginCreate();
const displayName = new Field({
  label: 'Отображаемое имя', value: '', id: 'display_name', type: 'text',
});
const email = EmailField();
const phone = PhoneField();
const avatar = new AvatarUpload({
  label: 'Загрузить аватар', id: 'avatar-upload', avatar: '/avatar-default.png',
});

const saveBtn = new Button({ text: 'Сохранить' });

const formHelpText = new InputHelp();

class ProfileEdit extends Block {
  constructor(props: Props) {
    super(
      props,
      profileEditTmpl,
      'form',
      [
        new Title({ text: 'Настройки профиля' }),
        avatar,
        firstName,
        lastName,
        displayName,
        login,
        email,
        phone,
        new BtnGroup({}, [
          new Button(
            { text: 'Отмена', class: cancelClasses, type: 'button' },
            [{ event: 'click', callback: cancelProfileEdit }],
          ),
          saveBtn,
        ]),
        new RouterLink({ to: '/password-edit', text: 'Изменить пароль' }),
        new HomeLink(),
        formHelpText,

      ],
      [{ event: 'submit', callback: onSubmit }],
    );

    const path: string = 'user';
    const event = `${StoreEvents.Updated}:${path}`;
    store.on(event, () => {
      const { user } = store.getState();
      if (!user) {
        return;
      }
      // TODO: path
      firstName.input.setProps({ value: user.first_name });
      lastName.input.setProps({ value: user.second_name });
      login.input.setProps({ value: user.login });
      displayName.input.setProps({ value: user?.display_name ?? '' });
      email.input.setProps({ value: user.email });
      phone.input.setProps({ value: user.phone });
      avatar.setProps({ avatar: resourceUrl(user.avatar) });
    });
  }
}

const form = new ProfileEdit({});

function cancelProfileEdit() {
  router.go('/profile');
}

async function onSubmit(e: Event) {
  e.preventDefault();

  const hasError = validateForm(form);

  if (hasError) {
    return;
  }
  formHelpText.setProps({ helpText: '' });
  saveBtn.setProps({ disabled: 'disabled' });

  const file = (avatar.input.getContent() as HTMLInputElement).files?.[0];
  let avatarUpdated = true;
  if (file) {
    const formData = new FormData();
    formData.append('avatar', file);
    avatarUpdated = await userController.updateAvatar(formData);
  }

  const data: UpdateProfilePayload = getFormData(form);
  const updateSuccess = await userController.updateProfile(data);
  if (updateSuccess && avatarUpdated) {
    formHelpText.setProps({ helpText: 'Профиль успешно обновлен!' });
  }
  if (!updateSuccess) {
    formHelpText.setProps({ helpText: 'Ошибка обновления профиля!' });
  }
  saveBtn.setProps({ disabled: '' });
}

const profileEditPage = new Layout({}, [form]);

export default profileEditPage;
