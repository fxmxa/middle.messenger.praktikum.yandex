import Block from '@/utils/Block.ts';
import Button from '@/@core/components/btn/btn.ts';
import Title from '@/@core/components/title/title.ts';
import validateForm from '@/utils/validateForm.ts';
import getFormData from '@/utils/getFormData.ts';
import Layout from '@/layouts/default/default.ts';
import router from '@/router/router.ts';
import InputHelp from '@/@core/components/inputHelp/inputHelp.ts';
import HomeLink from '@/components/links/homeLink.ts';
import addChatTmpl from '@/pages/addChat/addChat.tmpl.ts';
import UserController from '@/controllers/User.controller.ts';
import store from '@/store/Store.ts';
import ChatsUsersController from '@/controllers/Chats.users.controller.ts';
import loginField from '@/components/fields/LoginField.ts';
import { UserSearchPayload } from '@/api/user/user.search.api.ts';

const formHelp = new InputHelp({});
const submitButton = new Button({ text: 'Добавить' });

// TODO: add logic to add user from add chat
const form = new Block(
  { name: 'loginForm' },
  addChatTmpl,
  'form',
  [
    new Title({ text: 'Добавить пользователя в чат' }),
    loginField(),
    submitButton,
    new HomeLink(),
    formHelp,
  ],
  [{ event: 'submit', callback: addChatHandle }],
);
async function addChatHandle(e: Event) {
  e.preventDefault();
  formHelp.setProps({ helpText: '' });

  const hasError = validateForm(form);

  if (hasError) {
    return;
  }
  submitButton.setProps({ disabled: 'disabled' });

  const formData: UserSearchPayload = getFormData(form);

  const searchSuccess = await UserController.search(formData);

  if (!searchSuccess) {
    formHelp.setProps({ helpText: 'Не верный логин' });
    return;
  }
  const { usersFound } = store.getState();

  if (!usersFound || usersFound.length === 0) {
    formHelp.setProps({ helpText: 'Пользователь не найден' });
    return;
  }
  const user = usersFound.find((el) => el.login === formData.login);

  if (!user) {
    formHelp.setProps({ helpText: 'Пользователь не найден' });
    return;
  }

  const chatId = store.getState()?.activeChat?.id;

  if (chatId === undefined) {
    formHelp.setProps({ helpText: 'Ошибка активного чата' });
    return;
  }

  const addUserStatus = await ChatsUsersController.addUsers({ users: [user.id], chatId });

  submitButton.setProps({ disabled: '' });
  if (!addUserStatus) {
    formHelp.setProps({ helpText: 'Ошибка добавления пользователя' });
    return;
  }
  formHelp.setProps({ helpText: '' });

  await ChatsUsersController.get(chatId.toString());
  router.go('/');
}
const addUserToChatPage = new Layout({}, [form]);
export default addUserToChatPage;
