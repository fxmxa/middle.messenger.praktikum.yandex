import btnTmpl from '@/components/btn/btn.tmpl.ts';
import Block from '@/utils/Block.ts';

const btn = btnTmpl.trim();

class Btn extends Block {
  constructor(props) {
    super('button', props);
  }

  render(): string {
    return `<div>${this.props.text}</div>`;
  }
}

const btnClass = new Btn({ text: 'btnClass' });
const btnClassContent = btnClass.getContent();
console.log({ btnClassContent, btn });

export default btnClassContent;
