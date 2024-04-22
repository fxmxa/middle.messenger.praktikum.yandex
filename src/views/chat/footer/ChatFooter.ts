import Block from '@/utils/Block.ts';
import chatFooterTmpl from '@/views/chat/footer/ChatFooter.tmpl.ts';
import RouterLink from '@/@core/components/routerLink/routerLink.ts';
import classes from '@/styles/common.module.scss';

const addChatLinkAttrs = `class="${classes.mlA}"`;
const settingsLink = new RouterLink({ text: 'Настройки', to: '/profile' });
const addChatLink = new RouterLink({ text: 'Новый чат', to: '/add-chat', attrs: addChatLinkAttrs });

const chatFooter = new Block(
  {},
  chatFooterTmpl,
  'div',
  [settingsLink, addChatLink],
);

export default chatFooter;
