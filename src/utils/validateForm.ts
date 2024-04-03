import Field from '@/@core/components/field/field.ts';
import Input from '@/@core/components/input/input.ts';
import Block from '@/utils/Block.ts';

function validateForm(form: Block) {
  const fields = form.children.filter((el) => el instanceof Field);

  const hasErrors = fields.flatMap((field) => field.children) // get children array of fields
    .filter((el) => el instanceof Input) // filter children to get only inputs
    .map((el) => el.events.find((item) => item.event === 'blur')) // get 'blur' events
    .map((el) => el?.callback() ?? false) // evoke callbacks and get validate value
    .some((el) => el); // check if some not valid

  return hasErrors;
}

export default validateForm;
