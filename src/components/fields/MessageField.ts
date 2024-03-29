import Field from '@/@core/components/field/field.ts';
import validateField from '@/utils/validateField.ts';

export default (fieldValue = '') => {
  const field = new Field(
    {
      id: 'message',
      type: 'text',
      label: 'Новое сообщение',
      value: fieldValue,
    },
    [{
      event: 'input:blur',
      callback: () => {
        const hasError = validateField(
          field,
          [
            (val) => /.+/g.test(val) || 'Сообщение не должно быть пустым',
          ]
          ,
        );
        return hasError;
      },
    }],
    true,
  );

  return field;
};
