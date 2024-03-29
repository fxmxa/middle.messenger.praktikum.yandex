import Block from '@/utils/Block.ts';
import chatContactsTmpl from '@/views/chat/contacts/ChatContacts.tmpl.ts';
import ChatContact from '@/views/chat/contact/ChatContact.ts';

const contactsFromServer = [
  {
    avatar: '/avatar-default.png',
    name: 'Морфиус',
    message: 'Привет как дела',
  },
  {
    avatar: '/avatar-default.png',
    name: 'Тринити',
    message: 'Ура!!! Чат работает!!!',
  },
];

const contactList = contactsFromServer.map((el) => new ChatContact(el));

const chatContacts = new Block({}, chatContactsTmpl, 'div', contactList);

export default chatContacts;
