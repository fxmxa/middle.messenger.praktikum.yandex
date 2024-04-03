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
