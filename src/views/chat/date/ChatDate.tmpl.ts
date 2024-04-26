import common from '@/styles/common.module.scss';
import classes from '../chat.module.scss';

const itemClasses = [common.dFlex, common.jcC].join(' ');
export default
`<li class="${itemClasses}">
    <span class="${classes.date}">{{date}}</span>
</li>`;
