import registrationTmpl from "./registration.tmpl.ts"
import replaceComponents from "@/components/replaceTmpl.ts";

const components: string[] = ['field']
const newHtml: string = replaceComponents(registrationTmpl, components)

export default newHtml
