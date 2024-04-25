import Block from '@/utils/Block.ts';
import Button from '@/@core/components/btn/btn.ts';
import Title from '@/@core/components/title/title.ts';
import Layout from '@/layouts/default/default.ts';
import router from '@/router/router.ts';
import InputHelp from '@/@core/components/inputHelp/inputHelp.ts';
import HomeLink from '@/components/links/homeLink.ts';
import store from '@/store/Store.ts';
import removeUserFromChatTmpl from '@/pages/removeUserFromChat/removeUserFromChat.tmpl.ts';
import Select from '@/@core/components/select/select.ts';
import ChatsUsersController from '@/controllers/Chats.users.controller.ts';
import ChatsController from '@/controllers/Chats.controller.ts';

const usersSelect = new Select({ multiple: 'multiple', name: 'users' });
const formHelp = new InputHelp({});
const submitButton = new Button({ text: 'Удалить' });

const form = new Block(
  { name: 'removeUserFromChat' },
  removeUserFromChatTmpl,
  'form',
  [
    new Title({ text: 'Удаление пользователей из чата' }),
    usersSelect,
    submitButton,
    new HomeLink(),
    formHelp,
  ],

  [{ event: 'submit', callback: addChatHandle }],
);
async function addChatHandle(e: Event) {
  e.preventDefault();

  submitButton.setProps({ disabled: 'disabled' });

  const options = (usersSelect.getContent() as HTMLSelectElement).selectedOptions;
  const users = [...options].map(({ value }) => +value);

  if (!users.length) {
    formHelp.setProps({ helpText: 'Не выбраны пользователи' });
    return;
  }

  const chatId = store.getState()?.activeChat?.id;

  if (!chatId) {
    formHelp.setProps({ helpText: 'Ошибка активного чата' });
    return;
  }

  const deleteResult = await ChatsUsersController.deleteUsers({ chatId, users });

  if (deleteResult) {
    const getUsersResult = await ChatsUsersController.get(chatId.toString());
    if (!getUsersResult) {
      store.set('activeChat', []);
      store.set('activeChat.messages', []);
      store.set('activeChat.id', undefined);
      await ChatsController.getChats();
    }
    router.go('/messenger');
    formHelp.setProps({ helpText: '' });
  } else {
    formHelp.setProps({ helpText: 'Ошибка удаления пользователей' });
  }
  submitButton.setProps({ disabled: '' });
}
const removeUserFromChatPage = new Layout({}, [form]);
export default removeUserFromChatPage;
