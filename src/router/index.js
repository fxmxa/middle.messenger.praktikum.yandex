import profile from "@/pages/profile/profile.js";

const url = new URL(document.URL)
import login from "@/pages/login/login.js";
import registration from "@/pages/registration/registration.js";
import profileEdit from "@/pages/profile-edit/profileEdit.js";
import passwordEdit from "@/pages/password-edit/passwordEdit.js";
import error404 from "@/pages/error404/error404.js";
import error500 from "@/pages/error500/error500.js";
import userProfile from "@/pages/profile/profile.js";
import messenger from "@/pages/messenger/messenger.js"

const params = new URLSearchParams(url.search);
const pageName = params.get('page') || 'messenger'

const pages = {
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
