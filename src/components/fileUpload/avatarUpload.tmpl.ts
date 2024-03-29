import common from '@/styles/common.module.scss';
import classes from './avatarUpload.module.scss';

export default `
<div class="${classes.wrapper}">
  <img src="{{avatar}}" alt="avatar" class="${common.avatar} ${common.aiC}">
  <label for="avatar-upload" class="${classes.label}">{{label}}</label>
  <input id="avatar-upload" type="file" class="${classes.input}"/>
</div>`;
