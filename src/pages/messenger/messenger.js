import messengerTmpl from "@/pages/messenger/messenger.tmpl.js";
import replaceTmpl from "@/components/replaceTmpl.js";
const components = ['contact']

const messenger = replaceTmpl(messengerTmpl.trim(), components)
export default messenger.trim()
