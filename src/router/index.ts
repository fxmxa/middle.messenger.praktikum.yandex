import login from '@/pages/login/login.ts';
import registration from '@/pages/registration/registration.ts';
import profileEdit from '@/pages/profile-edit/profileEdit.ts';
import passwordEdit from '@/pages/password-edit/passwordEdit.ts';
import error404 from '@/pages/error404/error404.ts';
import error500 from '@/pages/error500/error500.ts';
import userProfile from '@/pages/profile/profile.ts';
import messenger from '@/pages/messenger/messenger.ts';
import has from 'has';

const url: URL = new URL(document.URL);

const params: URLSearchParams = new URLSearchParams(url.search);
const pageName: string = params.get('page') || 'messenger';

const pages: Record<string, any> = {
  messenger,
  login,
  registration,
  'profile-edit': profileEdit,
  'password-edit': passwordEdit,
  error404,
  error500,
  profile: userProfile,
};

const pageTmpl = has(pages, pageName) ? pages[pageName] : pages.error404;
export default pageTmpl;
