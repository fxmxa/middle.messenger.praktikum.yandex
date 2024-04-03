import Field from '@/@core/components/field/field.ts';
import validateField from '@/utils/validateField.ts';

// const firstUpper = /^[A-Z]|[А-Я]/;

export default (fieldValue = '') => {
  const field = new Field(
    {
      id: 'second_name',
      type: 'text',
      label: 'Фамилия',
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
