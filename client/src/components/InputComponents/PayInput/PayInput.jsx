import React from 'react';
import classNames from 'classnames';
import InputMask from 'react-input-mask';
import { useField } from 'formik';

const PayInput = props => {
  // Извлекаем необходимые свойства из пропсов
  const { label, changeFocus, classes, isInputMask, mask } = props;
  // Используем хук useField из Formik для работы с полем формы
  const [field, meta, /**helpers**/] = useField(props.name);
  const { touched, error } = meta;
  // Если поле относится к сумме, рендерим обычное текстовое поле
  if (field.name === 'sum') {
    return (
      <div className={classes.container}>
        <input
          {...field}
          placeholder={label}
          className={classNames(classes.input, {
            [classes.notValid]: touched && error,
          })}
        />
        {touched && error && (
          <span className={classes.error}>{error.message}!</span>
        )}
      </div>
    );
  }
  // Если включена поддержка маски, используем InputMask
  if (isInputMask) {
    return (
      <div className={classes.container}>
        <InputMask
          mask={mask}
          maskChar={null}
          {...field}
          placeholder={label}
          className={classNames(classes.input, {
            [classes.notValid]: touched && error,
          })}
          onFocus={() => changeFocus(field.name)}
        />
        {touched && error && (
          <span className={classes.error}>{error.message}!</span>
        )}
      </div>
    );
  }
  // В противном случае рендерим обычное текстовое поле
  return (
    <div className={classes.container}>
      <input
        {...field}
        placeholder={label}
        className={classNames(classes.input, {
          [classes.notValid]: touched && error,
        })}
        onFocus={() => changeFocus(field.name)}
      />
      {touched && error && (
        <span className={classes.error}>{error.message}!</span>
      )}
    </div>
  );
};

export default PayInput;
