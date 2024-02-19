import profileEditTmpl from "./profileEdit.tmpl.ts";

import replaceTmpl from "@/components/replaceTmpl.ts";
const components: string[] = ['field', 'avatarUpload']

export default replaceTmpl(profileEditTmpl, components)
