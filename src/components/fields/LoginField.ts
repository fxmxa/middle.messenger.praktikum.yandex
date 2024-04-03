import Field from '@/@core/components/field/field.ts';
import validateField from '@/utils/validateField.ts';

export default (fieldValue = '') => {
  const field = new Field(
    {
      id: 'login',
      type: 'text',
      label: 'Логин',
      value: fieldValue,
    },
    [{
      event: 'input:blur',
      callback: () => {
        const hasError = validateField(
          field,
          [
            (val) => /^.{3,}$/g.test(val) || 'Мин длинна 3 символа',
            (val) => /^\d+$/g.test(val) && 'Не может содержать только цифры',
            (val) => /^[1-9A-Za-z-_]+$/g.test(val) || 'Допустимы: цифры и латиница - _',
          ]
          ,
        );
        return hasError;
      },
    }],
  );

  return field;
};
