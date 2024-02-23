import replaceComponents from '@/components/replaceTmpl.ts';
import registrationTmpl from './registration.tmpl.ts';

const components: string[] = ['field'];
const newHtml: string = replaceComponents(registrationTmpl, components);
export default newHtml;
