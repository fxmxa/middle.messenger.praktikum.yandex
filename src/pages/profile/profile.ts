import Block from '@/utils/Block.ts';
import Layout from '@/layouts/default/default.ts';
import profileTmpl from './profile.tmpl.ts';

const profile = new Block(
  { fullName: 'Костиков Михаил', userName: '@kostikovmu', avatar: '/avatar-default.png' },
  profileTmpl,
);

const profilePage = new Layout({}, [profile]);

export default profilePage;
