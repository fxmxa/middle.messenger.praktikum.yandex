import common from '@/styles/common.module.scss';
import classes from './avatarUpload.module.scss';

export default `
<div class="${classes.wrapper}">
  <img src="{{avatar}}" alt="avatar" class="${common.avatar} ${common.aiC}">
  <label for="avatar" class="${classes.label}">{{label}}</label>
</div>`;
