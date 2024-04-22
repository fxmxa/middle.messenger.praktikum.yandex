import common from '@/styles/common.module.scss';
import classes from '../chat.module.scss';

const itemClasses = [
  common.dFlex, common.jcSb, common.blockHover, common.bdrs10, common.mb05, common.aiC,
].join(' ');
export default
`<li class="${itemClasses}">
    <span class="${classes.text}">{{text}}</span>
    <span class="${classes.time}">{{time}}</span>
</li>`;
