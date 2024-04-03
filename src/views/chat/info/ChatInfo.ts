import Block from '@/utils/Block.ts';
import chatInfoTmpl from '@/views/chat/info/ChatInfo.tmpl.ts';
import Contact from '@/views/chat/contact/ChatContact.ts';

const chatInfo = new Block({}, chatInfoTmpl, 'div', [new Contact({
  avatar: '/avatar-default.png',
  name: 'Морфиус',
  message: 'Был недавно',
})]);

export default chatInfo;
