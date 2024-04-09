import error404Tmpl from '@/pages/error404/error404.tmpl.ts';
import Block from '@/utils/Block.ts';
import Layout from '@/layouts/default/default.ts';

const error404 = new Block({}, error404Tmpl);
const error404Page = new Layout({}, [error404]);

export default error404Page;
