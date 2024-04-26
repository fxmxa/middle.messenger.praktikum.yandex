import Field from '@/@core/components/field/field.ts';
import validateField from '@/utils/validateField.ts';

export default (fieldValue = '') => {
  const field = new Field(
    {
      id: 'first_name',
      type: 'text',
      label: 'Имя',
      value: fieldValue,
    },
    [{
      event: 'input:blur',
      callback: () => {
        const hasError = validateField(
          field,
          [
            (val) => /^[A-Z]|[А-Я]/.test(val) || 'Первый символ должен быть заглавный',
            (val) => /^[a-zA-Zа-яА-Я-]+$/.test(val) || 'Допустимы буквы и дефис',
          ]
          ,
        );
        return hasError;
      },
    }],
  );

  return field;
};
