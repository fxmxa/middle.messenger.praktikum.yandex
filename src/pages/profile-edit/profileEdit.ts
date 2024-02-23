import replaceTmpl from '@/components/replaceTmpl.ts';
import profileEditTmpl from './profileEdit.tmpl.ts';

const components: string[] = ['field', 'avatarUpload'];

export default replaceTmpl(profileEditTmpl, components);
