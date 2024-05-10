import error404Tmpl from '@/pages/error404/error404.tmpl.ts';
import Block from '@/utils/block/Block.ts';
import Layout from '@/layouts/default/default.ts';
import HomeLink from '@/components/links/homeLink.ts';

const error404 = new Block({}, error404Tmpl, 'div', [new HomeLink()]);
const error404Page = new Layout({}, [error404]);

export default error404Page;
