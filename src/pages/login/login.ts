import replaceTmpl from '@/components/replaceTmpl.ts';
import loginTmpl from './login.tmpl.ts';

const components: string[] = ['field', 'btn'];
const newTmpl: string = replaceTmpl(loginTmpl.trim(), components);

export default newTmpl;
