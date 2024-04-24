import './src/styles/main.scss';
import AuthController from '@/controllers/Auth.controller.ts';
import loginPage from '@/pages/login/login.ts';
import profilePage from '@/pages/profile/profile.ts';
import profileEditPage from '@/pages/profile-edit/profileEdit.ts';
import passwordEditPage from '@/pages/password-edit/passwordEdit.ts';
import error404Page from '@/pages/error404/error404.ts';
import error500Page from '@/pages/error500/error500.ts';
import registrationPage from '@/pages/registration/registration.ts';
import addChatPage from '@/pages/addChat/addChat.ts';
import addUserToChatPage from '@/pages/addUserToChat/addUserToChat.ts';
import chatPage from '@/pages/chat/chat.ts';
import router from '@/router/router.ts';

await AuthController.fetchUser();

router
  .use('/', loginPage)
  .use('/settings', profilePage)
  .use('/settings-edit', profileEditPage)
  .use('/password-edit', passwordEditPage)
  .use('/error400', error404Page)
  .use('/error500', error500Page)
  .use('/sign-up', registrationPage)
  .use('/add-chat', addChatPage)
  .use('/add-user-to-chat', addUserToChatPage)
  .use('/messenger', chatPage)
  .start();
