const url = new URL(document.URL)
import login from "@/pages/login/login.ts";
import registration from "@/pages/registration/registration.ts";
import profileEdit from "@/pages/profile-edit/profileEdit.ts";
import passwordEdit from "@/pages/password-edit/passwordEdit.ts";
import error404 from "@/pages/error404/error404.ts";
import error500 from "@/pages/error500/error500.ts";
import userProfile from "@/pages/profile/profile.ts";
import messenger from "@/pages/messenger/messenger.ts"

const params: URLSearchParams = new URLSearchParams(url.search);
const pageName: string = params.get('page') || 'messenger'

const pages: Record<string, string> = {
    'messenger': messenger,
    'login': login,
    'registration': registration,
    'profile-edit': profileEdit,
    'password-edit': passwordEdit,
    'error404': error404,
    'error500': error500,
    'profile': userProfile,
}

const pageTmpl = pages.hasOwnProperty(pageName) ? pages[pageName]: pages['error404']
export default pageTmpl
