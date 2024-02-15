import registrationTmpl from "./registration.tmpl.js"
import replaceComponents from "@/components/replaceTmpl.js";

const components = ['field']
const newHtml = replaceComponents(registrationTmpl, components)

export default newHtml
