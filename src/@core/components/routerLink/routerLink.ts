import Block, { Props } from '@/utils/Block.ts';
import routerLinkTmpl from '@/@core/components/routerLink/routerLink.tmpl.ts';
// TODO: refactor to no cycle

class RouterLink extends Block {
  constructor(props: Props) {
    super(
      props,
      routerLinkTmpl,
      'a',
    );
  }
}

export default RouterLink;
