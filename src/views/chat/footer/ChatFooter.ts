import Block from '@/utils/Block.ts';
import chatFooterTmpl from '@/views/chat/footer/ChatFooter.tmpl.ts';
import RouterLink from '@/@core/components/routerLink/routerLink.ts';

const settingsLink = new RouterLink({ text: 'Настройки', to: '/profile' });

const chatFooter = new Block(
  {},
  chatFooterTmpl,
  'div',
  [settingsLink],
);

export default chatFooter;
