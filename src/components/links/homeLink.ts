import classes from '@/styles/common.module.scss';
import RouterLink from '@/@core/components/routerLink/routerLink.ts';
import { Props } from '@/utils/Block.ts';

const homeLinkClasses = [classes.dB, classes.mt05].join(' ');

class HomeLink extends RouterLink {
  constructor(props: Props = {}) {
    super({
      to: '/messenger', text: 'Назад в чат', attrs: `class="${homeLinkClasses}"`, ...props,
    });
  }
}

export default HomeLink;
