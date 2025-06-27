import { useEffect, useState } from 'react';
import { useIMask } from 'react-imask';
import Icon from '@/components/ui/Icon/Icon';
import { InputWithMaskProps } from './InputWithMask.interface';
import styles from './InputWithMask.module.scss';
import cn from 'classnames';

function InputWithMask(
  props: InputWithMaskProps & {
    isText?: boolean;
    type?: string;
    value?: string | number;
    maxLength?: number;
  }
) {
  const {
    name,
    onChangeInput,
    maxValue,
    defaultValue,
    label,
    disabled,
    iconName,
    isText = false,
    type = 'text',
    value: controlledValue,
    ...rest
  } = props;

  if (isText) {
    const [internalValue, setInternalValue] = useState<string | number>(
      controlledValue ?? defaultValue ?? ''
    );

    const value =
      controlledValue !== undefined ? controlledValue : internalValue;

    return (
      <div className={styles['input-with-mask']}>
        <input
          id={name}
          name={name}
          type={type}
          disabled={disabled}
          className={cn(styles['input-with-mask__input'], {
            [styles['is-active']]: Boolean(value),
          })}
          value={value as string | number | undefined}
          onChange={(e) => {
            setInternalValue(e.target.value);
            onChangeInput(name, e.target.value);
          }}
          maxLength={maxValue}
          {...rest}
        />
        {iconName && (
          <Icon type={iconName} className={styles['input-with-mask__icon']} />
        )}
        <label className={styles['input-with-mask__label']} htmlFor={name}>
          {label}
        </label>
      </div>
    );
  }

  const { ref, value, unmaskedValue } = useIMask<HTMLInputElement>(
    {
      mask: Number,
      radix: ',',
      thousandsSeparator: ' ',
      min: 0,
      max: maxValue || 9_999,
      mapToRadix: ['.'],
    },
    {
      defaultUnmaskedValue: defaultValue?.toString(),
    }
  );

  useEffect(() => {
    onChangeInput(name, +unmaskedValue);
  }, [unmaskedValue, name]);

  return (
    <div className={styles['input-with-mask']}>
      <input
        ref={ref}
        id={name}
        disabled={disabled}
        className={cn(styles['input-with-mask__input'], {
          [styles['is-active']]: Boolean(value),
        })}
        {...rest}
      />
      {iconName && (
        <Icon type={iconName} className={styles['input-with-mask__icon']} />
      )}
      <label className={styles['input-with-mask__label']} htmlFor={name}>
        {label}
      </label>
    </div>
  );
}

export default InputWithMask;
