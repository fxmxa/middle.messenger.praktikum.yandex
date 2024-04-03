import InputHelp from '@/@core/components/inputHelp/inputHelp.ts';
import Input from '@/@core/components/input/input.ts';
import Field from '@/@core/components/field/field.ts';

type TestFunc = (val: string) => boolean | string
function validateField(field: Field, testFuncList: TestFunc[]): boolean {
  const helpBlock = field.children.find((el) => el instanceof InputHelp);
  const inputBlock = field.children.find((el) => el instanceof Input);

  if (!helpBlock || !inputBlock) {
    return false;
  }
  const { value } = inputBlock.getContent() as HTMLInputElement;

  const hasError = testFuncList.some((testFunc) => {
    const testRes = testFunc(value);
    if (typeof testRes !== 'string') {
      return false;
    }
    helpBlock.setProps({
      helpText: testRes,
    });
    return true;
  });

  if (!hasError) {
    helpBlock.setProps({
      helpText: '',
    });
    return false;
  }
  return true;
}

export default validateField;
