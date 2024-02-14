import passwordEditTmpl from "@/pages/password-edit/passwordEdit.tmpl.js";
import replaceTmpl from "@/components/replaceTmpl.js";
const components = ['field']
const newTmpl = replaceTmpl(passwordEditTmpl.trim(), components)

export default newTmpl
