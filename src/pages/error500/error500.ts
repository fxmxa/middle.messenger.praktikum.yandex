import error500Tmpl from '@/pages/error500/error500.tmpl.ts';
import Block from '@/utils/Block.ts';
import Layout from '@/layouts/default/default.ts';

const error500 = new Block({}, error500Tmpl);
const error500Page = new Layout({}, [error500]);

export default error500Page;
