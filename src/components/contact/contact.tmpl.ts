import profile from '@/pages/profile/profile.module.scss';
import common from '@/styles/common.module.scss';

export default `
<div class="${common.dFlex} ${common.mb1} ${common.mbLast0}">
  <img src="{{avatar}}" alt="avatar" class="${common.avatar} ${common.aiC}">
  <div class="${profile.text}">
    <span>{{name}}</span>
    <span class="${profile.text__login}">{{message}}</span>     
  </div>
</div>
`;
