import loginTmpl from "./login.tmpl.ts";
import replaceTmpl from "@/components/replaceTmpl.ts";
const components: string[] = ['field']
const newTmpl: string = replaceTmpl(loginTmpl.trim(), components)

export default newTmpl
