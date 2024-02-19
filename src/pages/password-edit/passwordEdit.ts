import passwordEditTmpl from "@/pages/password-edit/passwordEdit.tmpl.ts";
import replaceTmpl from "@/components/replaceTmpl.ts";
const components: string[] = ['field']
const newTmpl: string = replaceTmpl(passwordEditTmpl.trim(), components)

export default newTmpl
