import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon/Icon';
import { InputTextProps } from './InputText.interface';
import styles from './InputText.module.scss';
import cn from 'classnames';

function InputText(props: InputTextProps & {
  type?: string;
  value?: string | number;
  maxLength?: number;
}) {
  const {
    name,
    onChangeInput,
    defaultValue,
    label,
    disabled,
    iconName,
    type = 'text',
    value: controlledValue,
    maxLength,
    ...rest
  } = props;

  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string | number>(defaultValue ?? '');

  // Синхронизируем internalValue если defaultValue меняется (для uncontrolled)
  useEffect(() => {
    if (!isControlled && defaultValue !== undefined) {
      setInternalValue(defaultValue);
    }
  }, [defaultValue, isControlled]);

  const value = isControlled ? controlledValue : internalValue;

  return (
    <div className={styles['input-text']}>
      <input
        id={name}
        name={name}
        type={type}
        disabled={disabled}
        className={cn(styles['input-text__input'], {
          [styles['is-active']]: Boolean(value),
        })}
        value={value as string | number | undefined}
        onChange={(e) => {
          if (!isControlled) setInternalValue(e.target.value);
          onChangeInput(name, e.target.value);
        }}
        maxLength={maxLength}
        {...rest}
      />
      {iconName && (
        <Icon type={iconName} className={styles['input-text__icon']} />
      )}
      <label className={styles['input-text__label']} htmlFor={name}>
        {label}
      </label>
    </div>
  );
}

export default InputText;