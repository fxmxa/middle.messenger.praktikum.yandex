import Block from '@/utils/Block.ts';
import chatSendTmpl from '@/views/chat/send/ChatSend.tmpl.ts';
import Button from '@/@core/components/btn/btn.ts';
import MessageField from '@/components/fields/MessageField.ts';
import validateForm from '@/utils/validateForm.ts';
import getDataForm from '@/utils/getDataForm.ts';

const chatSend = new Block(
  {},
  chatSendTmpl,
  'form',
  [
    MessageField(),
    // new Input({ id: 'message', type: 'text' }),
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
  const formData = getDataForm(chatSend);
  console.log('formData', formData);
}

export default chatSend;
