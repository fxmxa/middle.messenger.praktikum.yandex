import Field from '@/@core/components/field/field.ts';
import validateField from '@/utils/validateField.ts';

export default (fieldValue = '') => {
  const field = new Field(
    {
      id: 'title',
      type: 'text',
      label: 'Название чата',
      value: fieldValue,
    },
    [{
      event: 'input:blur',
      callback: () => {
        const hasError = validateField(
          field,
          [
            (val) => /^.{1,}$/g.test(val) || 'Мин длинна 1 символ',
          ]
          ,
        );
        return hasError;
      },
    }],
  );

  return field;
};
