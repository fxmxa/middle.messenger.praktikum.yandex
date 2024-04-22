import Block, { Props } from '@/utils/Block.ts';
import routerLinkTmpl from '@/@core/components/routerLink/routerLink.tmpl.ts';
import router from '@/router/index.ts';
// TODO: refactor to no cycle

class RouterLink extends Block {
  constructor(props: Props) {
    super(
      props,
      routerLinkTmpl,
      'a',
      [],
      [{ event: 'click', callback: linkClick }],
    );
  }
}
function linkClick(e: Event) {
  e.preventDefault();
  const { to } = this.props;
  if (!to) {
    return;
  }
  router.go(to);
}

export default RouterLink;
