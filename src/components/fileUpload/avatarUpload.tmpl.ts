import common from '@/styles/common.module.scss';
import classes from './avatarUpload.module.scss';

export default `
<div class="${classes.wrapper}">
  <img src="/avatar-default.png" alt="avatar" class="${common.avatar} ${common.aiC}">
  <label for="avatar-upload" class="${classes.label}">
      Загрузить аватар
  </label>
  <input id="avatar-upload" type="file" class="${classes.input}"/>
</div>`;
