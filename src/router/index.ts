import registrationPage from '@/pages/registration/registration.ts';
import profileEditPage from '@/pages/profile-edit/profileEdit.ts';
import passwordEditPage from '@/pages/password-edit/passwordEdit.ts';
import error404Page from '@/pages/error404/error404.ts';
import error500Page from '@/pages/error500/error500.ts';
import profilePage from '@/pages/profile/profile.ts';
import chatPage from '@/pages/chat/chat.ts';
import loginPage from '@/pages/login/login.ts';

import Router from '@/router/Router.ts';
import addChatPage from '@/pages/addChat/addChat.ts';
import addUserToChatPage from '@/pages/addUserToChat/addUserToChat.ts';

const router = new Router();

router
  .use('/login', loginPage)
  .use('/profile', profilePage)
  .use('/profile-edit', profileEditPage)
  .use('/password-edit', passwordEditPage)
  .use('/error400', error404Page)
  .use('/error500', error500Page)
  .use('/registration', registrationPage)
  .use('/add-chat', addChatPage)
  .use('/add-user-to-chat', addUserToChatPage)
  .use('/', chatPage);

export default router;
