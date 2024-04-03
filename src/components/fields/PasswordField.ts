import Field from '@/@core/components/field/field.ts';
import validateField from '@/utils/validateField.ts';

function passwordField(label = 'Пароль', id = 'password') {
  const field = new Field(
    { id, type: 'password', label },
    [{
      event: 'input:blur',
      callback: () => {
        const hasError = validateField(
          field,
          [
            (val) => /^.{8,}$/g.test(val) || 'Минимальная длинна 8 символов',
            (val) => /[A-ZА-Я]/g.test(val) || 'Должен содержать одну заглавную букву',
            (val) => /[0-9]/g.test(val) || 'Должен содержать одну цифру',
          ],
        );
        return hasError;
      },
    }],
  );

  return field;
}

export default passwordField;
