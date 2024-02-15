import loginTmpl from "./login.tmpl.js";
import replaceTmpl from "@/components/replaceTmpl.js";
const components = ['field']
const newTmpl = replaceTmpl(loginTmpl.trim(), components)

export default newTmpl
