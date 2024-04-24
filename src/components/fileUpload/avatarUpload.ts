import Block, { Props } from '@/utils/Block.ts';
import Input from '@/@core/components/input/input.ts';
import fileUploadTmpl from './avatarUpload.tmpl.ts';
import classes from './avatarUpload.module.scss';

const fileInput = new Input(
  { id: 'avatar', type: 'file', classList: classes.input },
);

class avatarUpload extends Block {
  input;

  constructor(props: Props) {
    super(
      props,
      fileUploadTmpl,
      'div',
      [fileInput],
    );
    this.input = fileInput;
  }
}

export default avatarUpload;
