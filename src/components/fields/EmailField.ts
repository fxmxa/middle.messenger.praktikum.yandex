import Field from '@/@core/components/field/field.ts';
import validateField from '@/utils/validateField.ts';

export default (fieldValue = '') => {
  const field = new Field(
    {
      id: 'email',
      type: 'email',
      label: 'Email',
      value: fieldValue,
    },
    [{
      event: 'input:blur',
      callback: () => {
        const hasError = validateField(
          field,
          [
            (val) => /^[a-zA-Z-_0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/g.test(val) || 'Не верный формат email адреса',
          ]
          ,
        );
        return hasError;
      },
    }],
  );

  return field;
};
