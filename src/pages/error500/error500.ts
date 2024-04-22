import error500Tmpl from '@/pages/error500/error500.tmpl.ts';
import Block from '@/utils/Block.ts';
import Layout from '@/layouts/default/default.ts';
import HomeLink from '@/components/links/homeLink.ts';

const error500 = new Block({}, error500Tmpl, 'div', [new HomeLink()]);
const error500Page = new Layout({}, [error500]);

export default error500Page;
