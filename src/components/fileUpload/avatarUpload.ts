import Block, { Props } from '@/utils/Block.ts';
import fileUploadTmpl from './avatarUpload.tmpl.ts';

class avatarUpload extends Block {
  constructor(props: Props) {
    super(
      props,
      fileUploadTmpl,
      'div',
    );
  }
}

export default avatarUpload;

// <div class="${classes.wrapper}">
//   <img src="/avatar-default.png" alt="avatar" class="${common.avatar} ${common.aiC}">
//   <label for="avatar-upload" class="${classes.label}">
//       Загрузить аватар
//   </label>
//   <input id="avatar-upload" type="file" class="${classes.input}"/>
// </div>
