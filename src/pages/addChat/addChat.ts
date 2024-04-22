import Block from '@/utils/Block.ts';
import Button from '@/@core/components/btn/btn.ts';
import Title from '@/@core/components/title/title.ts';
import validateForm from '@/utils/validateForm.ts';
import getFormData from '@/utils/getFormData.ts';
import Layout from '@/layouts/default/default.ts';
import router from '@/router/index.ts';
import InputHelp from '@/@core/components/inputHelp/inputHelp.ts';
import HomeLink from '@/components/links/homeLink.ts';
import addChatTmpl from '@/pages/addChat/addChat.tmpl.ts';
import ChatsController from '@/controllers/Chats.controller.ts';
import chatTitleField from '@/components/fields/ChatTitleField.ts';

const formHelp = new InputHelp({});
const submitButton = new Button({ text: 'Создать' });

const form = new Block(
  { name: 'loginForm' },
  addChatTmpl,
  'form',
  [
    new Title({ text: 'Новый чат' }),
    chatTitleField(),
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

  const formData = getFormData(form);

  const addChatStatus = await ChatsController.addChat(formData);

  submitButton.setProps({ disabled: '' });
  if (!addChatStatus) {
    formHelp.setProps({ helpText: 'Ошибка создания чата' });
    return;
  }
  formHelp.setProps({ helpText: '' });

  await ChatsController.getChats();
  router.go('/');
}
const addChatPage = new Layout({}, [form]);
export default addChatPage;
