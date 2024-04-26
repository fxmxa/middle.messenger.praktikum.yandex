import type { Props } from '@/utils/Block.ts';

export default (tmpl: string, props: Props) => {
  let newTmpl = tmpl;
  Object.entries(props).forEach(([key, value]) => {
    if (typeof value !== 'string') return;

    newTmpl = newTmpl.replaceAll(`{{${key}}}`, value);
  });

  // clear not used props
  newTmpl = newTmpl.replaceAll(/{{\w+}}/g, '');

  return newTmpl;
};
