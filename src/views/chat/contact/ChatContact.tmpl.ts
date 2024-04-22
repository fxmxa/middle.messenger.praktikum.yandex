import common from '@/styles/common.module.scss';
import profile from '@/pages/profile/profile.module.scss';

const wrapperClasses = [common.dFlex, common.p05, common.curDef].join(' ');
export default `
<div class="${wrapperClasses}">
  <img src="{{avatar}}" alt="avatar" class="${common.avatar} ${common.aiC}">
  <div class="${profile.text}">
    <span>{{name}}</span>
    <span class="${profile.text__login}">{{message}}</span>     
  </div>
</div>
`;
