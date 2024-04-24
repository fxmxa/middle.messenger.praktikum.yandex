import Field from '@/@core/components/field/field.ts';
import Input from '@/@core/components/input/input.ts';
import Block from '@/utils/Block.ts';
import sanitize from '@/utils/sanitize.ts';

function getFormData<T>(form: Block): T {
  const fields = form.children.filter((el) => el instanceof Field);

  const data = fields.flatMap((field) => field.children) // get children array of fields
    .filter((el) => el instanceof Input) // filter children to get only inputs
    // .map((el) => ([(el.getContent() as HTMLInputElement).name, (el.getContent() as HTMLInputElement).value]));
    .map((el) => ([(el.getContent() as HTMLInputElement).name, sanitize((el.getContent() as HTMLInputElement).value)]));

  return Object.fromEntries(data);
}

export default getFormData;
