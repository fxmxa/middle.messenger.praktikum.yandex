import Field from '@/@core/components/field/field.ts';
import validateField from '@/utils/validateField.ts';

function passwordCreate(value = '') {
  const field = new Field(
    {
      id: 'phone', type: 'text', value, label: 'Телефон',
    },
    [{
      event: 'input:blur',
      callback: () => {
        const hasError = validateField(
          field,
          [
            (val) => /^\+?[0-9]{10,15}$/g.test(val) || '10 - 15 цифр',
          ],
        );
        return hasError;
      },
    }],
  );

  return field;
}

export default passwordCreate;
