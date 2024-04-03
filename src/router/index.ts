import login from '@/pages/login/login.ts';
import registration from '@/pages/registration/registration.ts';
import profileEdit from '@/pages/profile-edit/profileEdit.ts';
import passwordEdit from '@/pages/password-edit/passwordEdit.ts';
import error404 from '@/pages/error404/error404.ts';
import error500 from '@/pages/error500/error500.ts';
import userProfile from '@/pages/profile/profile.ts';
import has from 'has';
import Layout from '@/layouts/default/default.ts';
import chat from '@/pages/chat/chat.ts';

const url: URL = new URL(document.URL);

const params: URLSearchParams = new URLSearchParams(url.search);
const pageName: string = params.get('page') || 'chat';

const pages: Record<string, any> = {
  chat,
  login,
  registration,
  'profile-edit': profileEdit,
  'password-edit': passwordEdit,
  error404,
  error500,
  profile: userProfile,
};

const pageElement = has(pages, pageName) ? pages[pageName] : pages.error404;

const layout = new Layout({}, [pageElement]);

document.title = pageName;

export default layout;
