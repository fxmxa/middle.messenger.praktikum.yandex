import Block from '@/utils/Block.ts';
import profileTmpl from './profile.tmpl.ts';

const profile = new Block(
  { fullName: 'Костиков Михаил', userName: '@kostikovmu', avatar: '/avatar-default.png' },
  profileTmpl,
);

export default profile;
