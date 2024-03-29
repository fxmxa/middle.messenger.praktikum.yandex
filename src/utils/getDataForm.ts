import Field from '@/@core/components/field/field.ts';
import Input from '@/@core/components/input/input.ts';
import Block from '@/utils/Block.ts';

function getDataForm(form: Block) {
  const fields = form.children.filter((el) => el instanceof Field);

  const data = fields.flatMap((field) => field.children) // get children array of fields
    .filter((el) => el instanceof Input) // filter children to get only inputs
    .map((el) => ({
      name: (el.getContent() as HTMLInputElement).name,
      value: (el.getContent() as HTMLInputElement).value,
    }));

  return data;
}

export default getDataForm;
