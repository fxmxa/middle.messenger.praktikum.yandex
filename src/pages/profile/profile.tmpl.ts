import common from '@/styles/common.module.scss';
import profile from '@/pages/profile/profile.module.scss';

export default `
<div class="${common.card}">
  <h2>Профиль</h2>
  <div class="${common.dFlex} ${common.mb1}">
    <img src="{{avatar}}" alt="avatar" class="${common.avatar} ${common.aiC}">
    <div class="${profile.text}">
      <span>{{displayName}}</span>
      <span class="${profile.text__login}">@{{login}}</span>     
    </div>  
  </div>
</div>    
`.trim();
