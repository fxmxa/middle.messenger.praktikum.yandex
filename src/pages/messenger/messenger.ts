import messengerTmpl from '@/pages/messenger/messenger.tmpl.ts';
import replaceTmpl from '@/components/replaceTmpl.ts';

const components: string[] = ['contact'];

const messenger: string = replaceTmpl(messengerTmpl.trim(), components);
export default messenger.trim();
