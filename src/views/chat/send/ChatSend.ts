import Block from '@/utils/block/Block.ts';
import chatSendTmpl from '@/views/chat/send/ChatSend.tmpl.ts';
import Button from '@/@core/components/btn/btn.ts';
import MessageField from '@/components/fields/MessageField.ts';
import validateForm from '@/utils/validateForm.ts';
import getFormData from '@/utils/getFormData.ts';
import ChatsController from '@/controllers/Chats.controller.ts';

const messageField = MessageField();

const chatSend = new Block(
  {},
  chatSendTmpl,
  'form',
  [
    messageField,
    new Button({ text: 'Отправить' }),
  ],
  [{ event: 'submit', callback: onSend }],
);

function onSend(e: Event) {
  e.preventDefault();

  const hasError = validateForm(chatSend);

  if (hasError) {
    return;
  }
  const formData: {message: string} = getFormData(chatSend);

  ChatsController.sendTextMessage(formData.message);

  messageField.clearInput();
}

export default chatSend;
