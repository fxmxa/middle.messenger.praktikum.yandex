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
import store from '@/store/Store.ts';

await AuthController.fetchUser();

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
  .use('/', chatPage)
  .start();

setTimeout(() => {
  const state = store.getState();
  console.log('state', state);
}, 3000);
